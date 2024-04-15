import type { CircleLike, PointLike, SegmentLike } from '../../shapes'
import { fuzzyEqual } from '../../util'
import { OperatorManager } from '../../managers/'
import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 在……什么内部。
 */
export class InOperator extends Operator {
  static type = OperatorEnum.In

  static PointInSegment(point: PointLike, segment: SegmentLike) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  static SegmentInSegment(segment1: SegmentLike, segment2: SegmentLike) {
    return InOperator.PointInSegment(segment1.start, segment2) && InOperator.PointInSegment(segment1.end, segment2)
  }

  static PointInPoint(point1: PointLike, point2: PointLike) {
    return fuzzyEqual(point1.x, point2.x) && fuzzyEqual(point1.y, point2.y)
  }

  static PointInCircle(point: PointLike, circle: CircleLike) {
    const Dist = OperatorManager.get('Dist')

    const distance = Dist.PointDistPoint(point, circle.position)

    return distance <= circle.radius
  }
}

OperatorManager.register(InOperator)
