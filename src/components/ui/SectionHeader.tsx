import React from "react";

export interface SectionHeaderProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

/**
 * Reusable SectionHeader component to maintain clean editorial heading layouts.
 */
export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end"
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignments[align]} ${className}`}>
      {badge && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3 select-none">
          {badge}
        </span>
      )}
      
      {title && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
