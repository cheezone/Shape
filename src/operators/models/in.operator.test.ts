import { describe, expect, it } from 'vitest'

import { Point, Segment } from '../../shapes'
import { InOperator } from './in.operator'

describe('点与点的内部关系', () => {
  it('相同点', () => {
    expect(InOperator.PointInPoint(Point.create(1, 1), Point.create(1, 1))).toBe(true)
    expect(InOperator.PointInPoint(Point.create(1, 1), { x: 1, y: 1 })).toBe(true)
    expect(Point.create(1, 1).in(Point.create(1, 1))).toBe(true)
  })

  it('不同点', () => {
    expect(InOperator.PointInPoint(Point.create(1, 1), {
      x: 1,
      y: 2,
    })).toBe(false)

    expect(Point.create(1, 1).in(Point.create(1, 2))).toBe(false)

    // @ts-expect-error 期望报错
    expect(() => Point.create(1, 1).in({ x: 1, y: 1 })).toThrowError(
      `Cannot read properties of undefined (reading 'call')`,
    )
  })
})

describe('点与线段的内部关系', () => {
  it('点在线段内', () => {
    expect(InOperator.PointInSegment({
      x: 1.5,
      y: 1.5,
    }, {
      start: {
        x: 1,
        y: 1,
      },
      end: {
        x: 2,
        y: 2,
      },
    })).toBe(true)

    expect(Point.create(1, 1).in(Segment.create(1, 1, 1, 2))).toBe(true)
  })

  it('线段在点内', () => {
    // @ts-expect-error 期望报错
    expect(() => Segment.create(1, 1, 1, 2).in({ x: 1, y: 1 })).toThrowError(
      `Cannot read properties of undefined (reading 'call')`,
    )
  })
})

describe('线段与线段的内部关系', () => {
  it('线段完全在另一线段内', () => {
    const segment1 = Segment.create(1, 1, 2, 2)
    const segment2 = Segment.create(1.5, 1.5, 1.8, 1.8)
    expect(InOperator.SegmentInSegment(segment2, segment1)).toBe(true)
  })

  it('线段部分在另一线段内', () => {
    const segment1 = Segment.create(1, 1, 3, 3)
    const segment2 = Segment.create(2, 2, 4, 4)
    expect(InOperator.SegmentInSegment(segment2, segment1)).toBe(false)
  })
})

describe('线段与圆的内部关系', () => {
  it('线段完全在圆内', () => {
    const segment = Segment.create(1, 1, 2, 2).clone()
    const circle = { position: { x: 1.5, y: 1.5 }, radius: 2 }
    expect(InOperator.SegmentInCircle(segment, circle)).toBe(true)
  })

  it('线段部分在圆内', () => {
    const segment = Segment.create(1, 1, 3, 3)
    const circle = { position: { x: 1.5, y: 1.5 }, radius: 1 }
    expect(InOperator.SegmentInCircle(segment, circle)).toBe(false)
  })
})

describe('点与圆的内部关系', () => {
  it('点在圆内', () => {
    const point = Point.create(1, 1)
    const circle = { position: { x: 1, y: 1 }, radius: 2 }
    expect(InOperator.PointInCircle(point, circle)).toBe(true)
  })

  it('点在圆外', () => {
    const point = Point.create(4, 4)
    const circle = { position: { x: 1, y: 1 }, radius: 2 }
    expect(InOperator.PointInCircle(point, circle)).toBe(false)
  })
})

describe('圆与圆的内部关系', () => {
  it('一个圆完全在另一个圆内', () => {
    const circle1 = { position: { x: 1, y: 1 }, radius: 1 }
    const circle2 = { position: { x: 1, y: 1 }, radius: 2 }
    expect(InOperator.CircleInCircle(circle1, circle2)).toBe(true)
  })

  it('两个圆相交', () => {
    const circle1 = { position: { x: 1, y: 1 }, radius: 2 }
    const circle2 = { position: { x: 3, y: 3 }, radius: 2 }
    expect(InOperator.CircleInCircle(circle1, circle2)).toBe(false)
  })
})
