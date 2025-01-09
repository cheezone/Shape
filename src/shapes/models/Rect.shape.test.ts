import { describe, expect, it } from 'vitest'
import type { RectLike } from './Rect.shape'
import { Rect } from './Rect.shape'

describe('矩形', () => {
  const data: RectLike = {
    position: { x: 0, y: 0 },
    width: 100,
    height: 50,
  }
  const rect = new Rect(data)

  it('创建矩形', () => {
    const rect = Rect.create(0, 0, 100, 50)
    expect(rect.width).toEqual(100)
    expect(rect.height).toEqual(50)
    expect(rect.position.x).toEqual(0)
    expect(rect.position.y).toEqual(0)
  })

  it('更改数据同步到对象', () => {
    data.width = 200
    expect(rect.width).toEqual(200)

    data.height = 100
    expect(rect.height).toEqual(100)

    data.position.x = 10
    expect(rect.position.x).toEqual(10)
  })

  it('更改对象同步到数据', () => {
    rect.width = 150
    expect(data.width).toEqual(150)

    rect.height = 75
    expect(data.height).toEqual(75)

    rect.position.x = 20
    expect(data.position.x).toEqual(20)

    rect.position.y = 30
    expect(data.position.y).toEqual(30)
  })

  it('调用矩形的 `position` `setter`', () => {
    rect.position = {
      x: 50,
      y: 60,
    }
    expect(rect.position.data).toEqual(data.position)
    expect(rect.position.x).toEqual(50)
    expect(rect.position.y).toEqual(60)
  })
})
