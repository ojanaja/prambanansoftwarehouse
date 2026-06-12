export interface NavLink {
  href: string;
  labelKey: string;
}

export const navLinks: NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/solutions", labelKey: "solutions" },
  { href: "/services", labelKey: "services" },
  { href: "/work", labelKey: "work" },
  { href: "/about", labelKey: "about" },
  { href: "/insights", labelKey: "insights" },
  { href: "/contact", labelKey: "contact" },
];
