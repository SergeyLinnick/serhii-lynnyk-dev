import { cn } from "@workspace/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

export function ContainerInner({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
}

export function ContainerOuter({
	children,
	className,
	component: Component = "div",
	...props
}: ComponentPropsWithoutRef<"div"> & {
	component?: ElementType;
}) {
	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
}

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
	className?: string;
	component?: ElementType;
	wrapperClassName?: string;
}

export function Container({ className, component = "div", children, wrapperClassName, ...props }: ContainerProps) {
	return (
		<ContainerOuter component={component} className={wrapperClassName} {...props}>
			<ContainerInner className={cn(className, "px-safe")}>{children}</ContainerInner>
		</ContainerOuter>
	);
}
