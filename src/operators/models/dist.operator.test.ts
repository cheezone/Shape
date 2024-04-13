import { describe, expect, it } from 'vitest'
import { Circle, Point, Segment } from '../../shapes'
import { DistOperator } from './dist.operator'

// 已完成
describe('点到点的距离', () => {
  it('相同点', () => {
    expect(DistOperator.PointDistPoint(Point.create(-0, 0), Point.create(0, 0))).toEqual(0)
    expect(DistOperator.PointDistPoint(Point.create(1, 1), Point.create(1, 1))).toEqual(0)
    expect(DistOperator.PointDistPoint(Point.create(-1, -1), Point.create(-1, -1))).toEqual(0)
  })

  it('不同点', () => {
    expect(DistOperator.PointDistPoint(Point.create(0, 0), Point.create(1, 0))).toEqual(1)
    expect(DistOperator.PointDistPoint(Point.create(0, 0), Point.create(1, 1))).toEqual(Math.sqrt(2))
    expect(DistOperator.PointDistPoint(Point.create(-1, -1), Point.create(1, 1))).toEqual(2 * Math.sqrt(2))
    expect(DistOperator.PointDistPoint(Point.create(9, 1), Point.create(11, 1))).toEqual(2)
    expect(DistOperator.PointDistPoint(Point.create(9, 1), Point.create(11, 5))).toEqual(4.47213595499958)
    expect(DistOperator.PointDistPoint(Point.create(8, 4), Point.create(24, 8))).toEqual(16.492422502470642)
    expect(DistOperator.PointDistPoint(Point.create(-9, -10), Point.create(5, 10))).toEqual(24.413111231467404)
    expect(DistOperator.PointDistPoint(Point.create(9.217877257938781, -16.48348765376656), Point.create(-11.482244615485273, -2.6561335169734193))).toEqual(24.89358889350628)
    expect(DistOperator.PointDistPoint(Point.create(-20648.841651869898, 20416.745633611863), Point.create(-11.482244615485273, -2.6561335169734193))).toEqual(29031.923322983897)
    expect(DistOperator.PointDistPoint(Point.create(24.161020229791127, -18.07215002580339), Point.create(-14.949540614900151, -9.50557066384479))).toEqual(40.03776032136455)
  })
})

// 已完成
describe('圆和线段的距离', () => {
  it('线段与圆相切', () => {
    const circle = Circle.create(0, 0, 1)
    const segment = Segment.create(-1, 0, 1, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(0)
  })

  it('线段与圆相交', () => {
    const circle = Circle.create(0, 0, 1)
    const segment2 = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(0)
  })

  it('线段在圆内部', () => {
    const circle = Circle.create(0, 0, 2)
    const segment = Segment.create(-1, 0, 1, 0)
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(1)

    const segment2 = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(2 - Math.sqrt(2))
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
    expect(DistOperator.CircleDistSegment(circle, segment)).toEqual(Math.sqrt(2) - 1)

    const segment2 = Segment.create(1, 1, 4, 3)
    expect(DistOperator.CircleDistSegment(circle, segment2)).toEqual(Math.sqrt(2) - 1)
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
