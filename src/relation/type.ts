import type { In } from './In'

export const RelationEnum = {
  In: 'In',
} as const

export type RelationType = typeof RelationEnum[keyof typeof RelationEnum]

export interface RelationMap {
  [RelationEnum.In]: typeof In
}

export type RelationInstance = RelationMap[RelationType]
