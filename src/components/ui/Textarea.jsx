import React from "react";

/**
 * A styled resizable Textarea component matching input configurations.
 */
export const Textarea = React.forwardRef(({
  className = "",
  rows = 4,
  error = false,
  ...props
}, ref) => {
  const baseStyles = "w-full p-3.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 text-sm transition-all placeholder:text-neutral-400 dark:text-white resize-y";
  const statusStyles = error 
    ? "border-red-500 focus:ring-red-500/50" 
    : "focus:ring-primary-500/50 focus:border-primary-500 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700";

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseStyles} ${statusStyles} ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
export default Textarea;
