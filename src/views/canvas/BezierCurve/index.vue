<script setup lang="ts">
import ResponsiveDirectionLayout from "@/components/layout/ResponsiveDirectionLayout.vue";
import { Settings } from "@/components/popups/components/Settings";
import {
  NAlert,
  NButton,
  NScrollbar,
  NSlider,
  NText,
  NIcon,
  NH2,
  NFlex,
  NDivider,
  NCode,
  NUpload,
  NUploadDragger,
  type UploadFileInfo,
} from "naive-ui";
import {
  _Utility_GenerateUUID,
  _Canvas_Axis,
  _Math_GetMidpoint,
  _Animate_CreateOscillator,
  _Tip,
  _Browser_CopyToClipboard,
  _Utility_UndoRedoHistory,
  _Utility_Clone,
} from "nhanh-pure-function";
import { onMounted, onUnmounted, ref, watch } from "vue";
import BezierCurve from ".";
import CrosshairIndicator from "../../../components/singleFile/CrosshairIndicator.vue";
import {
  CopyOutline,
  PauseCircleOutline,
  PlayCircleOutline,
  TrashOutline,
} from "@vicons/ionicons5";

let defaultCode = ``;
const codeModules = import.meta.glob("./demo.vue", {
  query: "?raw",
  import: "default",
});
codeModules["./demo.vue"]().then((code) => {
  defaultCode = code as string;
  updateAspectRatio();
});

const id = _Utility_GenerateUUID("BezierCurve-");
let axis: _Canvas_Axis;
watch(
  () => Settings.value.theme,
  (theme) => axis?.setTheme(theme),
);

const progress = ref(1);
const precision = 0.005;
const oscillator = _Animate_CreateOscillator(0, 1, 1 / precision, (v) => {
  progress.value = v;
  updateCurve();
});

const nodes = [
  [-2, 2],
  [-2, -2],
  [2, -2],
].map(
  (node) =>
    new _Canvas_Axis.Point({
      value: node as [number, number],
      isDraggable: true,
    }),
);
function getNodesValue() {
  return nodes.map((node) => node.value!);
}
const undoRedoHistory = new _Utility_UndoRedoHistory({
  clone: _Utility_Clone,
  initialState: getNodesValue(),
});

const referenceImageOpacity = ref(1);
const billboard = new _Canvas_Axis.Billboard({
  value: [
    [-5, -5],
    [5, 5],
  ],
  isInteractive: false,
  objectFit: "contain",
  opacity: referenceImageOpacity.value,
});
billboard.url = "";

const hasReferenceImage = ref(false);
let refImageBlobUrl: string | null = null;
function revokeRefImageBlob() {
  if (refImageBlobUrl) {
    URL.revokeObjectURL(refImageBlobUrl);
    refImageBlobUrl = null;
  }
}
function onRefImageFileList(list: UploadFileInfo[]) {
  const raw = list[0]?.file;
  if (!raw) return;
  const file = raw as File;
  if (!file.type.startsWith("image/")) {
    window.$message.warning("请选择图片文件");
    return;
  }
  revokeRefImageBlob();
  refImageBlobUrl = URL.createObjectURL(file);
  billboard.url = refImageBlobUrl;
  hasReferenceImage.value = true;
}
function removeReferenceImage() {
  revokeRefImageBlob();
  billboard.url = "";
  hasReferenceImage.value = false;
}
function onReferenceOpacityChange(v: number | null) {
  if (v == null || Number.isNaN(v)) return;
  const t = Math.min(1, Math.max(0, v));
  referenceImageOpacity.value = t;
  billboard.opacity = t;
}

/** 宽高比 */
const aspectRatio = ref(1);
/** 归一化 */
const normalizedNodes = ref<[number, number][]>([]);
/** 示例代码 */
const demoCode = ref("");
function updateAspectRatio() {
  const x = nodes.map((node) => node.value![0]);
  const y = nodes.map((node) => node.value![1]);
  const minx = Math.min(...x);
  const maxx = Math.max(...x);
  const miny = Math.min(...y);
  const maxy = Math.max(...y);
  const width = maxx - minx;
  const height = maxy - miny;

  /** 统一精度 */
  const toFixed = (x: number) => Number(x.toFixed(4));

  aspectRatio.value = toFixed(width / height);
  normalizedNodes.value = nodes.map((node) => [
    toFixed((node.value![0] - minx) / width),
    toFixed((node.value![1] - miny) / height),
  ]);

  if (defaultCode) {
    demoCode.value = defaultCode.replace(
      "const nodes: [number, number][] = [];",
      `const nodes: [number, number][] = ${JSON.stringify(normalizedNodes.value)};`,
    );
    demoCode.value = demoCode.value.replace(
      "const aspectRatio = 1;",
      `const aspectRatio = ${aspectRatio.value};`,
    );
  }
}
updateAspectRatio();

/** 辅助线 */
const auxiliaryLine = new _Canvas_Axis.Line({
  style: { stroke: { color: "#555", dash: true } },
  isInteractive: false,
});
/** 曲线透明度 */
const curveOpacity = ref(1);
/** 曲线 */
const curve = new _Canvas_Axis.Line({
  isInteractive: false,
  opacity: curveOpacity.value,
});
function onCurveOpacityChange(v: number | null) {
  if (v == null || Number.isNaN(v)) return;
  const t = Math.min(1, Math.max(0, v));
  curveOpacity.value = t;
  curve.opacity = t;
}
function updateCurve() {
  curve.value = BezierCurve({
    nodes: getNodesValue(),
    progress: progress.value,
    precision,
  });
}
function updateLine() {
  auxiliaryLine.value = getNodesValue();
  updateAspectRatio();
  updateCurve();
}

/** 新的拖拽事件 */
let newDragEvent = false;
let isDragging = true;
undoRedoHistory.subscribe((_current) => {
  const current = _Utility_Clone(_current);

  if (!isDragging && current) {
    nodes.splice(current.length).forEach((node) => node.remove());

    for (let i = 0; i < current.length; i++) {
      if (nodes[i]) {
        nodes[i].value = current[i];
      } else {
        const node = new _Canvas_Axis.Point({
          value: current[i],
          isDraggable: true,
        });
        node.addEventListener("drag", nodeDrag);
        nodes.push(node);
        axis.addOverlay(node);
      }
    }
  }
  isDragging = false;
  updateLine();
});
function nodeDrag() {
  isDragging = true;
  if (newDragEvent) {
    newDragEvent = false;
    undoRedoHistory.push(getNodesValue());
  } else {
    undoRedoHistory.replace(getNodesValue());
  }
}
nodes.forEach((node) => node.addEventListener("drag", nodeDrag));

const isPlaying = ref(false);
function onProgressChange(v: number | null) {
  if (v == null || Number.isNaN(v)) return;
  const t = Math.min(1, Math.max(0, v));
  progress.value = t;
  updateCurve();
  if (oscillator.isPlaying()) oscillator.play(t);
}
function play() {
  oscillator.play(progress.value);
  isPlaying.value = true;
  nodes.forEach((node) => (node.isInteractive = false));
}
function pause() {
  oscillator.pause();
  isPlaying.value = false;
  nodes.forEach((node) => (node.isInteractive = true));
}

/** 最近一次在坐标轴上按下的覆盖层（控制点）；快捷键仅对该点生效 */
let lastDownOverlay: (typeof nodes)[number] | undefined;
/** Delete / Backspace：删当前点（至少 2 个点）；Tab：在当前点与邻点中点处插入新点 */
function keyDown(event: KeyboardEvent) {
  if (oscillator.isPlaying()) return;

  const { ctrlKey, altKey, shiftKey, metaKey } = event;
  const key = event.key;
  function finish() {
    updateLine();
    event.preventDefault();
  }

  if (ctrlKey && key == "z") {
    if (!undoRedoHistory.canUndo)
      return window.$message.warning("没有更多撤销记录");
    return undoRedoHistory.undo();
  } else if (ctrlKey && key == "y") {
    if (!undoRedoHistory.canRedo)
      return window.$message.warning("没有更多重做记录");
    return undoRedoHistory.redo();
  }

  const node = lastDownOverlay;
  if (!node) return;

  if (["Backspace", "Delete"].includes(key)) {
    if (nodes.length <= 2) return window.$message.warning("至少需要2个点");
    node.remove();
    nodes.splice(nodes.indexOf(node as any), 1);
    lastDownOverlay = undefined;
    finish();
  } else if (key === "Tab") {
    const index = nodes.indexOf(node as any);
    // 优先与后一点取中点并插在其前；若无后一点则与前一点取中点并插在当前点前
    const nextNodeExists = !!nodes[index + 1];
    const nextNode = nodes[index + 1] || nodes[index - 1];
    const { x, y } = _Math_GetMidpoint(
      node.value![0],
      node.value![1],
      nextNode.value![0],
      nextNode.value![1],
    );
    const newNode = new _Canvas_Axis.Point({
      value: [x, y],
      isDraggable: true,
    });
    newNode.addEventListener("drag", nodeDrag);
    axis.addOverlay(newNode);
    if (nextNodeExists) nodes.splice(index + 1, 0, newNode);
    else nodes.splice(index, 0, newNode);
    finish();
  }
}

onMounted(() => {
  axis = new _Canvas_Axis({
    id,
    axisShow: { all: false },
    theme: Settings.value.theme,
  });
  axis.addOverlay(billboard);
  axis.addOverlay(nodes);
  axis.addOverlay(auxiliaryLine);
  axis.addOverlay(curve);
  axis.addEventListener("down", () => {
    newDragEvent = true;
    if (axis.lastDownOverlay) lastDownOverlay = axis.lastDownOverlay as any;
  });
  window.addEventListener("keydown", keyDown);
});
onUnmounted(() => {
  removeReferenceImage();
  oscillator.pause();
  axis.destroy();
  window.removeEventListener("keydown", keyDown);
});
</script>

<template>
  <ResponsiveDirectionLayout :default-size="0.32" :min="0">
    <template #left>
      <NScrollbar style="max-height: 100%">
        <NH2 prefix="bar">
          <NText type="success" strong>曲线绘制</NText>
          <NFlex vertical :size="10">
            <NSlider
              :value="progress"
              :min="0"
              :max="1"
              :step="precision"
              :marks="{ 0: '始', 1: '末' }"
              @update:value="onProgressChange"
            />
            <NSlider
              :value="curveOpacity"
              :min="0"
              :max="1"
              :step="0.01"
              :marks="{ 0: '透明', 1: '不透明' }"
              @update:value="onCurveOpacityChange"
            />
            <NButton
              v-if="isPlaying"
              type="warning"
              ghost
              style="width: 100%"
              @click="pause"
            >
              <template #icon>
                <NIcon :component="PauseCircleOutline" />
              </template>
              暂停
            </NButton>
            <NButton
              v-else
              type="primary"
              ghost
              style="width: 100%"
              @click="play"
            >
              <template #icon>
                <NIcon :component="PlayCircleOutline" />
              </template>
              播放
            </NButton>
          </NFlex>
        </NH2>
        <NH2 prefix="bar">
          <NText type="success" strong>参考图</NText>
          <NFlex vertical :size="10">
            <NSlider
              :value="referenceImageOpacity"
              :min="0"
              :max="1"
              :step="0.01"
              :disabled="!hasReferenceImage"
              :marks="{ 0: '透明', 1: '不透明' }"
              @update:value="onReferenceOpacityChange"
            />
            <NUpload
              :max="1"
              accept="image/*"
              :file-list="[]"
              @update:file-list="onRefImageFileList"
            >
              <NUploadDragger style="width: 100%">
                点击或拖拽图片到此处
              </NUploadDragger>
            </NUpload>
            <NButton
              type="error"
              ghost
              style="width: 100%"
              :disabled="!hasReferenceImage"
              @click="removeReferenceImage"
            >
              <template #icon>
                <NIcon :component="TrashOutline" />
              </template>
              删除参考图
            </NButton>
          </NFlex>
        </NH2>
        <NDivider />
        <NH2 prefix="bar" type="info">
          <NFlex vertical :size="20">
            <NButton
              text
              type="info"
              icon-placement="right"
              style="font-size: inherit"
              @click="
                _Tip
                  .success('复制成功')
                  .error('复制失败')
                  .run(_Browser_CopyToClipboard(demoCode))
              "
            >
              <template #icon>
                <NIcon :component="CopyOutline" />
              </template>
              复制示例
            </NButton>
            <NScrollbar style="max-height: calc(100vh - 450px)">
              <NCode language="javascript" :code="demoCode" word-wrap />
            </NScrollbar>
          </NFlex>
        </NH2>
      </NScrollbar>
    </template>
    <template #right>
      <div class="container">
        <NAlert title="贝塞尔曲线" type="info" closable>
          <p>
            部分功能需要先在画布上
            <strong>点击一个控制点</strong>
            ，再使用以下快捷键（对「当前选中点」生效）：
          </p>
          <ul style="margin: 0.5em 0 0 1.25em; padding: 0">
            <li>
              <NText code>Delete</NText> /
              <NText code>Backspace</NText>：删除该点；至少保留
              <strong>2</strong> 个控制点。
            </li>
            <li>
              <NText code>Tab</NText>
              ：在该点与相邻一侧的控制点<strong>连线的中点</strong>插入新点（有后邻则插在后邻前，否则插在前邻后）。
            </li>
            <li><NText code>alt</NText> + 鼠标移动：显示辅助线。</li>
            <li>
              <NText code>ctrl</NText> + <NText code>z</NText>：撤销；<NText
                code
                >ctrl</NText
              >
              + <NText code>y</NText>：重做。
            </li>
          </ul>
        </NAlert>
        <CrosshairIndicator modifier-key="alt">
          <canvas :id="id" />
        </CrosshairIndicator>
      </div>
    </template>
  </ResponsiveDirectionLayout>
</template>

<style scoped lang="less">
.n-flex {
  padding: 0 20px;
  .n-slider {
    font-size: 14px;
  }
  .n-upload-dragger {
    font-size: 14px;
  }
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .crosshair-indicator {
    height: 0;
    flex: 1;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
