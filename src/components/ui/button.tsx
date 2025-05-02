// src/components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "default" | "outline" | "ghost"; // Add any variants you plan to use

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    let baseStyle =
      "font-semibold py-2 px-4 rounded transition-colors duration-200";

    let variantStyle = {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      ghost: "text-blue-600 hover:bg-blue-100",
    }[variant];

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variantStyle} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
