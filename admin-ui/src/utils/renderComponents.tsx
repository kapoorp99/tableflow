import { Component } from "../settings/types";

export default function renderComponents(components: Component[] = []) {
  return (
    <>
      {components.map((component) => {
        const Component = component.component;
        return <Component key={component.key || 0} />;
      })}
    </>
  );
}
