import { describe, expect, it } from 'vitest'
import { Point, Segment } from '../shapes'
import { In } from './In'

const point1 = new Point({ x: 1, y: 1 })
const point2 = new Point({ x: 1, y: 2 })
const point3 = new Point({ x: 1, y: 1 })

const segment1 = new Segment({ start: point1, end: point2 })

describe('point', () => {
  it('point in point', () => {
    expect(In.PointInPoint(point1, point2)).toBe(false)
    expect(point1.in(point2)).toBe(false)
    expect(In.PointInPoint(point1, point3)).toBe(true)
    expect(point1.in(point3)).toBe(true)
  })

  it('point in segment', () => {
    expect(In.PointInSegment(point1, segment1)).toBe(true)
    expect(point1.in(segment1)).toBe(true)
  })
})
