import { Route } from "next";

interface NavLink {
  name: string;
  href: Route;
}

export const navLinksArr: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  // {
  //   name: "Features",
  //   href: "/#features",
  // },
  // {
  //   name: "Pricing",
  //   href: "/pricing",
  // },
  // {
  //   name: "Contact",
  //   href: "/contact",
  // },
];
