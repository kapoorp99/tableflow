import { create } from "zustand";
import components from "../settings/components";
import { Components } from "../settings/types";

type ComponentsStore = {
  components: Components;
  setComponents: (components: Components) => void;
};

const useComponentsStore = create<ComponentsStore>((set) => ({
  components,
  setComponents: (newComponents) => {
    return set({ components: { ...components, ...newComponents } });
  },
}));

export default useComponentsStore;
