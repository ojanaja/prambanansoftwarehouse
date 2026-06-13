import { ReactNode } from "react";

export const metadata = {
  title: "Prambanan Digital Studio",
  description: "Sanity Content Management System",
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
