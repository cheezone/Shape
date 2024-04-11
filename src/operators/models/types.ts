import type { Simplify } from 'type-fest'
import type { InOperator } from './in.operator'
import type { OnOperator } from './on.operator'

export interface OperatorMap {
  In: typeof InOperator
  On: typeof OnOperator
}

export type OperatorTypeName = Simplify<keyof OperatorMap>
export type OperatorType = OperatorMap[OperatorTypeName]
