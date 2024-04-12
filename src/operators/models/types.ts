import type { Simplify } from 'type-fest'
import type { InOperator } from './in.operator'
import type { OnOperator } from './on.operator'

export interface OperatorMap {
  In: typeof InOperator
  On: typeof OnOperator
}

export const OperatorEnum = {
  In: 'In',
  On: 'On',
} as const

export type OperatorTypeName = Simplify<keyof OperatorMap>
export type OperatorClass = OperatorMap[OperatorTypeName]
