import { describe, expect, it } from 'vitest'

import { Point, Segment } from '../../shapes'
import { InOperator } from './in.operator'

const point1 = new Point({ x: 1, y: 1 })
const point2 = new Point({ x: 1, y: 2 })
const point3 = new Point({ x: 1, y: 1 })
const segment1 = new Segment({ start: point1, end: point2 })

describe('point', () => {
  it('point in point', () => {
    expect(InOperator.PointInPoint(point1, point2)).toBe(false)
    expect(point1.in(point2)).toBe(false)
    expect(InOperator.PointInPoint(point1, { x: 1, y: 1 })).toBe(true)
    expect(point1.in(point3)).toBe(true)

    // @ts-expect-error 期望报错
    point1.in({ x: 1, y: 1 })
  })

  it('point in segment', () => {
    expect(InOperator.PointInSegment(point1, segment1)).toBe(true)
    expect(point1.in(segment1)).toBe(true)
  })
})
