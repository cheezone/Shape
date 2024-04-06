import { ShapeEnum } from '../constant'
import { Shape } from './base.shape'

export class Point extends Shape {
  type = ShapeEnum.Point

  get x() { return this.data.x }
  set x(value) {
    this.data.x = value
  }

  get y() { return this.data.y }
  set y(value) {
    this.data.y = value
  }

  constructor(public data: PointLike) {
    super()
  }
}

export interface PointLike {
  x: number
  y: number
}
