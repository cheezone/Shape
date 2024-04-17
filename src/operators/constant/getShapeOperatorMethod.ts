import type { ShapeLikeToShape } from '../../shapes'
import type { FilterNever } from '../../util'
import type { AliasOperatorEnum, OperatorMap } from '../models'

import type { GetOverloadMethods } from './getOverloadMethods'

/**
 * 根据运算符名称获取对应的方法类型。
 * @template TOperatorName 运算符名称，必须是 OperatorMap 中的键。
 * @returns 返回一个通过运算符映射到的方法的重载类型。
 */
type GetShapeMethodByOperator<TOperatorName extends keyof OperatorMap> = GetOverloadMethods<StaticMethodsWithParams<OperatorMap[TOperatorName]>>

/**
 * 将 OperatorMap 中的每个键转换为小写，并映射到对应的方法类型。
 * 同时，对于 AliasOperatorEnum 中定义的别名也进行相同的操作。
 */
export type GetShapeOperatorMethod = {
  [K in keyof OperatorMap as Uncapitalize<K>]: GetShapeMethodByOperator<K>
} & {
  [K in keyof typeof AliasOperatorEnum as Uncapitalize<K>]: GetShapeMethodByOperator<typeof AliasOperatorEnum[K]>
}

/**
 * 从给定的类型 C 中筛选出静态方法，并将这些方法的参数和返回值转换为 ShapeLike 相关的类型。
 * @template C 要筛选的类型。
 * @returns 返回一个对象，其属性为 C 中的静态方法，这些方法的参数和返回值类型被转换为 ShapeLike 相关的类型。
 */
type StaticMethodsWithParams<C> = {
  [K in FilterNever<{
    [X in keyof C]: X extends string
      ? C[X] extends (...args: any[]) => any
        ? C[X]
        : never
      : never;
  }>]: K extends string
    ? C[K] extends (arg0: infer A, ...args: infer B) => infer C
      ? (this: ShapeLikeToShape<A>, ...args: ShapeLikeArrayToShapeArray<B>) => C
      : never
    : never;
}

/**
 * 将一个数组 A 中的每个元素类型转换为 ShapeLikeToShape 类型。
 * @template A 要转换的数组类型。
 * @returns 返回一个新的数组类型，其元素类型为原数组元素类型对应的 ShapeLikeToShape 类型。
 */
export type ShapeLikeArrayToShapeArray<A extends any[]> = {
  [K in keyof A]: A[K] extends infer Item ? ShapeLikeToShape<Item> : never
}
