import { describe, expect, it } from 'vitest'
import { Circle, Point, Segment } from '../../shapes'
import { DistOperator } from './dist.operator'

describe('点到点的距离', () => {
  it('相同点', () => {
    expect(Point.create(-0, 0).distanceTo(Point.create(0, 0))).toEqual(0)
    expect(DistOperator.PointDistPoint(Point.create(1, 1), Point.create(1, 1))).toEqual(0)
    expect(DistOperator.PointDistPoint(Point.create(-1, -1), Point.create(-1, -1))).toEqual(0)
  })

  it('不同点', () => {
    expect(DistOperator.PointDistPoint(Point.create(0, 0), Point.create(1, 0))).toEqual(1)
    expect(DistOperator.PointDistPoint(Point.create(0, 0), Point.create(1, 1))).toEqual(Math.SQRT2)
    expect(DistOperator.PointDistPoint(Point.create(-1, -1), Point.create(1, 1))).toEqual(2 * Math.SQRT2)
    expect(DistOperator.PointDistPoint(Point.create(9, 1), Point.create(11, 1))).toEqual(2)
    expect(DistOperator.PointDistPoint(Point.create(9, 1), Point.create(11, 5))).toEqual(4.47213595499958)
    expect(DistOperator.PointDistPoint(Point.create(8, 4), Point.create(24, 8))).toEqual(16.492422502470642)
    expect(DistOperator.PointDistPoint(Point.create(-9, -10), Point.create(5, 10))).toEqual(24.413111231467404)
    expect(DistOperator.PointDistPoint(Point.create(9.217877257938781, -16.48348765376656), Point.create(-11.482244615485273, -2.6561335169734193))).toEqual(24.89358889350628)
    expect(DistOperator.PointDistPoint(Point.create(-20648.841651869898, 20416.745633611863), Point.create(-11.482244615485273, -2.6561335169734193))).toEqual(29031.923322983897)
    expect(DistOperator.PointDistPoint(Point.create(24.161020229791127, -18.07215002580339), Point.create(-14.949540614900151, -9.50557066384479))).toEqual(40.03776032136455)
  })
})

describe('圆和线段的距离', () => {
  it('线段与圆相切', () => {
    const circle = Circle.create(0, 0, 1)
    const segment = Segment.create(-1, 0, 1, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(0)
    expect(DistOperator.SegmentDistCircle(segment, circle)).toEqual(0)
  })

  it('线段与圆相交', () => {
    const circle = Circle.create(0, 0, 1)
    const segment2 = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(0)
    expect(DistOperator.SegmentDistCircle(segment2, circle)).toEqual(0)
  })

  it('线段在圆内部', () => {
    const circle = Circle.create(0, 0, 2)
    const segment = Segment.create(-1, 0, 1, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(1)

    const segment2 = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(2 - Math.SQRT2)
  })

  it('线段部分在圆内，部分在圆外', () => {
    const circle = Circle.create(0, 0, 1)
    const segment = Segment.create(-2, 0, 2, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(0)

    const segment2 = Segment.create(-1, -1, 2, 1)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(0)
  })

  it('线段穿过圆心', () => {
    const circle = Circle.create(0, 0, 2)
    const segment = Segment.create(-2, 0, 2, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(0)

    const segment2 = Segment.create(-2, -2, 2, 2)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(0)
  })

  it('线段在圆外部', () => {
    const circle = Circle.create(0, 0, 1)
    const segment = Segment.create(-3, 1, -1, 1)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(Math.SQRT2 - 1)

    const segment2 = Segment.create(1, 1, 4, 3)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(Math.SQRT2 - 1)
  })
})

describe('点和线段的距离', () => {
  it('点在线段上', () => {
    const point = Point.create(0, 0)
    const segment = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.PointDistSegment(point, segment)).toEqual(0)
    expect(DistOperator.SegmentDistPoint(segment, point)).toEqual(0)
  })

  it('点在线段延长线上，且垂直于线段', () => {
    const point = Point.create(2, 0)
    const segment = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.PointDistSegment(point, segment)).toEqual(Math.SQRT2)
  })

  it('点不在线段上', () => {
    const point = Point.create(2, 2)
    const segment = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.PointDistSegment(point, segment)).toEqual(Math.SQRT2)
  })
})

describe('点和圆的距离', () => {
  it('点在圆心上的距离', () => {
    const point = Point.create(0, 0)
    const circle = Circle.create(0, 0, 5)
    expect(DistOperator.PointDistCircle(point, circle)).toEqual(5)
  })

  it('点在圆上的距离', () => {
    const point = Point.create(0, 5)
    const circle = Circle.create(0, 0, 5)
    expect(DistOperator.PointDistCircle(point, circle)).toEqual(0)

    const point2 = Point.create(3, 4)
    expect(DistOperator.PointDistCircle(point2, circle)).toEqual(0)
  })

  it('点在圆内的距离', () => {
    const point = Point.create(2, 2)
    const circle = Circle.create(0, 0, 5)
    expect(DistOperator.PointDistCircle(point, circle)).toEqual(5 - Math.sqrt(8))
  })
})

describe('线段和线段的距离', () => {
  it('线段相交', () => {
    const segment1 = Segment.create(0, 0, 2, 2)
    const segment2 = Segment.create(1, 0, 1, 2)
    expect(DistOperator.SegmentDistSegment(segment1, segment2)).toEqual(0)
  })

  it('线段平行不相交', () => {
    const segment1 = Segment.create(0, 0, 2, 0)
    const segment2 = Segment.create(0, 1, 2, 1)
    expect(DistOperator.SegmentDistSegment(segment1, segment2)).toEqual(1)

    const segment3 = Segment.create(0, 0, 1, 1)
    const segment4 = Segment.create(1, 0, 2, 1)
    expect(DistOperator.SegmentDistSegment(segment3, segment4)).toEqual(Math.SQRT1_2)
  })

  it('线段不相交', () => {
    const segment1 = Segment.create(0, 0, 1, 1)
    const segment2 = Segment.create(2, 0, 3, 1)
    expect(DistOperator.SegmentDistSegment(segment1, segment2)).toEqual(Math.SQRT2)
    expect(segment1.distanceTo(segment2)).toEqual(Math.SQRT2)
  })

  it('线段重合', () => {
    const segment1 = Segment.create(0, 0, 1, 1)
    const segment2 = segment1.clone()
    expect(DistOperator.SegmentDistSegment(segment1, segment2)).toEqual(0)
    expect(segment1.distanceTo(segment2)).toEqual(0)
    expect(segment1.dist(segment2)).toEqual(0)
  })
})

describe('圆圆距离', () => {
  it('圆相交', () => {
    const circle1 = Circle.create(0, 0, 2)
    const circle2 = Circle.create(1, 0, 1)
    expect(DistOperator.CircleDistCircle(circle1, circle2)).toEqual(0)
  })

  it('圆相切', () => {
    const circle1 = Circle.create(0, 0, 2)
    const circle2 = Circle.create(2, 0, 2)
    expect(DistOperator.CircleDistCircle(circle1, circle2)).toEqual(0)
  })

  it('圆同心', () => {
    const circle1 = Circle.create(0, 0, 2)
    const circle2 = Circle.create(0, 0, 2)
    expect(DistOperator.CircleDistCircle(circle1, circle2)).toEqual(0)
  })

  it('一个圆完全包含另一个圆', () => {
    const circle1 = Circle.create(0, 0, 4)
    const circle2 = Circle.create(0, 0, 2)
    expect(DistOperator.CircleDistCircle(circle1, circle2)).toEqual(2)
  })

  it('圆完全分离', () => {
    const circle1 = Circle.create(0, 0, 2)
    const circle2 = Circle.create(4, 0, 2)
    expect(DistOperator.CircleDistCircle(circle1, circle2)).toEqual(0)
  })
})

describe('其他情况', () => {
  it('非法输入', () => {
    // @ts-expect-error 对 null 需要抛出错误
    expect(() => DistOperator.PointDistPoint(null, null)).toThrowError()
  })

  it('对称性', () => {
    const circle = Circle.create(0, 0, 1)
    const segment = Segment.create(-1, 0, 1, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(DistOperator.CircleDistSegment(circle, segment))
  })

  it('传入相同对象', () => {
    const circle = Circle.create(0, 0, 1)
    const segment = Segment.create(-1, 0, 1, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(DistOperator.CircleDistSegment(circle, segment))
  })
})
