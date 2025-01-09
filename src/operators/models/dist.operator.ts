import { OperatorManager, ShapeManager } from '../../managers'
import type { CircleLike, PointLike, RectLike, SegmentLike } from '../../shapes'
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

  // #region 矩形的运算

  /**
   * 计算点到矩形的距离。
   * @param point 点
   * @param rect 矩形
   * @returns 点到矩形的距离
   */
  static PointDistRect(point: PointLike, rect: RectLike) {
    const { x, y } = point
    const { position, width, height } = rect
    const { x: rx, y: ry } = position

    // 如果点在矩形内部，距离为0
    if (x >= rx && x <= rx + width && y >= ry && y <= ry + height)
      return 0

    // 计算点到矩形各边的最短距离
    const distToLeft = x < rx ? rx - x : 0
    const distToRight = x > rx + width ? x - (rx + width) : 0
    const distToTop = y < ry ? ry - y : 0
    const distToBottom = y > ry + height ? y - (ry + height) : 0

    // 返回最短距离
    return Math.sqrt(distToLeft ** 2 + distToRight ** 2 + distToTop ** 2 + distToBottom ** 2)
  }

  /**
   * 计算矩形到点的距离。
   * @param rect 矩形
   * @param point 点
   * @returns 矩形到点的距离
   */
  static RectDistPoint(rect: RectLike, point: PointLike) {
    return DistOperator.PointDistRect(point, rect)
  }

  /**
   * 计算矩形到线段的距离。
   * @param rect 矩形
   * @param segment 线段
   * @returns 矩形到线段的距离
   */
  static RectDistSegment(rect: RectLike, segment: SegmentLike) {
    const { start, end } = segment
    const { position, width, height } = rect
    const { x: rx, y: ry } = position

    // 创建矩形的四个顶点
    const topLeft = { x: rx, y: ry }
    const topRight = { x: rx + width, y: ry }
    const bottomLeft = { x: rx, y: ry + height }
    const bottomRight = { x: rx + width, y: ry + height }

    // 创建矩形的四条边
    const topEdge = { start: topLeft, end: topRight }
    const rightEdge = { start: topRight, end: bottomRight }
    const bottomEdge = { start: bottomLeft, end: bottomRight }
    const leftEdge = { start: topLeft, end: bottomLeft }

    // 如果线段的任一端点在矩形内部，距离为 0
    if (DistOperator.PointDistRect(start, rect) === 0 || DistOperator.PointDistRect(end, rect) === 0)
      return 0

    // 计算线段到矩形四条边的最短距离
    const distToTop = DistOperator.SegmentDistSegment(segment, topEdge)
    const distToRight = DistOperator.SegmentDistSegment(segment, rightEdge)
    const distToBottom = DistOperator.SegmentDistSegment(segment, bottomEdge)
    const distToLeft = DistOperator.SegmentDistSegment(segment, leftEdge)

    // 返回最短距离
    return Math.min(distToTop, distToRight, distToBottom, distToLeft)
  }

  /**
   * 计算线段到矩形的距离。
   * @param segment 线段
   * @param rect 矩形
   * @returns 线段到矩形的距离
   */
  static SegmentDistRect(segment: SegmentLike, rect: RectLike) {
    return DistOperator.RectDistSegment(rect, segment)
  }

  /**
   * 计算矩形到圆的距离。
   * @param rect 矩形
   * @param circle 圆
   * @returns 矩形到圆的距离
   */
  static RectDistCircle(rect: RectLike, circle: CircleLike) {
    const { position: circlePosition, radius } = circle
    const distToCenter = DistOperator.PointDistRect(circlePosition, rect)

    // 如果圆心到矩形的距离小于半径，说明有重叠
    if (distToCenter <= radius)
      return 0

    return distToCenter - radius
  }

  /**
   * 计算圆到矩形的距离。
   * @param circle 圆
   * @param rect 矩形
   * @returns 圆到矩形的距离
   */
  static CircleDistRect(circle: CircleLike, rect: RectLike) {
    return DistOperator.RectDistCircle(rect, circle)
  }

  /**
   * 计算两个矩形之间的距离。
   * @param rect1 第一个矩形
   * @param rect2 第二个矩形
   * @returns 两个矩形之间的距离
   */
  static RectDistRect(rect1: RectLike, rect2: RectLike) {
    const { position: pos1, width: w1, height: h1 } = rect1
    const { position: pos2, width: w2, height: h2 } = rect2
    const { x: x1, y: y1 } = pos1
    const { x: x2, y: y2 } = pos2

    // 计算两个矩形在x轴和y轴上的重叠情况
    const overlapX = Math.max(0, Math.min(x1 + w1, x2 + w2) - Math.max(x1, x2))
    const overlapY = Math.max(0, Math.min(y1 + h1, y2 + h2) - Math.max(y1, y2))

    // 如果两个矩形在任一轴上有重叠，则距离为0
    if (overlapX > 0 && overlapY > 0)
      return 0

    // 计算 x 轴和 y 轴上的最短距离
    const dx = overlapX > 0 ? 0 : Math.min(
      Math.abs(x1 - (x2 + w2)), // rect1 左边到 rect2 右边
      Math.abs(x2 - (x1 + w1)), // rect2 左边到 rect1 右边
    )
    const dy = overlapY > 0 ? 0 : Math.min(
      Math.abs(y1 - (y2 + h2)), // rect1 上边到 rect2 下边
      Math.abs(y2 - (y1 + h1)), // rect2 上边到 rect1 下边
    )

    // 返回欧几里得距离
    return Math.sqrt(dx * dx + dy * dy)
  }

  // #endregion
}

OperatorManager.register(DistOperator)
