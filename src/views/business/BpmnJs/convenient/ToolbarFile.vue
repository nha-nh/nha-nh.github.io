<script setup lang="ts">
import { ref } from "vue";
import { NButton, NCode, NIcon, NModal, NScrollbar, NTooltip } from "naive-ui";
import {
  AddCircleOutline,
  DocumentOutline,
  DownloadOutline,
  EyeOutline,
  ImageOutline,
} from "@vicons/ionicons5";
import type BpmnJs from "../index";

const props = defineProps<{
  bpmnJs: InstanceType<typeof BpmnJs> | null;
}>();

const run = (fn: () => void | Promise<void>) => {
  if (!props.bpmnJs) return;
  void Promise.resolve(fn()).catch((e) => console.error(e));
};

const previewShow = ref(false);
const previewLoading = ref(false);
const previewXml = ref("");

const openXmlPreview = async () => {
  if (!props.bpmnJs) return;
  previewShow.value = true;
  previewLoading.value = true;
  try {
    previewXml.value = await props.bpmnJs.getDiagramXml();
  } catch (e) {
    console.error("预览 XML 失败:", e);
    previewXml.value = "";
    window.alert("预览 XML 失败");
  } finally {
    previewLoading.value = false;
  }
};
</script>

<template>
  <div class="toolbar-file">
    <div class="toolbar-pill">
      <NTooltip placement="top">
        <template #trigger>
          <NButton
            quaternary
            size="small"
            :disabled="!bpmnJs"
            @click="run(() => props.bpmnJs!.pickImportXml())"
          >
            <template #icon>
              <NIcon :component="DocumentOutline" />
            </template>
          </NButton>
        </template>
        导入 BPMN / XML
      </NTooltip>
      <span class="divider" />
      <NTooltip placement="top">
        <template #trigger>
          <NButton
            quaternary
            size="small"
            :disabled="!bpmnJs"
            @click="run(() => props.bpmnJs!.createNewDiagram())"
          >
            <template #icon> <NIcon :component="AddCircleOutline" /></template>
          </NButton>
        </template>
        新建空白图
      </NTooltip>
    </div>
    <div class="toolbar-pill">
      <NTooltip placement="top">
        <template #trigger>
          <NButton
            quaternary
            size="small"
            :disabled="!bpmnJs"
            @click="run(() => props.bpmnJs!.exportDiagramXml())"
          >
            <template #icon>
              <NIcon :component="DownloadOutline" />
            </template>
          </NButton>
        </template>
        导出 XML
      </NTooltip>
      <span class="divider" />
      <NTooltip placement="top">
        <template #trigger>
          <NButton
            quaternary
            size="small"
            :disabled="!bpmnJs"
            @click="run(() => props.bpmnJs!.exportDiagramSvg())"
          >
            <template #icon> <NIcon :component="ImageOutline" /></template>
          </NButton>
        </template>
        导出 SVG 图片
      </NTooltip>
    </div>

    <div class="toolbar-pill">
      <NTooltip placement="top">
        <template #trigger>
          <NButton
            quaternary
            size="small"
            :disabled="!bpmnJs"
            @click="run(openXmlPreview)"
          >
            <template #icon>
              <NIcon :component="EyeOutline" />
            </template>
          </NButton>
        </template>
        预览 XML
      </NTooltip>
    </div>

    <NModal
      v-model:show="previewShow"
      preset="card"
      title="XML 预览"
      style="width: 960px; max-width: 92vw"
      :bordered="false"
      size="small"
      :trap-focus="false"
    >
      <NScrollbar style="max-height: calc(90vh - 140px)">
        <NCode
          :code="
            previewLoading ? 'Loading...' : previewXml || '<!-- 暂无内容 -->'
          "
          language="xml"
        />
      </NScrollbar>
    </NModal>
  </div>
</template>

<style scoped lang="less">
@import "./toolbar-surface.less";

.toolbar-file {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.toolbar-pill {
  .toolbar-pill-surface();
}

.divider {
  .toolbar-divider-vertical();
}
</style>
