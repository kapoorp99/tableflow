import ApiKey from "../forms/ApiKey";
import useComponentsStore from "../../stores/componentsStore";
import renderComponents from "../../utils/renderComponents";
import style from "./style/SettingsPage.module.scss";

export default function SettingsPage() {
  const components = useComponentsStore((state) => state.components);
  const { SETTINGS_PAGE } = components;

  return (
    <div className={style.wrapper}>
      <div className="container">
        <ApiKey />
        {renderComponents(SETTINGS_PAGE)}
      </div>
    </div>
  );
}
