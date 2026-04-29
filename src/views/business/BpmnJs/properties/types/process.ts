import { createElement } from "@bpmn-io/properties-panel/preact";
import type { SaveXMLResult, SaveXMLOptions } from "bpmn-js/lib/BaseViewer";
import type { GetGroup } from ".";

type BpmnJs = {
  saveXML: (options?: SaveXMLOptions) => Promise<SaveXMLResult>;
  importXML: (xml: string) => Promise<unknown>;
};

function ExportXmlButtonEntry(props: { id: string; bpmnjs: BpmnJs }) {
  const { id, bpmnjs } = props;

  const onExportXml = async () => {
    try {
      const { xml } = await bpmnjs.saveXML({ format: true });
      if (!xml) throw new Error("saveXML 返回空 xml");
      const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diagram.xml";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("导出 XML 失败:", error);
      window.alert("导出 XML 失败，请稍后重试");
    }
  };

  return createElement(
    "div",
    { "data-entry-id": id, class: "bio-properties-panel-entry" },
    createElement(
      "button",
      { type: "button", onClick: onExportXml },
      "导出 XML",
    ),
  );
}

function ImportXmlButtonEntry(props: { id: string; bpmnjs: BpmnJs }) {
  const { id, bpmnjs } = props;

  const onImportXml = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xml,.bpmn,text/xml,application/xml";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const xml = await file.text();
        if (!xml) throw new Error("所选文件内容为空");
        await bpmnjs.importXML(xml);
      } catch (error) {
        console.error("导入 XML 失败:", error);
        window.alert("导入 XML 失败，请检查文件格式");
      } finally {
        input.value = "";
      }
    };

    input.click();
  };

  return createElement(
    "div",
    { "data-entry-id": id, class: "bio-properties-panel-entry" },
    createElement(
      "button",
      { type: "button", onClick: onImportXml },
      "导入 XML",
    ),
  );
}

export const getProcessGroup: GetGroup = (config) => {
  const { element, bpmnjs } = config;
  return {
    id: "nhanh-process-group",
    label: "流程扩展",
    entries: [
      {
        id: "export-xml",
        element,
        component: ExportXmlButtonEntry,
        isEdited: () => false,
        bpmnjs,
      },
      {
        id: "import-xml",
        element,
        component: ImportXmlButtonEntry,
        isEdited: () => false,
        bpmnjs,
      },
    ],
  };
};
