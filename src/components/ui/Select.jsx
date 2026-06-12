import React from "react";

/**
 * A custom styled Dropdown Select component.
 */
export const Select = React.forwardRef(({
  children,
  className = "",
  error = false,
  ...props
}, ref) => {
  const baseStyles = "w-full p-3.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 text-sm transition-all appearance-none cursor-pointer dark:text-white";
  const statusStyles = error 
    ? "border-red-500 focus:ring-red-500/50" 
    : "focus:ring-primary-500/50 focus:border-primary-500 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700";

  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={`${baseStyles} ${statusStyles} pr-10 ${className}`}
        {...props}
      >
        {children}
      </select>
      {/* Custom dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
});

Select.displayName = "Select";
export default Select;
