import { JSXElementConstructor, ReactElement } from "react";

type Element = (props: any) => ReactElement<any, string | JSXElementConstructor<any>> | null;

export type Component = { component: Element; label?: string; key?: string };

export type Components = {
  [key: string]: Component[];
};
