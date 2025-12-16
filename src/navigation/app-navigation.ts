export interface MenuItem {
  key: string;
  text: string;
  icon: string;
  path: string;
  roles: number[];
  items: MenuItem[];
}
export const navigation: MenuItem[] = [
  {
    key: "home",
    text: "Dashboard",
    icon: "fa fa-cubes",
    path: "/",
    roles: [2],
    items: [],
  },
  {
    key: "dictionairies",
    text: "Dictionairies",
    icon: "fa fa-cube",
    path: "#",
    roles: [2],
    items: [
      {
        key: "statuses",
        text: "Statuses",
        icon: "",
        path: "/admin/dictionairies/statuses",
        roles: [2],
        items: [],
      },
      {
        key: "review-stages",
        text: "Review Stages",
        icon: "",
        path: "/admin/dictionairies/review-stages",
        roles: [2],
        items: [],
      },
    ],
  },
  {
    key: "users",
    text: "Users",
    icon: "fa fa-user",
    path: "#",
    roles: [2],
    items: [
      {
        key: "all-users",
        text: "All Users",
        icon: "",
        path: "/admin/users/list",
        roles: [2],
        items: [],
      },
       {
        key: "all-rles",
        text: "All Roles",
        icon: "",
        path: "/admin/roles/list",
        roles: [2],
        items: [],
      },
    ],
  },
    {
    key: "towns",
    text: "Towns",
    icon: "fa fa-globe",
    path: "#",
    roles: [2],
    items: [
      {
        key: "all-towns",
        text: "All Towns",
        icon: "",
        path: "/admin/towns/list",
        roles: [2],
        items: [],
      },
    ],
  },
  {
    key: "walk-routes",
    text: "Walk Routes",
    icon: "fa fa-map-marker",
    path: "#",
    roles: [2],
    items: [
      {
        key: "all-walkroutes",
        text: "All Walk Routes",
        icon: "",
        path: "/admin/walk-routes/list",
        roles: [2],
        items: [],
      },
    ],
  },
  {
    key: "customers",
    text: "Customers",
    icon: "fa fa-users",
    path: "#",
    roles: [2],
    items: [
      {
        key: "all-customers",
        text: "All Customers",
        icon: "",
        path: "/admin/customers/list",
        roles: [2],
        items: [],
      },
    ],
  },
  {
    key: "meters",
    text: "Meters",
    icon: "fa fa-tachometer",
    path: "#",
    roles: [2],
    items: [
      {
        key: "groups",
        text: "All Meters",
        icon: "",
        path: "/admin/meters/list",
        roles: [2],
        items: [],
      },
    ],
  },
  {
    key: "meter-readings",
    text: "Meter Readings",
    icon: "fa fa-exchange",
    path: "#",
    roles: [2],
    items: [
      {
        key: "groups",
        text: "All benches",
        icon: "",
        path: "/admin/meter-readings/list",
        roles: [2],
        items: [],
      },
    ],
  },
];
