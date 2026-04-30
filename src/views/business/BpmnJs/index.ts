import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js-color-picker/colors/color-picker.css";
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import "@bpmn-io/properties-panel/dist/assets/properties-panel.css";
import gridModule from "diagram-js-grid";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
// @ts-ignore
import minimapModule from "diagram-js-minimap";
// @ts-ignore
import BpmnColorPickerModule from "bpmn-js-color-picker";
import customTranslateModule from "./translate-zh";
import colorPickerConfig from "./color-picker-config";
import customPropertiesModule from "./properties";
import type Canvas from "diagram-js/lib/core/Canvas";
import { _File_Download } from "nhanh-pure-function";

/**
 * 参考
 * https://bpmn.io/toolkit/bpmn-js/walkthrough/
 * https://github.com/bpmn-io/bpmn-js-examples/blob/main/properties-panel-list-extension/README.md
 * https://demo.bpmn.io/s/start
 */

class Base {
  protected modeler: BpmnModeler | null = null;
  protected modeling: any;
  protected canvas: Canvas;
  constructor(id: string, xml?: string, propertiesPanelId?: string) {
    this.modeler = new BpmnModeler({
      container: `#${id}`,
      propertiesPanel: propertiesPanelId
        ? { parent: `#${propertiesPanelId}` }
        : undefined,
      colorPicker: colorPickerConfig,
      additionalModules: [
        gridModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        minimapModule,
        BpmnColorPickerModule,
        customTranslateModule,
        customPropertiesModule,
      ],
    });
    this.modeling = this.modeler.get("modeling");
    this.canvas = this.modeler.get("canvas");
    this.createDiagram(xml);
  }
  private async createDiagram(xml?: string) {
    if (xml) {
      await this.modeler?.importXML(xml);
    } else {
      await this.modeler?.createDiagram();
    }
    this.canvas?.zoom("fit-viewport");
    await this.onDiagramReady();
  }
  protected async onDiagramReady() {}
  async destroy() {
    await this.modeler?.destroy();
    this.modeler = null;
    this.canvas = null as any;
  }
}

class BpmnJs extends Base {
  pickImportXml() {
    const modeler = this.modeler;
    if (!modeler) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xml,.bpmn,text/xml,application/xml";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const xml = await file.text();
        if (!xml) throw new Error("所选文件内容为空");
        await modeler.importXML(xml);
        this.canvas?.zoom("fit-viewport");
      } catch (e) {
        console.error("导入 XML 失败:", e);
        window.alert("导入失败，请检查文件是否为有效 BPMN/XML");
      } finally {
        input.value = "";
      }
    };
    input.click();
  }

  async createNewDiagram() {
    if (!this.modeler) return;
    try {
      await this.modeler.createDiagram();
      this.canvas.zoom("fit-viewport");
    } catch (e) {
      console.error("新建图失败:", e);
      window.alert("新建图失败");
    }
  }

  async exportDiagramXml() {
    if (!this.modeler) return;
    try {
      const { xml } = await this.modeler.saveXML({ format: true });
      if (!xml) throw new Error("saveXML 返回空");
      const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
      const href = URL.createObjectURL(blob);
      _File_Download({ href, fileName: "diagram.xml" });
      URL.revokeObjectURL(href);
    } catch (e) {
      console.error("导出 XML 失败:", e);
      window.alert("导出 XML 失败");
    }
  }

  async getDiagramXml() {
    if (!this.modeler) return "";
    const { xml } = await this.modeler.saveXML({ format: true });
    if (!xml) throw new Error("saveXML 返回空");
    return xml;
  }

  async exportDiagramSvg() {
    if (!this.modeler) return;
    try {
      const { svg } = await this.modeler.saveSVG();
      if (!svg) throw new Error("saveSVG 返回空");
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const href = URL.createObjectURL(blob);
      _File_Download({ href, fileName: "diagram.svg" });
      URL.revokeObjectURL(href);
    } catch (e) {
      console.error("导出 SVG 失败:", e);
      window.alert("导出 SVG 失败");
    }
  }

  zoomFitView() {
    this.canvas.zoom("fit-viewport");
  }

  zoomInDiagram() {
    const next = Math.min(this.canvas.zoom() * 1.25, 4);
    this.canvas.zoom(next);
  }

  zoomOutDiagram() {
    const next = Math.max(this.canvas.zoom() / 1.25, 0.2);
    this.canvas.zoom(next);
  }
}
export default BpmnJs;
