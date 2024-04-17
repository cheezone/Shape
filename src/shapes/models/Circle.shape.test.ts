import { describe, expect, it } from 'vitest'
import type { CircleLike } from './Circle.shape'
import { Circle } from './Circle.shape'

describe('圆', () => {
  const data: CircleLike = {
    position: { x: 0, y: 0 },
    radius: 1,
  }
  const circle = new Circle(data)

  it('创建圆', () => {
    const circle = Circle.create(0, 0, 1)
    expect(circle.radius).toEqual(1)
    expect(circle.position.x).toEqual(0)
    expect(circle.position.y).toEqual(0)
  })

  it('更改数据同步到对象', () => {
    data.radius = 2
    expect(circle.radius).toEqual(2)

    data.radius = 2
    expect(circle.radius).toEqual(2)

    data.position.x = 1
    expect(circle.position.x).toEqual(1)
  })

  it('更改对象同步到数据', () => {
    circle.radius = 2
    expect(data.radius).toEqual(2)

    circle.position.x = 1
    expect(data.position.x).toEqual(1)

    circle.position.y = 1
    expect(data.position.y).toEqual(1)
  })

  it('调用圆的 `position` `setter`', () => {
    circle.position = {
      x: 0,
      y: 1,
    }
    expect(circle.position.data).toEqual(data.position)
    expect(circle.position.x).toEqual(0)
    expect(circle.position.y).toEqual(1)
  })
})
