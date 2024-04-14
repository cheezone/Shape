import type { Simplify } from 'type-fest'
import type { InOperator } from './in.operator'
import type { OnOperator } from './on.operator'
import type { DistOperator } from './dist.operator'

export const OperatorEnum = {
  In: 'In',
  On: 'On',
  Dist: 'Dist',
} as const

export const AliasOperatorEnum = {
  DistanceTo: 'Dist',
} as const

export interface OperatorMap {
  [OperatorEnum.In]: typeof InOperator
  [OperatorEnum.On]: typeof OnOperator
  [OperatorEnum.Dist]: typeof DistOperator
}

export type OperatorTypeName = Simplify<keyof OperatorMap>
export type OperatorClass = OperatorMap[OperatorTypeName]
