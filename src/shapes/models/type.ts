import type { Point } from './Point.shape'
import type { Segment } from './Segment.shape'

export const ShapeEnum = {
  Segment: 'Segment',
  Point: 'Point',
} as const

export interface ShapeMap {
  Segment: Segment
  Point: Point
}

export type ShapeTypeName = keyof ShapeMap
export type ShapeInstance = ShapeMap[ShapeTypeName]
