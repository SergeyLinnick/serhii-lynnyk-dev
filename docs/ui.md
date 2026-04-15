# UI Package

The `@workspace/ui` package provides shared UI components for all apps. It is built on shadcn/ui, Radix UI primitives, and CVA (Class Variance Authority) for variant management, styled with Tailwind CSS v4.

## Structure

```
packages/ui/src/
├── components/
│   └── base/                      # shadcn/ui + Radix primitives
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── button.stories.tsx     # Colocated story
│       ├── button.test.tsx        # Colocated test
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx             # Toast (re-exports from sonner)
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── styles/
│   ├── globals.css                # Tailwind v4 entry point
│   └── theme.css                  # Design tokens (light + dark)
├── utils/
│   └── cn.ts                      # cn() helper (clsx + tailwind-merge)
└── index.ts                       # Public barrel export
```

Stories and tests are **colocated** next to their component files (e.g. `button.stories.tsx` alongside `button.tsx`).

## Components

All components live in `components/base/`. They are thin wrappers around shadcn/ui primitives built on Radix UI, providing accessible building blocks.

### Example: Button

```tsx
// components/base/button.tsx

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	},
);
Button.displayName = "Button";
```

### Example: Sonner (Toast)

```tsx
// components/base/sonner.tsx
"use client";

export { Toaster, toast } from "sonner";
```

## CVA Variants Pattern

Components with visual variants use CVA (Class Variance Authority) for type-safe variant management.

```tsx
// components/base/badge.tsx

import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
```

Components using CVA:

| Component | Variant dimensions                                                                                |
| --------- | ------------------------------------------------------------------------------------------------- |
| Button    | `variant` (default, destructive, outline, secondary, ghost, link), `size` (default, sm, lg, icon) |
| Badge     | `variant` (default, secondary, destructive, outline)                                              |
| Alert     | `variant` (default, destructive)                                                                  |
| Toggle    | `variant` (default, outline), `size` (default, sm, lg)                                            |
| Sheet     | `side` (top, bottom, left, right)                                                                 |
| Label     | Base classes only (no variant dimension)                                                          |

## Tailwind v4 Styling

### globals.css

Entry point CSS imported by apps. Exported as `@workspace/ui/globals.css`.

```css
/* styles/globals.css */

@import "tailwindcss";
@import "./theme.css";

@source "../../../apps/**/*.{ts,tsx}";
@source "../../../packages/**/*.{ts,tsx}";
@source "../components/**/*.{ts,tsx}";

@plugin "tailwindcss-animate";

@custom-variant dark (&:where(.dark-mode, .dark-mode *));

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply bg-background text-foreground;
	}
}
```

Key points:

- `@source` directives scan monorepo-wide for class names (content purging)
- Dark mode uses the **`.dark-mode`** class (not `.dark` or `prefers-color-scheme`)
- `tailwindcss-animate` plugin for animation utilities

### theme.css — Design Tokens

Tailwind v4 uses a CSS-first configuration. Design tokens are defined as CSS custom properties in `:root` (light) and `.dark-mode` (dark), then mapped to Tailwind via `@theme inline`.

```css
/* styles/theme.css */
```

Apps import the globals entry point:

```css
/* apps/web/app/globals.css */
@import "@workspace/ui/globals.css";
```

## Storybook

Stories are **colocated** next to their component (e.g. `button.stories.tsx` alongside `button.tsx`).

```tsx
// components/base/button.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "Base/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Delete",
	},
};
```

Run Storybook:

```bash
pnpm --filter @workspace/ui storybook
```

## Component Guidelines

1. **`cn()` for class merging.** Always use the `cn()` utility (clsx + tailwind-merge) from `utils/cn.ts`.
2. **Forward refs.** Components wrapping DOM elements or Radix primitives must forward refs using `forwardRef` and set `displayName`.
3. **`"use client"` on interactive components.** All components wrapping Radix primitives with interactivity need the directive. Pure HTML wrappers (Card, Table, Input, etc.) do not.
4. **Accessible by default.** Use Radix UI primitives for accessible behavior out of the box.
5. **Stories required.** Every new component needs a colocated `.stories.tsx` file.
6. **No business logic.** The `ui` package must not import from `@workspace/api` or contain domain-specific logic.
7. **Lucide React for icons.** Use `lucide-react` for all iconography.

## cn() Utility

Located at `utils/cn.ts`. Combines `clsx` (conditional classes) and `tailwind-merge` (deduplicating Tailwind classes).

```ts
// utils/cn.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
```

Usage:

```tsx
<div className={cn("p-4 bg-white", isActive && "bg-primary", className)} />
```

## Package Exports

```json
{
	"./globals.css": "./src/styles/globals.css",
	"./postcss.config": "./postcss.config.mjs",
	"./components/*": "./src/components/*.tsx",
	"./hooks/*": "./src/hooks/*.ts",
	"./utils/*": "./src/utils/*.ts",
	".": "./src/index.ts"
}
```

Import components directly to avoid pulling the entire UI barrel into the module graph:

```tsx
// Direct import (recommended for feature modules)
import { Button } from "@workspace/ui/components/base/button";
import { Card, CardContent } from "@workspace/ui/components/base/card";

// Barrel import (convenience for small scripts or prototyping)
import { Button, Input, Dialog } from "@workspace/ui";
```
