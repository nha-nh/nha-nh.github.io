import { _Math_GetBezierCurveNodes } from "nhanh-pure-function";

/** 贝塞尔曲线配置项 */
type Config = {
  /** 节点 */
  nodes: [number, number][];
  /** 进度 */
  progress: number;
  /** 精度 */
  precision: number;
};

export default function BezierCurve(config: Config) {
  const { nodes, progress, precision } = config;
  const curveNodes: [number, number][] = [];
  for (let i = 0; i <= progress; ) {
    const node = _Math_GetBezierCurveNodes(nodes, i);
    curveNodes.push([node[0], node[1]]);
    if (i < progress) {
      i += precision;
      if (i > progress) i = progress;
    } else break;
  }

  return curveNodes;
}
