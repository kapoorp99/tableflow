import { Link, useLocation } from "react-router-dom";
import { Button } from "@tableflow/ui-library";
import { ButtonProps, buttonVariant } from "@tableflow/ui-library/build/Button/types";
import { Component } from "../../../settings/types";
import useComponentsStore from "../../../stores/componentsStore";
import style from "../style/MainMenu.module.scss";

type menuItem = {
  link: string;
  label: string;
};

const menuItems: menuItem[] = [
  {
    link: "/importers",
    label: "Importers",
  },
  {
    link: "/data",
    label: "Data",
  },
];

const componentsToMenuItems = (components: Component[]) => components?.map((item) => ({ link: "/" + (item?.key || ""), label: item?.label || "" }));

export default function MainMenu() {
  const location = useLocation();
  const { pathname } = location;

  const components = useComponentsStore((state) => state.components);
  const { PAGES } = components;
  const items = [...menuItems, ...(PAGES ? componentsToMenuItems(PAGES) : [])];

  return (
    <div className={style.menu}>
      {items.map((item, i) => {
        const active = pathname.includes(item.link);
        return <MenuItem key={i} {...item} variants={[...(active ? ["secondary"] : ["bare"]), "small"] as buttonVariant[]} type="button" />;
      })}
    </div>
  );
}

function MenuItem({ link, label, ...buttonProps }: menuItem & ButtonProps) {
  return (
    <Link to={link}>
      <Button {...buttonProps} tabIndex={-1}>
        {label}
      </Button>
    </Link>
  );
}
