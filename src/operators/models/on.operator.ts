import type { PointLike, SegmentLike } from '../../shapes'
import { OperatorManager } from '../manger'

import { Operator } from './base'

/**
 * 在……上。
 */
export class OnOperator extends Operator {
  static type = 'On' as const

  staticClass = OnOperator

  static PointOnSegment(point: PointLike, segment: SegmentLike) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  static SegmentOnSegment(segment1: SegmentLike, segment2: SegmentLike) {
    return this.PointOnSegment(segment1.start, segment2) && this.PointOnSegment(segment1.end, segment2)
  }
}

OperatorManager.register(OnOperator)
