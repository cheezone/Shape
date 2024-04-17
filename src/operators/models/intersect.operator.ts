import { OperatorManager } from '../../managers/'
import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 在……什么内部。
 */
export class IntersectOperator extends Operator {
  static type = OperatorEnum.Intersect

  // #region 点的运算

  static get PointIntersectPoint() {
    return OperatorManager.get('On').PointOnPoint
  }

  static get PointIntersectSegment() {
    return OperatorManager.get('On').PointOnSegment
  }

  static get PointIntersectCircle() {
    return OperatorManager.get('On').PointOnCircle
  }

  // #endregion

  // #region 线段、直线、多边形的运算

  // static SegmentIntersectSegment(segment1: SegmentLike, segment2: SegmentLike) {
  //   return false
  // }

  // #endregion

  // #region 圆、圆弧、曲线等等的运算
  // #endregion

  // #region 跨类型运算
  // #endregion
}

OperatorManager.register(IntersectOperator)
