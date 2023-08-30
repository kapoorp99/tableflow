import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Icon, Tabs, useTabs, useThemeStore } from "@tableflow/ui-library";
import { defaultAppHost, getImporterURL } from "../../api/api";
import { Component } from "../../settings/types";
import useComponentsStore from "../../stores/componentsStore";
import notification from "../../utils/notification";
import { ImporterViewProps } from "./types";
import style from "./style/Importer.module.scss";
import Code from "../code";
import Settings from "../settings";
import Templates from "../templates";

const componentsToTabs = (components: Component[]) => components?.reduce((a, t) => ({ ...a, ...{ [t.key || ""]: t?.label || null } }), {});

export default function ImporterPage({ importer }: ImporterViewProps) {
  const importerId = importer.id;
  const { importerTab } = useParams();
  const templateCount = importer?.template?.template_columns?.length;

  const components = useComponentsStore((state) => state.components);
  const { IMPORTER_TABS } = components;

  const getTabComponent = (key: string) => IMPORTER_TABS.find((t) => t?.key === key)?.component({ importer });

  const tabs = useTabs(
    {
      template: <>Template {!!templateCount && <small className={style.miniBadge}>{templateCount}</small>}</>,
      code: "Code",
      ...(IMPORTER_TABS ? componentsToTabs(IMPORTER_TABS) : {}),
      settings: "Settings",
    },
    importerTab || "template"
  );

  const navigate = useNavigate();
  const copyToClipboard = (text: string) => {
    // TODO: This won't work on non-secure origins (besides localhost), update to use a different method
    // https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
    navigator.clipboard.writeText(text);
    notification({ type: "success", message: "Copied to clipboard" });
  };

  const { tab } = tabs;
  const theme = useThemeStore((state) => state.theme);

  const importerURL = getImporterURL();
  const importerPreviewURL = `${importerURL}?importerId=${importerId}&darkMode=${theme === "light" ? "false" : "true"}`;
  // Only provide the importer host URL to the code preview if it's not being hosted on TableFlow
  const importerCodeURL = window.location.hostname === defaultAppHost ? "" : importerURL;

  useEffect(() => {
    if (importerTab !== tab) navigate(`/importers/${importerId}/${tab}`);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (importerTab !== tab) tabs.setTab(importerTab);
  }, [importerTab]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <div className={style.importer}>
        <div className="container">
          <div className={style.top}>
            <div className={style.heading}>
              <div>
                <div className={style.title}>
                  <Icon icon="cube" size="m" className={style.icon} />
                  <h1>{importer.name}</h1>
                </div>

                <div className={style.subTitle}>
                  <Button type="button" variants={["bare", "square"]} onClick={() => copyToClipboard(importer.id)} title="Copy to clipboard">
                    <Icon icon="copy" size="s" className={style.iconFix} />
                  </Button>
                  <small>{importer.id}</small>
                </div>
              </div>
            </div>
            <div>
              <Button
                icon="share"
                type="button"
                variants={theme === "light" ? [] : ["secondary"]}
                onClick={() => window.open(importerPreviewURL, "_blank")}
                title="Open the importer in a new tab to preview">
                Preview
              </Button>
            </div>
          </div>

          <Tabs {...tabs} />

          <div className={style.content}>
            {tab === "template" ? (
              <Templates importer={importer} />
            ) : tab === "code" ? (
              <Code importerId={importerId} theme={theme} hostUrl={importerCodeURL} />
            ) : tab === "settings" ? (
              <Settings importer={importer} />
            ) : IMPORTER_TABS ? (
              getTabComponent(tab)
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
