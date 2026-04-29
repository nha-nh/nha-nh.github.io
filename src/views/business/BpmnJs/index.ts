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

class Base {
  protected modeler: BpmnModeler | null = null;
  protected modeling: any = null;
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
    this.createDiagram(xml);
  }
  private async createDiagram(xml?: string) {
    if (xml) {
      await this.modeler?.importXML(xml);
    } else {
      await this.modeler?.createDiagram();
    }
    const canvas = this.modeler?.get("canvas") as {
      zoom: (arg: string) => void;
    };
    canvas.zoom("fit-viewport");
    await this.onDiagramReady();
  }
  protected async onDiagramReady() {}
  async destroy() {
    await this.modeler?.destroy();
    this.modeler = null;
  }
}

class BpmnJs extends Base {}
export default BpmnJs;
