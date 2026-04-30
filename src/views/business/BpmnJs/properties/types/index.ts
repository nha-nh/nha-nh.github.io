import BpmnModeler from "bpmn-js/lib/Modeler";
import { getStartEventGroup } from "./start-event";
import { getTaskGroup } from "./task";
import type { Element as BpmnElement } from "bpmn-js/lib/model/Types";

export type Deps = {
  bpmnjs: BpmnModeler;
  modeling: {
    updateProperties: (
      element: any,
      properties: Record<string, unknown>,
    ) => void;
  };
  debounceInput: (fn: (...args: any[]) => void) => (...args: any[]) => void;
};

export type GetGroup = (config: {
  element: BpmnElement;
  bpmnjs: Deps["bpmnjs"];
  modeling: Deps["modeling"];
  debounceInput: Deps["debounceInput"];
}) => {
  id: string;
  label: string;
  entries: {
    id: string;
    element: BpmnElement;
    component: any;
    isEdited: () => boolean;
    label?: string;
    debounceInput?: Deps["debounceInput"];
    modeling?: Deps["modeling"];
    bpmnjs?: Deps["bpmnjs"];
  }[];
};

type GroupConfig = { type: string; group: GetGroup };

export const customBpmnGroups: GroupConfig[] = [
  {
    type: "bpmn:Task",
    group: getTaskGroup,
  },
  {
    type: "bpmn:StartEvent",
    group: getStartEventGroup,
  },
];
