import { ShapeEnum, ShapeMap } from '../constant'
import { Shape } from './base.shape'

export class Point extends Shape {
  type = ShapeEnum.Point

  s = Point

  constructor(public data: PointLike) {
    super()
  }
}

export interface PointLike {
  x: number
  y: number
}
