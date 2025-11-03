

export const dropdownLinks: DashboardLink[] = [
  {
    icon: <UserRoundPen />,
    title: "Profile",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
  {
    icon: <Settings />,
    title: "Settings",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
];

type Props = {
  user: AuthUserType;
  userRole: UserRole;
  homeLinks: DashboardLink[];
};


