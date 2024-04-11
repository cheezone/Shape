import type { Point, Segment } from '..'

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
