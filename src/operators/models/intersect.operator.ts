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
    // 线段 P 的起点和终点
    const { start: { x: x1, y: y1 }, end: { x: x2, y: y2 } } = segment1

    // 线段 Q 的起点和终点
    const { start: { x: x3, y: y3 }, end: { x: x4, y: y4 } } = segment2

    // 计算 P 和 Q 的差向量
    const Δx1 = x2 - x1
    const Δy1 = y2 - y1
    const Δx2 = x4 - x3
    const Δy2 = y4 - y3

    // 计算 P 和 Q 的叉积
    const crossProduct = (-Δx2 * Δy1 + Δx1 * Δy2)

    // 如果叉积为零，表示线段平行或共线
    if (crossProduct === 0)
      return false

    // 计算参数 t 和 s
    const t = (Δx2 * (y1 - y3) - Δy2 * (x1 - x3)) / crossProduct
    const s = (-Δy1 * (x1 - x3) + Δx1 * (y1 - y3)) / crossProduct

    // 如果 t 和 s 在 0 到 1 之间，表示两条线段相交
    return t >= 0 && t <= 1 && s >= 0 && s <= 1
  }

  // #endregion

  // #region 圆、圆弧、曲线等等的运算
  // #endregion

  // #region 跨类型运算
  // #endregion
}

OperatorManager.register(IntersectOperator)
