import React from "react";
import Navbar from "@/components/navigation/Navbar";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar disabledScroll={true} />
      <div className="mt-10">{children}</div>
    </div>
  );
}
