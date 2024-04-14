import type { ShapeLikeToShape } from '../../shapes'
import type { FilterNever } from '../../util'
import type { AliasOperatorEnum, OperatorMap } from '../models'

import type { GetOverloadMethods } from './getOverloadMethods'

/**
 * 根据类型和操作符获取方法。
 */
type GetShapeMethodByOperator<TOperatorName extends keyof OperatorMap> = GetOverloadMethods<StaticMethodsWithParams<OperatorMap[TOperatorName]>>

export type GetShapeOperatorMethod = {
  [K in keyof OperatorMap as Uncapitalize<K>]: GetShapeMethodByOperator<K>
} & {
  [K in keyof typeof AliasOperatorEnum as Uncapitalize<K>]: GetShapeMethodByOperator<typeof AliasOperatorEnum[K]>

}

type StaticMethodsWithParams<C> = {
  [K in FilterNever<{
    [X in keyof C]: X extends string
      ? C[X] extends (...args: any) => any
        ? C[X]
        : never
      : never;
  }>]: K extends string
    ? C[K] extends (arg0: infer A, ...args: infer B) => infer C
      ? (this: ShapeLikeToShape<A>, ...args: ShapeLikeArrayToShapeArray<B>) => C
      : never
    : never;
}

type ShapeLikeArrayToShapeArray<A extends any[]> = {
  [K in keyof A]: A[K] extends infer Item ? ShapeLikeToShape<Item> : never
}
