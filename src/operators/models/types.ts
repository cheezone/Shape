import type { Simplify } from 'type-fest'
import type { InOperator } from './in.operator'
import type { OnOperator } from './on.operator'
import type { DistOperator } from './dist.operator'

export interface OperatorMap {
  In: typeof InOperator
  On: typeof OnOperator
  Dist: typeof DistOperator
}

export const OperatorEnum = {
  In: 'In',
  On: 'On',
  Dist: 'Dist',
} as const

export const AliasOperatorEnum = {
  DistanceTo: 'Dist',
} as const

export type OperatorTypeName = Simplify<keyof OperatorMap>
export type OperatorClass = OperatorMap[OperatorTypeName]
