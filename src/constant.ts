import type { Segment } from './shapes/Segment.shape'
import type { Point } from './shapes/Point.shape'

export const ShapeEnum = {
  Segment: 'Segment',
  Point: 'Point',
} as const

export interface ShapeMap {
  [ShapeEnum.Segment]: Segment
  [ShapeEnum.Point]: Point
}

export type ShapeType = keyof ShapeMap
export type ShapeInstance = ShapeMap[ShapeType]
