<script lang="ts" setup>
import { configProviderPropsRef } from "@/utils/windows";
import {
  _Utility_GenerateUUID,
  _Element_DropZoneManager,
} from "nhanh-pure-function";
import { onMounted, onUnmounted, ref } from "vue";

interface Props {
  accept?: string;
}
const props = defineProps<Props>();

interface Emit {
  (e: "drop-callback", files: File[]): void;
}
const emit = defineEmits<Emit>();

const id = _Utility_GenerateUUID("handle-file-drag-");
const isFileDropHintVisible = ref(false);
const dropZoneManager = new _Element_DropZoneManager();
onMounted(() => {
  dropZoneManager.add({
    dom: "#" + id,
    targetType: (props.accept as any) || undefined,
    dropCallback: (files) => {
      if (files.length > 0) emit("drop-callback", Array.from(files));
      else window.$message.warning("请拖拽指定的文件类型");
    },
    activeCallback: (active) => {
      isFileDropHintVisible.value = active;
    },
  });
});
onUnmounted(() => {
  dropZoneManager.destroy();
});
</script>

<template>
  <div
    :id="id"
    :class="['handle-file-drag', isFileDropHintVisible && 'file-drop-hint']"
    :style="{
      '--color':
        configProviderPropsRef.theme?.common?.successColor || '#63e2b7',
    }"
    :drag-tip="`请将文件拖拽至此：${accept}`"
  >
    <slot />
  </div>
</template>

<style scoped lang="less">
.file-drop-hint {
  position: relative;
  &::after {
    content: attr(drag-tip);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99;

    background-color: color-mix(in srgb, var(--color) 20%, transparent);
    border: 2px dashed var(--color);
    border-radius: 4px;
    font-size: 30px;
    color: var(--color);
    text-decoration: wavy underline;
  }
}
</style>
