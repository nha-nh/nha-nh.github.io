import { createElement } from "@bpmn-io/properties-panel/preact";
import { TextFieldEntry } from "@bpmn-io/properties-panel";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import type { GetGroup } from ".";

type Modeling = {
  updateProperties: (element: any, properties: Record<string, unknown>) => void;
};

type DebounceInput = (fn: (...args: any[]) => void) => (...args: any[]) => void;

function StartEventCustomTextEntry(props: {
  element: any;
  id: string;
  debounceInput: DebounceInput;
}) {
  const { element, id, debounceInput } = props;
  const businessObject = getBusinessObject(element);
  const getValue = () => businessObject.get("selectedFormName") || "";

  // 不写回 modeling，从而达到“禁止输入/不生效”的效果
  const setValue = (_value: string) => {};

  return TextFieldEntry({
    id,
    element,
    label: "节点属性面板自定义",
    debounce: debounceInput,
    disabled: true,
    getValue,
    setValue,
  });
}

function SelectFormButtonEntry(props: {
  element: any;
  id: string;
  modeling: Modeling;
}) {
  const { element, id, modeling } = props;
  const onSelectForm = () => {
    const formName = window.prompt("请输入表单名称", "");
    if (formName === null) return;
    modeling.updateProperties(element, {
      selectedFormName: formName || undefined,
    });
  };
  return createElement(
    "div",
    { "data-entry-id": id, class: "bio-properties-panel-entry" },
    createElement(
      "button",
      { type: "button", onClick: onSelectForm },
      "选择表单",
    ),
  );
}

export const getStartEventGroup: GetGroup = (config) => {
  const { element, modeling, debounceInput } = config;
  return {
    id: "nhanh-start-event-group",
    label: "开始事件扩展",
    entries: [
      {
        id: "nodeCustomText",
        element,
        component: StartEventCustomTextEntry,
        isEdited: () => false,
        debounceInput,
      },
      {
        id: "selectForm",
        element,
        component: SelectFormButtonEntry,
        isEdited: () => false,
        modeling,
      },
    ],
  };
};
