"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#19C0FF] data-[state=checked]:text-black",
            "border-[#CCCFD5]",

            // 2. Màu nền, border, và màu text (dấu tick) sau khi tick
            "data-[state=checked]:bg-[#19C0FF]",
            "data-[state=checked]:border-[#19C0FF]",
            "data-[state=checked]:text-white", // <-- Sửa text-primary-foreground thành text-white
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn("grid place-content-center text-current")}
        >
            <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
