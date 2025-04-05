import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type ShadcnInputProps = React.ComponentProps<typeof Input>;

// Define our props, extending the derived ShadcnInputProps
interface ValidatedInputProps<TFieldValues extends FieldValues>
  extends Omit<ShadcnInputProps, "name" | "value" | "onChange" | "onBlur"> {
  // Omit props handled by RHF Controller
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  unit?: string;
  className?: string; // Allow passing custom classes to the FormItem wrapper
  inputClassName?: string; // Allow passing custom classes directly to the Input
}

export function ValidatedInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text", // Default to text
  unit,
  className,
  inputClassName, // Destructure inputClassName
  ...props // Spread remaining compatible InputProps
}: ValidatedInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("space-y-1", className)}>
          {" "}
          {/* Apply wrapper class here */}
          <FormLabel htmlFor={name}>{label}</FormLabel>{" "}
          {/* Use name for htmlFor */}
          <div className="relative flex items-center">
            <FormControl>
              <Input
                id={name} // Use name for id as well
                type={type}
                placeholder={placeholder}
                {...field} // Spread field props (onChange, onBlur, value, name, ref)
                {...props} // Spread any additional compatible InputProps passed down
                className={cn(
                  error ? "border-red-500 focus-visible:ring-red-500" : "",
                  unit ? "pr-8" : "",
                  inputClassName // Apply direct input class here
                )}
                value={field.value ?? ""} // Handle null/undefined values
              />
            </FormControl>
            {unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                {unit}
              </span>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
