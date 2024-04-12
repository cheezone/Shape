import type { UnionToIntersection } from 'type-fest'
import type { OperatorMap } from '../models'
import type { GetMethodWithOperatorType } from './getMethodWithOperatorType'
import type { GetOperatorMethodsMap } from './getOperatorMethodsMap'
import type { GetOverloadMethods } from './getOverloadMethods'

/**
 * 所有运算符的方法。
 */
export type AllOperatorMethod = UnionToIntersection<{
  [K in keyof OperatorMap]: GetOverloadMethods<GetMethodWithOperatorType<K, GetOperatorMethodsMap<OperatorMap[K]>>>;
}[keyof OperatorMap]>
