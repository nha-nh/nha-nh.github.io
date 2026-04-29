import { is } from "bpmn-js/lib/util/ModelUtil";
import type { Element as BpmnElement } from "bpmn-js/lib/model/Types";
import { customBpmnGroups, type Deps } from "./types/index";

class CustomPropertiesProvider {
  static $inject = ["propertiesPanel", "bpmnjs", "modeling", "debounceInput"];

  private bpmnjs: Deps["bpmnjs"];
  private modeling: Deps["modeling"];
  private debounceInput: Deps["debounceInput"];

  constructor(
    propertiesPanel: any,
    bpmnjs: Deps["bpmnjs"],
    modeling: Deps["modeling"],
    debounceInput: Deps["debounceInput"],
  ) {
    this.bpmnjs = bpmnjs;
    this.modeling = modeling;
    this.debounceInput = debounceInput;

    propertiesPanel.registerProvider(500, this);
  }

  getGroups(element: BpmnElement) {
    return (groups: any[]) => {
      const next = [...groups];

      for (const { type, group } of customBpmnGroups) {
        if (!is(element, type)) continue;
        next.push(
          group({
            element,
            bpmnjs: this.bpmnjs,
            modeling: this.modeling,
            debounceInput: this.debounceInput,
          }),
        );
      }

      return next;
    };
  }
}

export default CustomPropertiesProvider;
