import type { SegmentLike } from '../..'
import { OperatorManager } from '../../managers/'
import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 与……什么相交。
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

  static SegmentIntersectSegment(segment1: SegmentLike, segment2: SegmentLike): boolean {
    const { start: start1, end: end1 } = segment1
    const { start: start2, end: end2 } = segment2

    const x1 = start1.x
    const y1 = start1.y
    const x2 = end1.x
    const y2 = end1.y

    const x3 = start2.x
    const y3 = start2.y
    const x4 = end2.x
    const y4 = end2.y

    const s1_x = x2 - x1
    const s1_y = y2 - y1
    const s2_x = x4 - x3
    const s2_y = y4 - y3

    const s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y)
    const t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y)

    return s >= 0 && s <= 1 && t >= 0 && t <= 1
  }

  // #endregion

  // #region 圆、圆弧、曲线等等的运算
  // #endregion

  // #region 跨类型运算
  // #endregion
}

OperatorManager.register(IntersectOperator)
