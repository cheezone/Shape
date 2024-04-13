import { describe, expect, it } from 'vitest'

import { Point, Segment } from '../../shapes'
import { OnOperator } from './on.operator'

const point1 = new Point({ x: 1, y: 1 })
const point2 = new Point({ x: 1, y: 2 })
const point3 = new Point({ x: 1, y: 1 })
const segment1 = new Segment({ start: point1, end: point2 })

describe('点与点的包含关系', () => {
  it('相同点', () => {
    expect(OnOperator.PointOnPoint(point1, point3)).toBe(true)
    expect(OnOperator.PointOnPoint(point1, { x: 1, y: 1 })).toBe(true)
    expect(point1.in(point3)).toBe(true)
  })

  it('不同点', () => {
    expect(OnOperator.PointOnPoint(point1, point2)).toBe(false)
    expect(point1.in(point2)).toBe(false)

    // @ts-expect-error 期望报错
    expect(() => point1.in({ x: 1, y: 1 })).toThrowError(
      `Cannot read properties of undefined (reading 'call')`,
    )
  })
})

describe('点与线段的包含关系', () => {
  it('点在线段上', () => {
    expect(OnOperator.PointOnSegment(point1, segment1)).toBe(true)
    expect(point1.in(segment1)).toBe(true)
  })

  it('线段在点上', () => {
    // @ts-expect-error 期望报错
    expect(() => segment1.in({ x: 1, y: 1 })).toThrowError(
      `Cannot read properties of undefined (reading 'call')`,
    )
  })
})
