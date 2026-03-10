# Feature Modules

Feature modules live in `src/features/<domain>/` inside each app. They encapsulate all domain-specific UI, logic, and state for a given area of the application.

## Domain Folder Structure

```
features/<domain>/
├── blocks/                     # Reusable UI compositions for this domain
│   ├── order-card.tsx
│   ├── order-list.tsx
│   └── order-summary.tsx
├── hooks/                      # Domain-specific React hooks
│   ├── use-order-filters.ts
│   └── use-order-actions.ts
├── helpers/                    # Domain-specific helper functions (may use React)
│   └── compute-order-total.ts
├── utils/                      # Domain-specific pure utilities
│   └── format-order-id.ts
├── constants/                  # Domain-specific constants
│   └── index.ts
├── types/                      # Domain-specific types (app-level only)
│   └── index.ts
├── <domain>-view.tsx           # Main view (client component)
├── <domain>-form.tsx           # Main form (if applicable)
├── <domain>-columns.tsx        # Table column definitions (if applicable)
└── <domain>-modal.tsx          # Modal (if applicable)
```

Not every domain needs every subdirectory. Create them as needed.

## File Naming Conventions

| Pattern         | Purpose                         | Component Type   |
| --------------- | ------------------------------- | ---------------- |
| `*-view.tsx`    | Main view for a page or section | Client component |
| `*-form.tsx`    | Form with validation and submit | Client component |
| `*-columns.tsx` | Table column definitions        | Plain TypeScript |
| `*-modal.tsx`   | Modal / dialog                  | Client component |
| `blocks/*.tsx`  | Reusable domain UI compositions | Client component |

## Views

Views are **client components** that own the rendering and interactivity for a page. A page (server component) imports and renders a view.

```tsx
// features/orders/orders-view.tsx
"use client";

import { useGetOrders } from "@repo/api";
import { OrderList } from "./blocks/order-list";
import { OrderFilters } from "./blocks/order-filters";

export function OrdersView() {
	const { data: orders, isLoading } = useGetOrders();

	return (
		<div>
			<OrderFilters />
			<OrderList orders={orders} isLoading={isLoading} />
		</div>
	);
}
```

## Pages

Pages are **server components** that live in `app/`. They handle route-level concerns (metadata, data prefetching) and delegate rendering to views.

```tsx
// app/orders/page.tsx
import { OrdersView } from "@/features/orders/orders-view";

export const metadata = {
	title: "Orders",
};

export default function OrdersPage() {
	return <OrdersView />;
}
```

## Forms

Forms use Zod schemas from the `models` package for validation.

```tsx
// features/orders/create-order-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderCreateSchema, type OrderCreate } from "@repo/models";
import { useCreateOrder } from "@repo/api";
import { Button, Input, Label } from "@repo/ui";

export function CreateOrderForm() {
	const form = useForm<OrderCreate>({
		resolver: zodResolver(orderCreateSchema),
	});
	const createOrder = useCreateOrder();

	const onSubmit = (data: OrderCreate) => {
		createOrder.mutate(data);
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Label htmlFor="name">Name</Label>
			<Input id="name" {...form.register("name")} />
			<Button type="submit">Create Order</Button>
		</form>
	);
}
```

## Blocks

Blocks are reusable UI compositions scoped to a domain. They combine primitives from `@repo/ui` with domain-specific logic.

```tsx
// features/orders/blocks/order-card.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui";
import type { Order } from "@repo/models";

interface OrderCardProps {
	order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{order.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Status: {order.status}</p>
			</CardContent>
		</Card>
	);
}
```

## Table Columns

Column definitions are plain TypeScript files that define how table data is displayed.

```tsx
// features/orders/order-columns.tsx
import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "@repo/models";

export const orderColumns: ColumnDef<Order>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
];
```

## Modals

Modals wrap a dialog primitive from `@repo/ui` with domain-specific content.

```tsx
// features/orders/delete-order-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@repo/ui";
import { Button } from "@repo/ui";
import { useDeleteOrder } from "@repo/api";

interface DeleteOrderModalProps {
	orderId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteOrderModal({ orderId, open, onOpenChange }: DeleteOrderModalProps) {
	const deleteOrder = useDeleteOrder();

	const handleDelete = () => {
		deleteOrder.mutate(orderId, {
			onSuccess: () => onOpenChange(false),
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Order</DialogTitle>
				</DialogHeader>
				<p>Are you sure you want to delete this order?</p>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
```

## Guidelines

1. **Keep features self-contained.** A feature should not import from another feature. Shared logic belongs in a package (`@repo/models`, `@repo/ui`, `@repo/api`).
2. **Views are client components.** Always add `"use client"` at the top.
3. **Pages are server components.** Never add `"use client"` to files in `app/`.
4. **Use schemas from `@repo/models`.** Do not redefine Zod schemas inside features.
5. **Use query hooks from `@repo/api`.** Do not call `fetch` directly in features.
6. **Blocks are domain-scoped.** If a block is used across multiple domains, promote it to `@repo/ui`.
