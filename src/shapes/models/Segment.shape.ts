import { assign } from 'lodash-es'
import { castPoint } from './Point.shape'
import type { Point, PointLike } from './Point.shape'
import { Shape } from './base.shape'
import { ShapeEnum } from './type'

/**
 * 线段。
 */
export class Segment extends Shape<SegmentLike> implements SegmentLike {
  type = ShapeEnum.Segment

  static create(x1: number, y1: number, x2: number, y2: number) {
    return new Segment({
      start: {
        x: x1,
        y: y1,
      },
      end: {
        x: x2,
        y: y2,
      },
    })
  }

  private _startPoint: Point
  private _endPoint: Point

  constructor(data: SegmentLike) {
    super(data)

    this._startPoint = castPoint(this.data.start)
    this._endPoint = castPoint(this.data.end)
  }

  get start(): Point {
    return this._startPoint
  }

  set start(value: Readonly<PointLike>) {
    assign(this.data.start, value)
  }

  get end(): Point {
    return this._endPoint
  }

  set end(value: Readonly<PointLike>) {
    assign(this.data.end, value)
  }
}

/**
 * 线段数据。
 */
export interface SegmentLike {
  /**
   * 起点
   */
  start: PointLike

  /**
   * 终点
   */
  end: PointLike
}
