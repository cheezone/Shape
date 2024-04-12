import { Point, type PointLike } from './Point.shape'
import { Shape } from './base.shape'
import { ShapeEnum } from './type'

/**
 * 线段。
 */
export class Segment extends Shape<SegmentLike> implements SegmentLike {
  type = ShapeEnum.Segment

  static default() {
    return new Segment({
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    })
  }

  private _startPoint: Point
  private _endPoint: Point

  constructor(data: SegmentLike) {
    super(data)

    this._startPoint = new Point(this.data.start)
    this._endPoint = new Point(this.data.end)
  }

  get start(): Point {
    return this._startPoint
  }

  set start(value: PointLike) {
    this._startPoint.data = value
  }

  get end(): Point {
    return this._endPoint
  }

  set end(value: PointLike) {
    this._endPoint.data = value
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
