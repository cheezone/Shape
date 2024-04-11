import type { Point, Segment } from '../../shapes'
import { fuzzyEqual } from '../../util'
import { OperatorManager } from '../manger'
import { Operator } from './base'

/**
 * 在……什么内部。
 */
export class InOperator extends Operator {
  static type = 'In' as const

  staticClass = InOperator

  static PointInSegment(point: Point, segment: Segment) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  static SegmentInSegment(segment1: Segment, segment2: Segment) {
    return this.PointInSegment(segment1.start, segment2) && this.PointInSegment(segment1.end, segment2)
  }

  static PointInPoint(point1: Point, point2: Point) {
    return fuzzyEqual(point1.x, point2.x) && fuzzyEqual(point1.y, point2.y)
  }
}

OperatorManager.register(InOperator)
