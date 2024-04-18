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
