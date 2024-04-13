import { Point, type PointLike } from './Point.shape'
import { Shape } from './base.shape'
import { ShapeEnum } from './type'

/**
 * 圆。
 */
export class Circle extends Shape<CircleLike> implements CircleLike {
  type = ShapeEnum.Circle

  static create(cx: number, cy: number, radius: number, startAngle?: number, endAngle?: number, counterClockwise?: boolean) {
    return new Circle({
      position: Point.create(cx, cy),
      radius,
      startAngle,
      endAngle,
      counterClockwise,
    })
  }

  private _positionPoint: Point

  constructor(data: CircleLike) {
    super(data)

    this._positionPoint = new Point(this.data.position)
  }

  get radius() {
    return this.data.radius
  }

  set radius(value: number) {
    this.data.radius = value
  }

  get startAngle() {
    return this.data.startAngle
  }

  set startAngle(value: number | undefined) {
    this.data.startAngle = value
  }

  get endAngle() {
    return this.data.endAngle
  }

  set endAngle(value: number | undefined) {
    this.data.endAngle = value
  }

  get counterClockwise() {
    return this.data.counterClockwise
  }

  set counterClockwise(value: boolean | undefined) {
    this.data.counterClockwise = value
  }

  get position(): Point {
    return this._positionPoint
  }

  set position(value: PointLike) {
    this._positionPoint.data = value
  }
}

export interface CircleLike {
  /**
   * 位置。
   */

  position: PointLike

  /**
   * 半径。
   */
  radius: number

  /**
   * 起始角度。
   *
   * @description 角度制 0 - 359
   * @default 0
   */
  startAngle?: number

  /**
   * 结束角度。
   * @description 角度制 1 - 360
   * @default 360
   */
  endAngle?: number

  /**
   * 逆时针。
   * @default false
   */
  counterClockwise?: boolean
}
