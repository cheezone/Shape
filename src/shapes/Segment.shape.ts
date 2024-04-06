import { ShapeEnum } from '../constant'
import { Point, type PointLike } from './Point.shape'
import { Shape } from './base.shape'

export class Segment extends Shape {
  type = ShapeEnum.Segment
  constructor(public data: SegmentLike) {
    super()
  }

  get start() {
    return new Point(this.data.start)
  }

  get end() {
    return new Point(this.data.end)
  }
}

export interface SegmentLike {
  start: PointLike
  end: PointLike
}
