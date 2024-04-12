import type { CircleLike, PointLike, SegmentLike } from '../../shapes'
import { OperatorManager } from '../manger'

import { Operator } from './base'

/**
 * 距离。
 */
export class DistOperator extends Operator {
  static type = 'Dist' as const

  staticClass = DistOperator

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
    const lineLength = DistOperator.PointDistPoint(start, end)
    if (lineLength === 0)
      return DistOperator.PointDistPoint(point, start)

    const t = Math.max(0, Math.min(1, ((point.x - start.x) * (end.x - start.x) + (point.y - start.y) * (end.y - start.y)) / (lineLength ** 2)))
    const projection = {
      x: start.x + t * (end.x - start.x),
      y: start.y + t * (end.y - start.y),
    }

    return DistOperator.PointDistPoint(point, projection)
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
   * 计算两线段之间的距离。
   * @param segment1 第一个线段
   * @param segment2 第二个线段
   * @returns 两线段之间的距离
   */
  static SegmentDistSegment(segment1: SegmentLike, segment2: SegmentLike) {
    const { start: a1, end: a2 } = segment1
    const { start: b1, end: b2 } = segment2

    // 计算两线段的向量
    const vecA = { x: a2.x - a1.x, y: a2.y - a1.y }
    const vecB = { x: b2.x - b1.x, y: b2.y - b1.y }

    // 计算向量的叉积
    const crossProduct = vecA.x * vecB.y - vecA.y * vecB.x

    // 如果叉积为 0，说明两线段平行
    if (crossProduct === 0)
      return DistOperator.PointDistSegment(a1, segment2) // 返回两线段之间最短的垂直距离

    // 计算线段间的距离
    const dist1 = DistOperator.PointDistSegment(a1, segment2)
    const dist2 = DistOperator.PointDistSegment(a2, segment2)
    const dist3 = DistOperator.PointDistSegment(b1, segment1)
    const dist4 = DistOperator.PointDistSegment(b2, segment1)

    return Math.min(dist1, dist2, dist3, dist4)
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

  /**
   * 计算圆到线段的距离。
   * @param circle 圆
   * @param segment 线段
   * @returns 圆到线段的距离
   */
  static CircleDistSegment(circle: CircleLike, segment: SegmentLike) {
    const { start, end } = segment
    const distanceToStart = DistOperator.PointDistPoint(circle.position, start)
    const distanceToEnd = DistOperator.PointDistPoint(circle.position, end)

    // 如果线段的两个端点都在圆内，返回线段的两个端点到圆心的距离的较小值减去圆的半径
    if (distanceToStart <= circle.radius && distanceToEnd <= circle.radius)
      return Math.min(distanceToStart, distanceToEnd) - circle.radius

    // 如果线段的两个端点都在圆外，返回它们的距离的较小值减去圆的半径
    if (distanceToStart > circle.radius && distanceToEnd > circle.radius)
      return Math.min(distanceToStart, distanceToEnd) - circle.radius

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
}

OperatorManager.register(DistOperator)
