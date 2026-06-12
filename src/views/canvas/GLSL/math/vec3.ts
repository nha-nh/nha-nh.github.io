/** 向量工具集 */
class Vec3 {
  /** 向量加法 */
  static add(a: Float32Array, b: Float32Array, out: Float32Array) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /** 向量减法 */
  static subtract(a: Float32Array, b: Float32Array, out: Float32Array) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /** 向量缩放 */
  static scale(a: Float32Array, s: number, out: Float32Array) {
    out[0] = a[0] * s;
    out[1] = a[1] * s;
    out[2] = a[2] * s;
    return out;
  }
  /** 向量点积 */
  static dot(a: Float32Array, b: Float32Array) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /** 向量叉积 */
  static cross(a: Float32Array, b: Float32Array, out: Float32Array) {
    out[0] = a[1] * b[2] - a[2] * b[1];
    out[1] = a[2] * b[0] - a[0] * b[2];
    out[2] = a[0] * b[1] - a[1] * b[0];
    return out;
  }
  /** 向量归一化 */
  static normalize(a: Float32Array, out: Float32Array) {
    const len = this.lengthSq(a);
    if (len > 0) {
      out[0] = a[0] / Math.sqrt(len);
      out[1] = a[1] / Math.sqrt(len);
      out[2] = a[2] / Math.sqrt(len);
    }
    return out;
  }
  /** 向量平方长度 */
  static lengthSq(a: Float32Array) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
  }
}
