import { describe, expect, it } from 'vitest'

import { Circle, Point, Segment } from '../../shapes'
import { OnOperator } from './on.operator'

describe('点与点的重合关系', () => {
  it('相同点', () => {
    expect(OnOperator.PointOnPoint(Point.create(1, 1), Point.create(1, 1))).toBe(true)
    expect(OnOperator.PointOnPoint(Point.create(1, 1), { x: 1, y: 1 })).toBe(true)
    expect(Point.create(1, 1).in(Point.create(1, 1))).toBe(true)
  })

  it('不同点', () => {
    expect(OnOperator.PointOnPoint(Point.create(1, 1), {
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

describe('点与线段的重合关系', () => {
  it('点完全在线段上', () => {
    expect(OnOperator.PointOnSegment({
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

  it('线段不该在点上', () => {
    // @ts-expect-error 期望报错
    expect(() => Segment.create(1, 1, 1, 2).in({ x: 1, y: 1 })).toThrowError(
      `Cannot read properties of undefined (reading 'call')`,
    )
  })
})

describe('线段与线段的重合关系', () => {
  it('完全重合', () => {
    expect(OnOperator.SegmentOnSegment(Segment.create(1, 1, 2, 2), Segment.create(1, 1, 2, 2))).toBe(true)
  })

  it('部分重合', () => {
    expect(OnOperator.SegmentOnSegment(Segment.create(1, 1, 3, 3), Segment.create(2, 2, 4, 4))).toBe(false)
  })

  it('不重合', () => {
    expect(OnOperator.SegmentOnSegment(Segment.create(1, 1, 2, 2), Segment.create(3, 3, 4, 4))).toBe(false)
  })
})

describe('点与圆的重合关系', () => {
  it('点在圆的边缘上', () => {
    expect(OnOperator.PointOnCircle(Point.create(1, 0), Circle.create(0, 0, 1))).toBe(true)
  })

  it('点在圆的内部', () => {
    expect(OnOperator.PointOnCircle(Point.create(0.5, 0.5), Circle.create(0, 0, 1))).toBe(false)
  })

  it('点在圆的外部', () => {
    expect(OnOperator.PointOnCircle(Point.create(2, 2), Circle.create(0, 0, 1))).toBe(false)
  })
})

describe('圆与圆的重合关系', () => {
  it('两个圆完全重合', () => {
    expect(OnOperator.CircleOnCircle(Circle.create(0, 0, 1), Circle.create(0, 0, 1))).toBe(true)

    const circle001 = Circle.create(0, 0, 1)
    expect(OnOperator.CircleOnCircle(circle001, circle001)).toBe(true)
    expect(OnOperator.CircleOnCircle(circle001, circle001.clone())).toBe(true)
    expect(OnOperator.CircleOnCircle(circle001, circle001.data)).toBe(true)
    expect(OnOperator.CircleOnCircle(circle001, Circle.create(0.00000001, 0, 0.99999999))).toBe(true)
    expect(OnOperator.CircleOnCircle(circle001, Circle.create(0, 0, 1))).toBe(true)
  })

  it('两个圆相交', () => {
    expect(OnOperator.CircleOnCircle(Circle.create(0, 0, 1), Circle.create(1, 1, 1))).toBe(false)
  })

  it('两个圆外离', () => {
    expect(OnOperator.CircleOnCircle(Circle.create(0, 0, 1), Circle.create(3, 3, 1))).toBe(false)
  })
})
