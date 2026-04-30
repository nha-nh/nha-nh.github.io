<script setup lang="ts">
import { _Utility_GenerateUUID } from "nhanh-pure-function";
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import { FormEditor } from "@bpmn-io/form-js-editor";
import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";

const id = _Utility_GenerateUUID("form-js-");
const form = shallowRef<FormEditor | null>(null);

const schema = {
  components: [
    {
      text: "# File an Invoice\n\nAdd your invoice details below.",
      type: "text",
      id: "Field_1ef7317",
    },
    {
      label: "Creditor",
      key: "creditor",
      type: "textfield",
      validate: {
        required: true,
      },
      id: "Field_0dg4nlh",
    },
    {
      label: "Invoice Number",
      description: "An invoice number in the format: C-123.",
      key: "invoiceNumber",
      type: "textfield",
      validate: {
        pattern: "^C-[0-9]+$",
      },
      id: "Field_0i1xres",
    },
    {
      label: "Submit",
      action: "submit",
      key: "submit",
      type: "button",
      id: "Field_1lmhb0p",
    },
  ],
  schemaVersion: 19,
  exporter: {
    name: "form-js (https://demo.bpmn.io)",
    version: "1.19.0",
  },
  type: "default",
  id: "Form_1nxhnfm",
};

onMounted(async () => {
  form.value = new FormEditor({ container: `#${id}` });
  await form.value.importSchema(schema);
});

onBeforeUnmount(() => {
  void form.value?.destroy();
  form.value = null;
});
</script>

<template>
  <div :id="id" class="form-js-box"></div>
</template>

<style scoped lang="less">
.form-js-box {
  width: 100%;
  height: 100%;
  border: 1px solid #e5e7eb;
}
</style>
