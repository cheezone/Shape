import type { PointLike, SegmentLike } from '../../shapes'
import { fuzzyEqual } from '../../util'
import { OperatorManager } from '../manger'

import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 在……上。
 */
export class OnOperator extends Operator {
  static type = OperatorEnum.On

  static PointOnPoint(point1: PointLike, point2: PointLike) {
    return fuzzyEqual(point1.x, point2.x) && fuzzyEqual(point1.y, point2.y)
  }

  static PointOnSegment(point: PointLike, segment: SegmentLike) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  static SegmentOnSegment(segment1: SegmentLike, segment2: SegmentLike) {
    return this.PointOnSegment(segment1.start, segment2) && this.PointOnSegment(segment1.end, segment2)
  }
}

OperatorManager.register(OnOperator)
