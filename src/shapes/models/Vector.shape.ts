import { ShapeManager } from '../../managers'
import type { PointLike } from './Point.shape'
import { Shape } from './base.shape'
import { ShapeEnum } from './type'

interface PartVectorLike {
  x: number
  y: number
  z?: number
}

/**
 * 向量。
 */
export class Vector extends Shape<VectorLike> implements VectorLike {
  type = ShapeEnum.Vector

  static create(x: number, y: number, z = 0) {
    return new Vector({ x, y, z })
  }

  static from(start: PointLike, end: PointLike) {
    return new Vector({ x: end.x - start.x, y: end.y - start.y, z: 0 })
  }

  /**
   * 点乘
   *
   * @returns 向量 A 在向量 B 上的投影与向量 B 长度的乘积
   */
  static dotProduct({ x: x1, y: y1, z: z1 = 0 }: PartVectorLike, { x: x2, y: y2, z: z2 = 0 }: PartVectorLike) {
    return x1 * x2 + y1 * y2 + z1 * z2
  }

  /**
   * 叉乘
   *
   * @description 等于 0 代表平行；大于 0 代表 逆时针旋转；小于 0 代表顺时针旋转
   * @returns 向量 A 和向量 B 组成的平行四边形的面积
   */
  static crossProduct({ x: x1, y: y1, z: z1 = 0 }: PartVectorLike, { x: x2, y: y2, z: z2 = 0 }: PartVectorLike) {
    return x1 * y2 - x2 * y1 + z1 * z2
  }

  constructor(data: VectorLike) {
    super(data)

    data.z ??= 0
  }

  get x() { return this.data.x }
  set x(value) {
    this.data.x = value
  }

  get y() { return this.data.y }
  set y(value) {
    this.data.y = value
  }

  get z() { return this.data.z }
  set z(value) {
    this.data.z = value
  }

  /**
   * 返回向量的模长。
   */
  magnitude(): number {
    return Math.sqrt(this.data.x ** 2 + this.data.y ** 2 + this.data.z ** 2)
  }

  /**
   * 返回向量的单位向量。
   */
  normalize(): Vector {
    const mag = this.magnitude()
    return new Vector({
      x: this.data.x / mag,
      y: this.data.y / mag,
      z: this.data.z / mag,
    })
  }

  /**
   * 返回两个向量的点积。
   * @param v 另一个向量
   */
  dot(v: Vector): number {
    return Vector.dotProduct(this, v)
  }

  /**
   * 返回两个向量的叉积。
   * @param v 另一个向量
   */
  cross(v: Vector): Vector {
    return new Vector({
      x: this.data.y * v.z - this.data.z * v.y,
      y: this.data.z * v.x - this.data.x * v.z,
      z: this.data.x * v.y - this.data.y * v.x,
    })
  }

  /**
   * 返回向量加上另一个向量的结果。
   * @param v 另一个向量
   */
  add(v: Vector): Vector {
    return new Vector({
      x: this.data.x + v.x,
      y: this.data.y + v.y,
      z: this.data.z + v.z,
    })
  }

  /**
   * 返回向量减去另一个向量的结果。
   * @param v 另一个向量
   */
  subtract(v: Vector): Vector {
    return new Vector({
      x: this.data.x - v.x,
      y: this.data.y - v.y,
      z: this.data.z - v.z,
    })
  }

  /**
   * 返回向量乘以标量的结果。
   * @param scalar 标量值
   */
  multiply(scalar: number): Vector {
    return new Vector({
      x: this.data.x * scalar,
      y: this.data.y * scalar,
      z: this.data.z * scalar,
    })
  }

  /**
   * 返回向量除以标量的结果。
   * @param scalar 标量值
   */
  divide(scalar: number): Vector {
    return new Vector({
      x: this.data.x / scalar,
      y: this.data.y / scalar,
      z: this.data.z / scalar,
    })
  }

  /**
   * 返回向量的反向。
   */
  negate(): Vector {
    return new Vector({
      x: -this.data.x,
      y: -this.data.y,
      z: -this.data.z,
    })
  }

  /**
   * 返回两个向量之间的夹角（弧度）。
   * @param v 另一个向量
   */
  angleTo(v: Vector): number {
    return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()))
  }

  /**
   * 返回当前向量的副本。
   */
  clone(): Vector {
    return new Vector({ ...this.data })
  }
}

/**
 * 将给定数据转换为 `Vector` 实例。
 * @param data 要转换的数据
 * @returns 转换后的 `Vector` 实例
 */
export function castVector(data: VectorLike | Vector): Vector {
  return data instanceof Vector ? data : new Vector(data)
}

/**
 * 向量数据。
 */
export interface VectorLike {
  /**
   * X 分量。
   */
  x: number

  /**
   * Y 分量。
   */
  y: number

  /**
   * Z 分量。
   */
  z: number
}
ShapeManager.register(ShapeEnum.Vector, Vector)
