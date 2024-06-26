import { OperatorManager, ShapeManager } from '../../managers'
import type { CircleLike, PointLike, SegmentLike } from '../../shapes'
import { fuzzyEqual } from '../../util'

import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 距离。
 */
export class DistOperator extends Operator {
  static type = OperatorEnum.Dist

  // #region 点的运算

  /**
   * 计算两点之间的距离。
   * @param point1 第一个点
   * @param point2 第二个点
   * @returns 两点之间的距离
   */
  static PointDistPoint(point1: PointLike, point2: PointLike) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
  }

  /**
   * 计算点到线段的距离。
   * @param point 点
   * @param segment 线段
   * @returns 点到线段的距离
   */
  static PointDistSegment(point: PointLike, segment: SegmentLike) {
    const { start, end } = segment

    const { x, y } = point
    const { x: x1, y: y1 } = start
    const { x: x2, y: y2 } = end

    const C = x2 - x1
    const D = y2 - y1

    const Segment = ShapeManager.get('Segment')
    const param = Segment.getParam(segment, point)

    let xx = 0
    let yy = 0

    // 点在线段外，且靠近起点
    if (param < 0) {
      xx = x1
      yy = y1
    }
    // 点在线段外，且靠近终点
    else if (param > 1) {
      xx = x2
      yy = y2
    }
    // 点在线段上
    else {
      xx = x1 + param * C
      yy = y1 + param * D
    }

    const dx = x - xx
    const dy = y - yy

    const distance = Math.sqrt(dx * dx + dy * dy)

    if (Math.abs(distance) < 1e-5)
      return 0

    return distance
  }

  /**
   * 计算线段到点的距离。
   * @param segment 线段
   * @param point 点
   * @returns 线段到点的距离
   */
  static SegmentDistPoint(segment: SegmentLike, point: PointLike) {
    return DistOperator.PointDistSegment(point, segment)
  }

  /**
   * 计算点到圆的距离。
   * @param point 点
   * @param circle 圆
   * @returns 点到圆的距离
   */
  static PointDistCircle(point: PointLike, circle: CircleLike) {
    const distanceToCenter = DistOperator.PointDistPoint(point, circle.position)
    return Math.abs(distanceToCenter - circle.radius)
  }

  /**
   * 计算圆到点的距离。
   * @param circle 圆
   * @param point 点
   * @returns 圆到点的距离
   */
  static CircleDistPoint(circle: CircleLike, point: PointLike) {
    return DistOperator.PointDistCircle(point, circle)
  }

  // #endregion

  // #region 线段、直线、多边形的运算

  /**
   * 计算两线段之间的距离。
   * @param segment1 第一个线段
   * @param segment2 第二个线段
   * @returns 两线段之间的距离
   */
  static SegmentDistSegment(segment1: SegmentLike, segment2: SegmentLike) {
    const { start: A, end: B } = segment1
    const { start: C, end: D } = segment2

    // 计算线段间的距离
    const dist1 = DistOperator.PointDistSegment(A, segment2)
    const dist2 = DistOperator.PointDistSegment(B, segment2)
    const dist3 = DistOperator.PointDistSegment(C, segment1)
    const dist4 = DistOperator.PointDistSegment(D, segment1)

    // 向量
    const Vector = ShapeManager.get('Vector')

    const AC = Vector.from(A, C)
    const AD = Vector.from(A, D)
    const BC = Vector.from(B, C)
    const BD = Vector.from(B, D)

    const CA = (AC.negate())
    const CB = (BC.negate())
    const DA = (AD.negate())
    const DB = (BD.negate())

    // 叉乘
    const d1 = Vector.crossProduct(AC, AD)
    const d2 = Vector.crossProduct(BC, BD)
    const d3 = Vector.crossProduct(CA, CB)
    const d4 = Vector.crossProduct(DA, DB)

    // 如果线段相交，返回 0
    if (d1 * d2 < 0 && d3 * d4 < 0)
      return 0

    return Math.min(dist1, dist2, dist3, dist4)
  }

  // #endregion

  // #region 圆、圆弧、曲线等等的运算

  /**
   * 计算两个圆形对象之间的距离。
   *
   * @param circle1 第一个圆形对象。
   * @param circle2 第二个圆形对象。
   * @returns 这两个圆形对象之间的距离。
   */
  static CircleDistCircle(circle1: CircleLike, circle2: CircleLike): number {
    // 获取第一个圆的半径
    const r1 = circle1.radius

    // 获取第二个圆的半径
    const r2 = circle2.radius

    // 计算两个圆心之间的距离
    const distance = DistOperator.PointDistPoint(circle1.position, circle2.position)

    if (fuzzyEqual(distance, 0))
      return Math.abs(r1 - r2)

    // TODO 完善
    // 判断两个圆是否相交或内切
    if (distance < r1 + r2)
      return 0

    // 计算圆心距离与半径之和的差的绝对值，并始终返回非负值
    return Math.max(r1 + r2 - distance, 0)
  }

  // #endregion

  // #region 跨类型运算

  /**
   * 计算圆到线段的距离。
   * @param circle 圆
   * @param segment 线段
   * @returns 圆到线段的距离
   */
  static CircleDistSegment(circle: CircleLike, segment: SegmentLike) {
    const { start, end } = segment

    const { position: circlePosition, radius } = circle

    const distanceToStart = DistOperator.PointDistPoint(circlePosition, start)
    const distanceToEnd = DistOperator.PointDistPoint(circlePosition, end)
    const distance = DistOperator.PointDistSegment(circlePosition, segment)

    // 如果线段的两个端点都在圆外
    if (distanceToStart > circle.radius && distanceToEnd > circle.radius) {
      if (distance <= radius)
        return 0
      else
        return Math.abs(distance - radius)
    }

    // 如果线段的两个端点都在圆内
    if (distanceToStart < radius && distanceToEnd < radius)
      return Math.abs(Math.max(distanceToStart, distanceToEnd) - radius)

    // 否则，返回 0
    return 0
  }

  /**
   * 计算线段到圆的距离。
   * @param segment 线段
   * @param circle 圆
   * @returns 线段到圆的距离
   */
  static SegmentDistCircle(segment: SegmentLike, circle: CircleLike) {
    return DistOperator.CircleDistSegment(circle, segment)
  }

  // #endregion
}

OperatorManager.register(DistOperator)
