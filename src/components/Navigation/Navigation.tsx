import { Nav, INavStyles, INavLinkGroup } from "@fluentui/react";

const navStyles: Partial<INavStyles> = {
  root: { width: 300 },
};
const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        key: "UserTable",
        name: "UserTable",
        url: "/",
      },
      {
        key: "NewUser",
        name: "NewUser",
        url: "/new-user",
      },
      {
        key: "Random",
        name: "Random",
        url: "/Random",
      },
    ],
  },
];

const Navigation = () => {
  return (
    <Nav
      styles={navStyles}
      ariaLabel="Nav example similar to one found in this demo page"
      groups={navLinkGroups}
    />
  );
};

export default Navigation;
