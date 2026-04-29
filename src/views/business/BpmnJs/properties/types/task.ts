import {
  CheckboxEntry,
  SelectEntry,
  TextFieldEntry,
  isCheckboxEntryEdited,
  isSelectEntryEdited,
  isTextFieldEntryEdited,
} from "@bpmn-io/properties-panel";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import type { Element as BpmnElement } from "bpmn-js/lib/model/Types";
import type { GetGroup } from ".";

type Modeling = {
  updateProperties: (element: any, properties: Record<string, unknown>) => void;
};
type DebounceInput = (fn: (...args: any[]) => void) => (...args: any[]) => void;

const PRESET_REVIEWERS = ["产品", "运营", "财务"];

function getReviewerList(businessObject: any): string[] {
  const raw = businessObject.get("reviewers");
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function saveReviewerList(
  element: any,
  modeling: Modeling,
  reviewers: string[],
) {
  const unique = Array.from(new Set(reviewers));
  modeling.updateProperties(element, {
    reviewers: unique.length ? unique.join(",") : undefined,
  });
}

function ApprovalRequiredEntry(props: {
  element: any;
  id: string;
  modeling: Modeling;
}) {
  const { element, id, modeling } = props;
  const businessObject = getBusinessObject(element);

  const getValue = () => businessObject.get("approvalRequired") || "no";
  const setValue = (value: string) => {
    modeling.updateProperties(element, {
      approvalRequired: value === "no" ? undefined : value,
    });
  };
  const getOptions = () => [
    { label: "否", value: "no" },
    { label: "是", value: "yes" },
  ];

  return SelectEntry({
    id,
    element,
    label: "需要审批",
    description: "仅在任务上显示",
    getValue,
    setValue,
    getOptions,
  });
}

function ReviewerPresetEntry(props: {
  element: any;
  id: string;
  label: string;
  modeling: Modeling;
}) {
  const { element, id, label, modeling } = props;
  const businessObject = getBusinessObject(element);

  const getValue = () => getReviewerList(businessObject).includes(label);
  const setValue = (checked: boolean) => {
    const current = getReviewerList(businessObject);
    const next = checked
      ? [...current, label]
      : current.filter((item) => item !== label);
    saveReviewerList(element, modeling, next);
  };

  return CheckboxEntry({
    id,
    element,
    label,
    getValue,
    setValue,
  });
}

function ReviewerCustomEntry(props: {
  element: any;
  id: string;
  modeling: Modeling;
  debounceInput: DebounceInput;
}) {
  const { element, id, modeling, debounceInput } = props;
  const businessObject = getBusinessObject(element);

  const getValue = () => {
    const current = getReviewerList(businessObject);
    return current.filter((item) => !PRESET_REVIEWERS.includes(item)).join(",");
  };
  const setValue = (value: string) => {
    const customList = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const presetSelected = getReviewerList(businessObject).filter((item) =>
      PRESET_REVIEWERS.includes(item),
    );
    saveReviewerList(element, modeling, [...presetSelected, ...customList]);
  };

  return TextFieldEntry({
    id,
    element,
    label: "自定义项",
    description: "多个值用英文逗号分隔",
    debounce: debounceInput,
    getValue,
    setValue,
  });
}

export const getTaskGroup: GetGroup = (config) => {
  const { element, modeling, debounceInput } = config;
  return {
    id: "nhanh--task-group",
    label: "任务扩展",
    entries: [
      {
        id: "approvalRequired",
        element,
        component: ApprovalRequiredEntry,
        isEdited: isSelectEntryEdited,
        modeling,
      },
      ...PRESET_REVIEWERS.map((label) => ({
        id: `reviewer-${label}`,
        element,
        component: ReviewerPresetEntry,
        isEdited: isCheckboxEntryEdited,
        label,
        modeling,
      })),
      {
        id: "reviewer-custom",
        element,
        component: ReviewerCustomEntry,
        isEdited: isTextFieldEntryEdited,
        modeling,
        debounceInput,
      },
    ],
  };
};
