import type { OperatorTypeName } from '../models'
import type { ShapeLikeArrayToShapeArray } from './getShapeOperatorMethod'

/**
 * 根据运算符类型和目标类型 `T`，生成一个新的类型，该类型将在原有方法参数前加上运算符类型参数。
 *
 * @template TOperatorType 继承自 `OperatorTypeName` 的运算符类型。
 * @template T 目标类型，通常是一个包含方法的对象。
 * @returns 返回一个新的类型，该类型的方法将要求首个参数为运算符类型，其余参数根据原方法参数自动推导。
 */
export type GetMethodWithOperatorType<TOperatorType extends OperatorTypeName, T> = {
  [K in keyof T]:
  // 判断 T[K] 是否为函数类型，如果是，则在参数列表最前面加上运算符类型参数。
  T[K] extends (...args: infer OriginalArgs extends any[]) => infer ReturnType
    ? (operatorType: TOperatorType, ...args: ShapeLikeArrayToShapeArray<OriginalArgs>) => ReturnType
    : never;
}
