# API Package

The `@repo/api` package provides the data-fetching layer for all apps. It encapsulates HTTP calls, response mapping, and TanStack Query hooks behind a clean domain-oriented API.

## Structure

```
packages/api/src/
├── _common/                    # Shared API infrastructure
│   ├── client.ts               # HTTP client (ky or fetch wrapper)
│   ├── constants.ts            # Base URL, default headers, timeouts
│   ├── query-keys.ts           # Centralized query key factory
│   └── utils.ts                # Shared helpers (error handling, etc.)
├── context/                    # React context and providers
│   ├── api-provider.tsx        # QueryClientProvider wrapper
│   └── hydration-boundary.tsx  # HydrationBoundary for SSR prefetch
├── orders/                     # Example domain module
│   ├── contracts.ts            # API payload types (snake_case)
│   ├── services.ts             # HTTP calls or in-memory mock
│   ├── mappers.ts              # snake_case <-> camelCase transforms
│   └── queries/                # TanStack Query hooks
│       ├── use-get-orders.ts
│       ├── use-get-order.ts
│       ├── use-create-order.ts
│       ├── use-update-order.ts
│       └── use-delete-order.ts
├── <domain>/                   # Additional domain modules follow same pattern
│   └── ...
└── index.ts                    # Public barrel export
```

## Domain Module Anatomy

### contracts.ts -- API Payload Types

Contracts define the shape of data as it comes from or goes to the API. These use **snake_case** to match typical backend conventions.

```ts
// orders/contracts.ts

export interface OrderResponse {
	id: string;
	order_name: string;
	created_at: string;
	updated_at: string;
	total_amount: number;
	line_items: LineItemResponse[];
}

export interface OrderCreatePayload {
	order_name: string;
	line_items: LineItemCreatePayload[];
}

export interface OrderUpdatePayload {
	order_name?: string;
	line_items?: LineItemCreatePayload[];
}
```

### services.ts -- HTTP Calls

Services make the actual HTTP calls (or return mock data for the starter). They accept and return contract types.

```ts
// orders/services.ts

import { client } from "../_common/client";
import type { OrderResponse, OrderCreatePayload, OrderUpdatePayload } from "./contracts";

export async function getOrders(): Promise<OrderResponse[]> {
	return client.get("orders").json();
}

export async function getOrder(id: string): Promise<OrderResponse> {
	return client.get(`orders/${id}`).json();
}

export async function createOrder(payload: OrderCreatePayload): Promise<OrderResponse> {
	return client.post("orders", { json: payload }).json();
}

export async function updateOrder(id: string, payload: OrderUpdatePayload): Promise<OrderResponse> {
	return client.put(`orders/${id}`, { json: payload }).json();
}

export async function deleteOrder(id: string): Promise<void> {
	await client.delete(`orders/${id}`);
}
```

For the starter template, services use an **in-memory mock** instead of real HTTP calls. Swap to `ky` or `fetch` when a real backend is available.

### mappers.ts -- Data Transformation

Mappers convert between API snake_case contracts and app-level camelCase models.

```ts
// orders/mappers.ts

import type { Order } from "@repo/models";
import type { OrderResponse, OrderCreatePayload } from "./contracts";
import type { OrderCreate } from "@repo/models";

export function mapOrderFromApi(response: OrderResponse): Order {
	return {
		id: response.id,
		orderName: response.order_name,
		createdAt: new Date(response.created_at),
		updatedAt: new Date(response.updated_at),
		totalAmount: response.total_amount,
		lineItems: response.line_items.map(mapLineItemFromApi),
	};
}

export function mapOrderToApi(data: OrderCreate): OrderCreatePayload {
	return {
		order_name: data.orderName,
		line_items: data.lineItems.map(mapLineItemToApi),
	};
}
```

### queries/ -- TanStack Query Hooks

Query hooks follow a strict naming convention:

| Operation | Hook Name         | TanStack Primitive |
| --------- | ----------------- | ------------------ |
| Read list | `use-get-*s.ts`   | `useQuery`         |
| Read one  | `use-get-*.ts`    | `useQuery`         |
| Create    | `use-create-*.ts` | `useMutation`      |
| Update    | `use-update-*.ts` | `useMutation`      |
| Delete    | `use-delete-*.ts` | `useMutation`      |

```ts
// orders/queries/use-get-orders.ts

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { getOrders } from "../services";
import { mapOrderFromApi } from "../mappers";

export function useGetOrders() {
	return useQuery({
		queryKey: queryKeys.orders.list(),
		queryFn: async () => {
			const response = await getOrders();
			return response.map(mapOrderFromApi);
		},
	});
}
```

```ts
// orders/queries/use-create-order.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { createOrder } from "../services";
import { mapOrderToApi, mapOrderFromApi } from "../mappers";
import type { OrderCreate } from "@repo/models";

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: OrderCreate) => {
			const payload = mapOrderToApi(data);
			const response = await createOrder(payload);
			return mapOrderFromApi(response);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.orders.list(),
			});
		},
	});
}
```

## Centralized Query Keys

All query keys are managed through a single factory in `_common/query-keys.ts`. This prevents key collisions and makes invalidation predictable.

```ts
// _common/query-keys.ts

export const queryKeys = {
	orders: {
		all: () => ["orders"] as const,
		list: (filters?: Record<string, unknown>) => [...queryKeys.orders.all(), "list", filters] as const,
		detail: (id: string) => [...queryKeys.orders.all(), "detail", id] as const,
	},
	// Add more domains here following the same pattern
	// products: {
	//   all: () => ["products"] as const,
	//   list: (filters?: Record<string, unknown>) =>
	//     [...queryKeys.products.all(), "list", filters] as const,
	//   detail: (id: string) =>
	//     [...queryKeys.products.all(), "detail", id] as const,
	// },
};
```

## Context -- ApiProvider

The `ApiProvider` wraps the app with `QueryClientProvider` and sets default query options.

```tsx
// context/api-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function ApiProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						retry: 1,
					},
				},
			}),
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

## Context -- HydrationBoundary

Used to prefetch queries on the server and hydrate them on the client.

```tsx
// context/hydration-boundary.tsx
"use client";

export { HydrationBoundary } from "@tanstack/react-query";
```

## Adding a New Domain

1. Create `packages/api/src/<domain>/` directory.
2. Add `contracts.ts` with API payload types (snake_case).
3. Add `services.ts` with HTTP calls or mock implementations.
4. Add `mappers.ts` with bidirectional mapping functions.
5. Create `queries/` directory with TanStack Query hooks.
6. Register query keys in `_common/query-keys.ts`.
7. Export the public API from `index.ts`.
