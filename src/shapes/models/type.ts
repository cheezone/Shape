import type { ValueOf } from 'type-fest'
import type { ReverseLookup } from '../../util'
import type { Point, PointLike } from './Point.shape'
import type { Segment, SegmentLike } from './Segment.shape'
import type { Circle, CircleLike } from './Circle.shape'
import type { Vector, VectorLike } from './Vector.shape'
import type { Rect, RectLike } from './Rect.shape'

export const ShapeEnum = {
  Segment: 'Segment',
  Point: 'Point',
  Circle: 'Circle',
  Vector: 'Vector',
  Rect: 'Rect',
} as const

export interface ShapeMap {
  Segment: Segment
  Vector: Vector
  Point: Point
  Circle: Circle
  Rect: Rect
}

export interface ShapeClassMap {
  Segment: typeof Segment
  Vector: typeof Vector
  Point: typeof Point
  Circle: typeof Circle
  Rect: typeof Rect
}

export interface ShapeLikeMap {
  Segment: SegmentLike
  Vector: VectorLike
  Point: PointLike
  Circle: CircleLike
  Rect: RectLike
}

export type ShapeTypeName = keyof ShapeMap
export type ShapeInstance = ShapeMap[ShapeTypeName]

export type ShapeLikeToShape<ShapeLike> = ShapeLike extends ValueOf<ShapeLikeMap> ? ShapeMap[ReverseLookup<ShapeLikeMap, ShapeLike>] : ShapeLike

export type ShapeToShapeLike<Shape extends ValueOf<ShapeMap>> = ShapeLikeMap[ReverseLookup<ShapeMap, Shape>]
