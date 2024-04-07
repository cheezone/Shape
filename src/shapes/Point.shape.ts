import { ShapeEnum } from '../constant'
import { Shape } from './base.shape'

export class Point extends Shape {
  type = ShapeEnum.Point

  constructor(public data: PointLike) {
    super()
  }

  get x() { return this.data.x }
  set x(value) {
    this.data.x = value
  }

  get y() { return this.data.y }
  set y(value) {
    this.data.y = value
  }
}

export interface PointLike {
  x: number
  y: number
}
