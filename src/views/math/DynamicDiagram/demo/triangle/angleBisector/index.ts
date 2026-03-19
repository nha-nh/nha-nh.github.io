import {
  _Canvas_Axis,
  _Math_CalculateDistance2D,
  _Utility_GenerateUUID,
} from "nhanh-pure-function";
import { ABC, MyMath } from "@/views/math/DynamicDiagram/tool";

export const id = _Utility_GenerateUUID();

const l = new _Canvas_Axis.Line({
  value: [
    [0, -1.464],
    [-2, 2],
    [2, 2],
  ],
  isDraggable: true,
  canCreateOrDeleteHandlePoint: false,
});

const config = (dash = true) => ({
  isInteractive: false,
  style: { stroke: { width: 2, dash } },
});

const abcl = new _Canvas_Axis.Line(config());

const abl = new _Canvas_Axis.Line(config());
const ablra = new _Canvas_Axis.Line(config(false));

const bcl = new _Canvas_Axis.Line(config());
const bclra = new _Canvas_Axis.Line(config(false));

export const overlays = [l, abcl, abl, bcl, ablra, bclra];

const abc = new ABC(l);

export function Update() {
  const dom = document.getElementById(id)!;
  const rect = dom.getBoundingClientRect();
  const mainCanvas = abl.mainCanvas!;
  const minP = mainCanvas.getMousePositionOnAxis({
    clientX: rect.left,
    clientY: rect.top,
  })!;
  const maxP = mainCanvas.getMousePositionOnAxis({
    clientX: rect.right,
    clientY: rect.bottom,
  })!;
  const min = mainCanvas.getAxisValueByPoint(minP.x, minP.y);
  const max = mainCanvas.getAxisValueByPoint(maxP.x, maxP.y);

  abcl.value = MyMath.transform(
    MyMath.getAngleBisector(
      abc.a,
      abc.b,
      abc.c,
      { min: min.xV, max: max.xV },
      { min: min.yV, max: max.yV },
    ) || [],
  );

  const data = MyMath.calculatePerpendiculars(abc.a, abc.b, abc.c);
  abl.value = MyMath.transform(data.ab.perpendicular);
  ablra.value = MyMath.transform(data.ab.rightAngleSymbol);
  bcl.value = MyMath.transform(data.bc.perpendicular);
  bclra.value = MyMath.transform(data.bc.rightAngleSymbol);
}

l.addEventListener("dragg", Update);
