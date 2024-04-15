import { assign } from 'lodash-es'
import { ShapeManager } from '../../managers/'
import type { Point, PointLike } from './Point.shape'
import { castPoint } from './Point.shape'
import { Vector } from './Vector.shape'
import { Shape } from './base.shape'
import { ShapeEnum } from './type'

/**
 * 线段。
 */
export class Segment extends Shape<SegmentLike> implements SegmentLike {
  type = ShapeEnum.Segment
  static type = ShapeEnum.Segment

  static create(x1: number, y1: number, x2: number, y2: number) {
    return new Segment({
      start: {
        x: x1,
        y: y1,
      },
      end: {
        x: x2,
        y: y2,
      },
    })
  }

  /**
   * 计算点在线段上的位置比例（0 表示点在线段起点，1 表示点在线段终点）
   * @param segment 线段
   * @param point 点
   * @returns 点在线段上的位置比例
   */
  static getParam(segment: SegmentLike, point: PointLike): number {
    const { start, end } = segment
    const { x: startX, y: startY } = start
    const { x: endX, y: endY } = end
    const segmentLength = Segment.getLength(segment)
    if (segmentLength === 0)
      return -1

    /** 点到起点的横向距离 */
    const dx = point.x - startX

    /** 点到起点的纵向距离 */
    const dy = point.y - startY

    /** 线段在横向上的长度 */
    const ux = endX - startX

    /** 线段在纵向上的长度 */
    const uy = endY - startY

    const param = (dx * ux + dy * uy) / segmentLength ** 2

    return param
  }

  /**
   * 计算线段长度
   * @param segment 线段
   * @param segment.start 线段起点
   * @param segment.end 线段终点
   * @returns 线段长度
   */
  static getLength({ start, end }: SegmentLike): number {
    const { x: x1, y: y1 } = start
    const { x: x2, y: y2 } = end

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }

  static toVector(segment: SegmentLike): Vector {
    return Vector.create(
      segment.end.x - segment.start.x,
      segment.end.y - segment.start.y,
    )
  }

  private _startPoint: Point
  private _endPoint: Point
  constructor(data: SegmentLike) {
    super(data)

    this._startPoint = castPoint(this.data.start)
    this._endPoint = castPoint(this.data.end)
  }

  toVector(): Vector {
    return Segment.toVector(this)
  }

  get start(): Point {
    return this._startPoint
  }

  set start(value: Readonly<PointLike>) {
    assign(this.data.start, value)
  }

  get end(): Point {
    return this._endPoint
  }

  set end(value: Readonly<PointLike>) {
    assign(this.data.end, value)
  }
}

/**
 * 线段数据。
 */
export interface SegmentLike {
  /**
   * 起点
   */
  start: PointLike

  /**
   * 终点
   */
  end: PointLike
}

ShapeManager.register(ShapeEnum.Segment, Segment)
