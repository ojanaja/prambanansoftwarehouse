import React from "react";

export interface FormFieldProps {
  label?: string;
  error?: string | boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A FormField component that binds HTML labels, inputs, and error states.
 */
export function FormField({
  label,
  error,
  id,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && id && (
        <label 
          htmlFor={id} 
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 select-none"
        >
          {label}
        </label>
      )}
      
      <div>
        {React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement<any>, { 
              id, 
              error: !!error,
              ...(error && id ? { "aria-describedby": `${id}-error`, "aria-invalid": "true" } : {})
            })
          : children
        }
      </div>

      {error && id && (
        <span 
          id={`${id}-error`} 
          className="text-xs font-medium text-red-500 mt-0.5"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;
