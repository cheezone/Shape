import { assign } from 'lodash-es'
import { ShapeManager } from '../../managers/'
import type { Point, PointLike } from './Point.shape'
import { castPoint } from './Point.shape'
import { Shape } from './base.shape'
import { ShapeEnum } from './type'

/**
 * 矩形。
 */
export class Rect extends Shape<RectLike> implements RectLike {
  type = ShapeEnum.Rect

  static create(x: number, y: number, width: number, height: number) {
    return new Rect({
      position: {
        x,
        y,
      },
      width,
      height,
    })
  }

  private _positionPoint: Point

  constructor(data: RectLike) {
    super(data)
    this._positionPoint = castPoint(this.data.position)
  }

  get width() {
    return this.data.width
  }

  set width(value: number) {
    this.data.width = value
  }

  get height() {
    return this.data.height
  }

  set height(value: number) {
    this.data.height = value
  }

  get position(): Point {
    return this._positionPoint
  }

  set position(value: Readonly<PointLike>) {
    assign(this.data.position, value)
  }
}

export interface RectLike {
  /**
   * 位置。
   * @description 矩形左上角的坐标点
   */
  position: PointLike

  /**
   * 宽度。
   * @description 矩形的宽度
   */
  width: number

  /**
   * 高度。
   * @description 矩形的高度
   */
  height: number
}

ShapeManager.register(ShapeEnum.Rect, Rect)
