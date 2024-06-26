import type { ValueOf } from 'type-fest'
import type { ReverseLookup } from '../../util'
import type { Point, PointLike } from './Point.shape'
import type { Segment, SegmentLike } from './Segment.shape'
import type { Circle, CircleLike } from './Circle.shape'
import type { Vector, VectorLike } from './Vector.shape'

export const ShapeEnum = {
  Segment: 'Segment',
  Point: 'Point',
  Circle: 'Circle',
  Vector: 'Vector',
} as const

export interface ShapeMap {
  Segment: Segment
  Vector: Vector
  Point: Point
  Circle: Circle
}

export interface ShapeClassMap {
  Segment: typeof Segment
  Vector: typeof Vector
  Point: typeof Point
  Circle: typeof Circle
}

export interface ShapeLikeMap {
  Segment: SegmentLike
  Vector: VectorLike
  Point: PointLike
  Circle: CircleLike
}

export type ShapeTypeName = keyof ShapeMap
export type ShapeInstance = ShapeMap[ShapeTypeName]

export type ShapeLikeToShape<ShapeLike> = ShapeLike extends ValueOf<ShapeLikeMap> ? ShapeMap[ReverseLookup<ShapeLikeMap, ShapeLike>] : ShapeLike

export type ShapeToShapeLike<Shape extends ValueOf<ShapeMap>> = ShapeLikeMap[ReverseLookup<ShapeMap, Shape>]
