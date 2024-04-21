import { describe, expect, it } from 'vitest'

import { Point } from '../../shapes'
import { IntersectOperator } from './intersect.operator'

describe('点与点相交', () => {
  it('相同点', () => {
    expect(IntersectOperator.PointIntersectPoint(Point.create(1, 1), Point.create(1, 1))).toBe(true)
    expect(IntersectOperator.PointIntersectPoint(Point.create(1, 1), { x: 1, y: 1 })).toBe(true)
    expect(Point.create(1, 1).in(Point.create(1, 1))).toBe(true)
  })

  it('不同点', () => {
    expect(IntersectOperator.PointIntersectPoint(Point.create(1, 1), {
      x: 1,
      y: 2,
    })).toBe(false)

    expect(Point.create(1, 1).in(Point.create(1, 2))).toBe(false)

    // @ts-expect-error 期望报错
    expect(() => Point.create(1, 1).intersect({ x: 1, y: 1 })).toThrowError(
      `Cannot read properties of undefined (reading 'call')`,
    )
  })
})

describe('线段与线段相交', () => {
  it('相交线段', () => {
    const segment1 = { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }
    const segment2 = { start: { x: 0, y: 5 }, end: { x: 5, y: 0 } }
    expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(true)
  })

  it('不相交线段', () => {
    const segment1 = { start: { x: 0, y: 0 }, end: { x: 2, y: 2 } }
    const segment2 = { start: { x: 3, y: 3 }, end: { x: 5, y: 5 } }
    expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(false)
  })

  it('共线但不相交线段', () => {
    const segment1 = { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }
    const segment2 = { start: { x: 6, y: 6 }, end: { x: 10, y: 10 } }
    expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(false)
  })

  it('部分重叠线段', () => {
    const segment1 = { start: { x: 1, y: 1 }, end: { x: 4, y: 4 } }
    const segment2 = { start: { x: 3, y: 3 }, end: { x: 6, y: 6 } }
    expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(false)
  })

  it('平行线段', () => {
    const segment1 = { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }
    const segment2 = { start: { x: 0, y: 1 }, end: { x: 5, y: 6 } }
    expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(false)
  })

  // it('共点线段', () => {
  //   const segment1 = { start: { x: 0, y: 0 }, end: { x: 5, y: 5 } }
  //   const segment2 = { start: { x: 5, y: 5 }, end: { x: 10, y: 10 } }
  //   expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(true)
  // })

  it('垂直线段', () => {
    const segment1 = { start: { x: 0, y: 0 }, end: { x: 0, y: 5 } }
    const segment2 = { start: { x: -2, y: 2 }, end: { x: 2, y: 2 } }
    expect(IntersectOperator.SegmentIntersectSegment(segment1, segment2)).toBe(true)
  })
})
