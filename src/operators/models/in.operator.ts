import { OperatorManager } from '../../managers/'
import type { CircleLike, PointLike, SegmentLike } from '../../shapes'
import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 定义了各种几何形状之间的“内部”关系的操作类。
 */
export class InOperator extends Operator {
  static type = OperatorEnum.In

  // #region 点的运算

  static get PointInPoint() {
    return OperatorManager.get('On').PointOnPoint
  }

  static PointInCircle(point: PointLike, circle: CircleLike): boolean {
    const Dist = OperatorManager.get('Dist')
    const distance = Dist.PointDistPoint(point, circle.position)
    return distance <= circle.radius
  }

  static get PointInSegment() {
    return OperatorManager.get('On').PointOnSegment
  }

  // #endregion

  // #region 线段、直线、多边形的运算

  static SegmentInSegment(segment1: SegmentLike, segment2: SegmentLike): boolean {
    return InOperator.PointInSegment(segment1.start, segment2) && InOperator.PointInSegment(segment1.end, segment2)
  }

  // #endregion

  // #region 圆、圆弧、曲线等等的运算

  static CircleInCircle(circle1: CircleLike, circle2: CircleLike): boolean {
    const Dist = OperatorManager.get('Dist')
    const distance = Dist.PointDistPoint(circle1.position, circle2.position)
    return distance + circle1.radius <= circle2.radius
  }

  // #endregion

  // #region 跨类型运算

  static SegmentInCircle(segment: SegmentLike, circle: CircleLike): boolean {
    return InOperator.PointInCircle(segment.start, circle) && InOperator.PointInCircle(segment.end, circle)
  }

  // #endregion
}

OperatorManager.register(InOperator)
