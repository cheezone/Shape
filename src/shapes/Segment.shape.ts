import { ShapeEnum } from '../constant'
import type { PointLike } from './Point.shape'
import { Shape } from './base.shape'

export class Segment extends Shape {
  type = ShapeEnum.Segment
  constructor(public data: SegmentLike) {
    super()
  }
}

export interface SegmentLike {
  start: PointLike
  end: PointLike
}
