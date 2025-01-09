import { describe, expect, it } from 'vitest'
import { Circle, Point, Rect, Segment } from '../../shapes'
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

describe('点和矩形的距离', () => {
  it('点在矩形内部', () => {
    const point = Point.create(1, 1)
    const rect = Rect.create(0, 0, 2, 2)
    expect(DistOperator.PointDistRect(point, rect)).toEqual(0)
    expect(DistOperator.RectDistPoint(rect, point)).toEqual(0)
  })

  it('点在矩形边上', () => {
    const rect = Rect.create(0, 0, 2, 2)

    const point1 = Point.create(0, 1) // 左边
    expect(DistOperator.PointDistRect(point1, rect)).toEqual(0)

    const point2 = Point.create(2, 1) // 右边
    expect(DistOperator.PointDistRect(point2, rect)).toEqual(0)

    const point3 = Point.create(1, 0) // 上边
    expect(DistOperator.PointDistRect(point3, rect)).toEqual(0)

    const point4 = Point.create(1, 2) // 下边
    expect(DistOperator.PointDistRect(point4, rect)).toEqual(0)
  })

  it('点在矩形顶点上', () => {
    const rect = Rect.create(0, 0, 2, 2)

    const point1 = Point.create(0, 0) // 左上
    expect(DistOperator.PointDistRect(point1, rect)).toEqual(0)

    const point2 = Point.create(2, 0) // 右上
    expect(DistOperator.PointDistRect(point2, rect)).toEqual(0)

    const point3 = Point.create(0, 2) // 左下
    expect(DistOperator.PointDistRect(point3, rect)).toEqual(0)

    const point4 = Point.create(2, 2) // 右下
    expect(DistOperator.PointDistRect(point4, rect)).toEqual(0)
  })

  it('点在矩形外部', () => {
    const rect = Rect.create(0, 0, 2, 2)

    const point1 = Point.create(-1, 1) // 左侧
    expect(DistOperator.PointDistRect(point1, rect)).toEqual(1)

    const point2 = Point.create(3, 1) // 右侧
    expect(DistOperator.PointDistRect(point2, rect)).toEqual(1)

    const point3 = Point.create(1, -1) // 上方
    expect(DistOperator.PointDistRect(point3, rect)).toEqual(1)

    const point4 = Point.create(1, 3) // 下方
    expect(DistOperator.PointDistRect(point4, rect)).toEqual(1)

    const point5 = Point.create(-1, -1) // 左上角
    expect(DistOperator.PointDistRect(point5, rect)).toEqual(Math.SQRT2)
  })
})

describe('矩形和线段的距离', () => {
  it('线段与矩形相交', () => {
    const rect = Rect.create(0, 0, 2, 2)
    const segment = Segment.create(-1, -1, 1, 1)
    expect(DistOperator.RectDistSegment(rect, segment)).toEqual(0)
    expect(DistOperator.SegmentDistRect(segment, rect)).toEqual(0)
  })

  it('线段在矩形内部', () => {
    const rect = Rect.create(0, 0, 4, 4)
    const segment = Segment.create(1, 1, 2, 2)
    expect(DistOperator.RectDistSegment(rect, segment)).toEqual(0)
  })

  it('线段与矩形边重合', () => {
    const rect = Rect.create(0, 0, 2, 2)
    const segment = Segment.create(0, 0, 2, 0) // 上边
    expect(DistOperator.RectDistSegment(rect, segment)).toEqual(0)
  })

  it('线段在矩形外部', () => {
    const rect = Rect.create(0, 0, 2, 2)
    const segment = Segment.create(-2, -2, -1, -1)
    expect(DistOperator.RectDistSegment(rect, segment)).toEqual(Math.SQRT2)
  })
})

describe('矩形和圆的距离', () => {
  it('圆心在矩形内部', () => {
    const rect = Rect.create(0, 0, 4, 4)
    const circle = Circle.create(2, 2, 1)
    expect(DistOperator.RectDistCircle(rect, circle)).toEqual(0)
    expect(DistOperator.CircleDistRect(circle, rect)).toEqual(0)
  })

  it('圆与矩形相切', () => {
    const rect = Rect.create(0, 0, 2, 2)
    const circle = Circle.create(3, 1, 1)
    expect(DistOperator.RectDistCircle(rect, circle)).toEqual(0)
  })

  it('圆与矩形相交', () => {
    const rect = Rect.create(0, 0, 2, 2)
    const circle = Circle.create(2, 1, 2)
    expect(DistOperator.RectDistCircle(rect, circle)).toEqual(0)
  })

  it('圆在矩形外部', () => {
    const rect = Rect.create(0, 0, 2, 2)
    const circle = Circle.create(4, 1, 1)
    expect(DistOperator.RectDistCircle(rect, circle)).toEqual(1)
  })
})

describe('矩形和矩形的距离', () => {
  it('矩形重叠', () => {
    const rect1 = Rect.create(0, 0, 2, 2)
    const rect2 = Rect.create(1, 1, 2, 2)
    expect(DistOperator.RectDistRect(rect1, rect2)).toEqual(0)
  })

  it('矩形相切', () => {
    const rect1 = Rect.create(0, 0, 2, 2)
    const rect2 = Rect.create(2, 0, 2, 2) // 右边相切
    expect(DistOperator.RectDistRect(rect1, rect2)).toEqual(0)

    const rect3 = Rect.create(0, 2, 2, 2) // 下边相切
    expect(DistOperator.RectDistRect(rect1, rect3)).toEqual(0)
  })

  it('矩形分离', () => {
    const rect1 = Rect.create(0, 0, 2, 2)
    const rect2 = Rect.create(4, 0, 2, 2) // 水平分离
    expect(DistOperator.RectDistRect(rect1, rect2)).toEqual(2)

    const rect3 = Rect.create(0, 4, 2, 2) // 垂直分离
    expect(DistOperator.RectDistRect(rect1, rect3)).toEqual(2)

    const rect4 = Rect.create(3, 3, 2, 2) // 对角分离
    expect(DistOperator.RectDistRect(rect1, rect4)).toEqual(Math.SQRT2)
  })
})
