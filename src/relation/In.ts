import type { PointLike } from '../shapes/Point.shape'
import type { SegmentLike } from '../shapes/Segment.shape'
import { Relation } from './base'
import { RelationEnum } from './type'
import { RelationManager } from '.'

export class In extends Relation {
  static type = RelationEnum.In

  static PointInSegment(point: PointLike, segment: SegmentLike) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  static SegmentInSegment(segment1: SegmentLike, segment2: SegmentLike) {
    return this.PointInSegment(segment1.start, segment2) && this.PointInSegment(segment1.end, segment2)
  }

  static SegmentInPoint(_: SegmentLike, __: PointLike) {
    return false
  }

  static PointInPoint(point1: PointLike, point2: PointLike) {
    return point1.x === point2.x && point1.y === point2.y
  }
}

RelationManager.register(In)
