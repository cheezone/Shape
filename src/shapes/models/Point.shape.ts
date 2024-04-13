import { Shape } from './base.shape'
import { ShapeEnum } from './type'

/**
 * 点。
 */
export class Point extends Shape<PointLike> implements PointLike {
  type = ShapeEnum.Point

  static create(x: number, y: number) {
    return new Point({ x, y })
  }

  get x() { return this.data.x }
  set x(value) {
    this.data.x = value
  }

  get y() { return this.data.y }
  set y(value) {
    this.data.y = value
  }
}

export function castPoint(data: PointLike | Point) {
  return data instanceof Point ? data : new Point(data)
}

/**
 * 点数据。
 */
export interface PointLike {
  /**
   * X 坐标。
   */
  x: number

  /**
   * Y 坐标。
   */
  y: number
}
