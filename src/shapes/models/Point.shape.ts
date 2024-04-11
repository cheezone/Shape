import { Shape } from './base.shape'
import { ShapeEnum } from './type'

export class Point extends Shape<PointLike> implements PointLike {
  type = ShapeEnum.Point

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
