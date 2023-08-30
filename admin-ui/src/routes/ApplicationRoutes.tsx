import { Navigate, Routes } from "react-router-dom";
import Imports from "../features/imports";
import Main from "../features/layouts/main";
import SettingsPage from "../features/settingsPage";
import { Component } from "../settings/types";
import useComponentsStore from "../stores/componentsStore";
import parseRoutes from "./utils/parseRoutes";
import { RoutesType } from "./types";
import ImporterRoutes from "./ImporterRoutes";

const applicationRoutes: RoutesType = [
  {
    paths: "importers/*",
    children: <ImporterRoutes />,
  },
  {
    paths: "data",
    layout: Main,
    children: <Imports />,
  },
  {
    paths: "settings",
    layout: Main,
    children: <SettingsPage />,
  },
  {
    paths: "*",
    children: <Navigate to={"importers"} />,
  },
];

const componentsToRoutes = (components: Component[]) =>
  components?.map((item) => ({
    paths: [item.key || ""],
    children: item.component({}) || <></>,
    layout: Main,
  }));

export default function ApplicationRoutes() {
  const components = useComponentsStore((state) => state.components);
  const { PAGES } = components;
  const routes = [...applicationRoutes, ...(PAGES ? componentsToRoutes(PAGES) : [])];

  return <Routes>{parseRoutes(routes)}</Routes>;
}
