import type { CircleLike, PointLike, SegmentLike } from '../../shapes'
import { fuzzyEqual } from '../../util'
import { OperatorManager } from '../../managers/'

import { Operator } from './base'
import { OperatorEnum } from './types'

/**
 * 定义了几种几何元素之间的“在……上”关系的操作类。
 */
export class OnOperator extends Operator {
  static type = OperatorEnum.On

  /**
   * 判断两个点是否重合。
   * @param point1 第一个点
   * @param point2 第二个点
   * @returns 如果两个点重合，返回true，否则返回false。
   */
  static PointOnPoint(point1: PointLike, point2: PointLike) {
    return fuzzyEqual(point1.x, point2.x) && fuzzyEqual(point1.y, point2.y)
  }

  /**
   * 判断一个点是否在一条线段上。
   * @param point 点
   * @param segment 线段
   * @returns 如果点在线段上，返回true，否则返回false。
   */
  static PointOnSegment(point: PointLike, segment: SegmentLike) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  /**
   * 判断一条线段是否完全在另一条线段上。
   * @param segment1 第一条线段
   * @param segment2 第二条线段
   * @returns 如果第一条线段完全在第二条线段上，返回true，否则返回false。
   */
  static SegmentOnSegment(segment1: SegmentLike, segment2: SegmentLike) {
    return OnOperator.PointOnSegment(segment1.start, segment2) && OnOperator.PointOnSegment(segment1.end, segment2)
  }

  /**
   * 判断一个点是否在圆的边缘上。
   * @param point 点
   * @param circle 圆
   * @returns 如果点在圆的边缘上，返回true，否则返回false。
   */
  static PointOnCircle(point: PointLike, circle: CircleLike) {
    const Dist = OperatorManager.get('Dist')

    const distance = Dist.PointDistPoint(point, circle.position)

    return fuzzyEqual(distance, circle.radius)
  }
}

OperatorManager.register(OnOperator)
