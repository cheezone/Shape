import { ShapeEnum } from '../constant'
import { Point, type PointLike } from './Point.shape'
import { Shape } from './base.shape'

export class Segment extends Shape<SegmentLike> implements SegmentLike {
  type = ShapeEnum.Segment

  private _startPoint: Point
  private _endPoint: Point

  constructor(data: SegmentLike) {
    super(data)

    this._startPoint = new Point(this.data.start)
    this._endPoint = new Point(this.data.end)
  }

  get start() {
    return this._startPoint
  }

  get end() {
    return this._endPoint
  }
}

export interface SegmentLike {
  start: PointLike
  end: PointLike
}
