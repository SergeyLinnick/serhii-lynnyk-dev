"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";
import { toggleVariants } from "./toggle";

type ToggleGroupContextType = VariantProps<typeof toggleVariants>;

const ToggleGroupContext = createContext<ToggleGroupContextType>({
	size: "default",
	variant: "default",
});

export const ToggleGroup = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
	<ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
		<ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
	</ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

export const ToggleGroupItem = forwardRef<
	HTMLButtonElement,
	ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
	const context = useContext(ToggleGroupContext);
	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				toggleVariants({
					variant: variant || context.variant,
					size: size || context.size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
