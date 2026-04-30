<script setup lang="ts">
import { ref } from "vue";
import { NButton, NModal, NScrollbar, NTooltip } from "naive-ui";
import SvgGather from "@/assets/icon/gather";

const show = ref(false);

/**
 * 与当前嵌入的 BpmnModeler（bpmn-js + diagram-js）一致。
 *
 * bpmn.io 演示里常见的 Ctrl+O/S、复制为图片等多半是「网页壳子」实现的，不在建模器内核；
 * 内核里每个快捷键还依赖 editorActions 是否注册（本页按 Modeler 默认模块整理）。
 */
const rows: { keys: string; desc: string }[] = [
  { keys: "Ctrl / ⌘ + Z", desc: "撤销" },
  { keys: "Ctrl / ⌘ + Y，或 Ctrl / ⌘ + Shift + Z", desc: "重做" },
  { keys: "Ctrl / ⌘ + C", desc: "复制所选" },
  { keys: "Ctrl / ⌘ + V", desc: "粘贴" },
  { keys: "Ctrl / ⌘ + X", desc: "剪切" },
  { keys: "Ctrl / ⌘ + D", desc: "复制一份所选" },
  { keys: "Ctrl / ⌘ + A", desc: "全选（不含根节点）" },
  { keys: "Ctrl / ⌘ + F", desc: "搜索（标签等）" },
  { keys: "Delete / Backspace", desc: "删除所选" },
  { keys: "Ctrl / ⌘ + +，或 Ctrl / ⌘ + =", desc: "放大一步" },
  { keys: "Ctrl / ⌘ + -", desc: "缩小一步" },
  { keys: "Ctrl / ⌘ + 0", desc: "缩放到 100%" },
  { keys: "方向键", desc: "微移所选（按住 Shift 加速）" },
  { keys: "Ctrl / ⌘ + 方向键", desc: "平移画布" },
  { keys: "滚轮", desc: "平移画布" },
  { keys: "Ctrl / ⌘ + 滚轮", desc: "以指针为中心缩放" },
  { keys: "Shift + 滚轮（不按 Ctrl / ⌘）", desc: "横向平移画布" },
  { keys: "E", desc: "直接编辑（需无 Ctrl / ⌘ 等修饰键）" },
  { keys: "H", desc: "手型工具" },
  { keys: "L", desc: "套索选择" },
  { keys: "S", desc: "空间工具（Space Tool，调整流上留白）" },
  {
    keys: "C",
    desc: "全局连线工具（无修饰键；复制请用 Ctrl / ⌘ + C）",
  },
  { keys: "R", desc: "替换元素（上下文菜单中的替换）" },
];
</script>

<template>
  <div class="toolbar-shortcuts">
    <NTooltip placement="left">
      快捷键
      <template #trigger>
        <NButton
          quaternary
          size="small"
          class="shortcut-trigger"
          @click="show = true"
        >
          <template #icon>
            <SvgGather icon="Keyboard" />
          </template>
        </NButton>
      </template>
    </NTooltip>

    <NModal
      v-model:show="show"
      preset="card"
      title="快捷键"
      style="width: 900px; max-width: 90vw"
      :bordered="false"
      size="small"
      :trap-focus="false"
    >
      <NScrollbar style="max-height: calc(90vh - 100px)">
        <table class="shortcut-table">
          <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td class="keys">{{ row.keys }}</td>
              <td class="desc">{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </NScrollbar>
    </NModal>
  </div>
</template>

<style scoped lang="less">
@import "./toolbar-surface.less";

.toolbar-shortcuts {
  .toolbar-floating-surface();
  display: flex;
  align-items: center;
  justify-content: center;
}

.shortcut-trigger {
  .toolbar-icon-button();
}

.shortcut-hint {
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 1.55;
  color: #64748b;
}

.shortcut-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  tr:nth-child(even) {
    background: rgba(0, 0, 0, 0.02);
  }

  td {
    padding: 8px 10px;
    vertical-align: top;
  }

  .keys {
    width: 46%;
    min-width: 11em;
    font-family: ui-monospace, monospace;
    color: #374151;
    white-space: normal;
    line-height: 1.35;
  }

  .desc {
    color: #6b7280;
  }
}
</style>
