import type { UnionToIntersection, ValueOf } from 'type-fest'

/**
 * 检查给定的值是否在给定的误差范围内相等。
 *
 * 如果两个数字的差小于 `epsilon`，则它们在给定的误差范围内相等。
 *
 * @param a - 第一个值。
 * @param b - 第二个值。
 * @param epsilon - 误差范围，默认为 1e-5。
 *
 * @returns 如果两个值在给定的误差范围内相等，则返回 `true`，否则返回 `false`。
 */
export function fuzzyEqual(a: number, b: number, epsilon: number = 1e-5): boolean {
  return Math.abs(a - b) < epsilon
}

/**
 * 从类型 `T` 中筛选出不是 `never` 类型的键。
 *
 * @template T - 待筛选的类型。
 * @returns 不是 `never` 类型的键组成的类型。
 */
export type NoNeverKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]

/**
 * 从类型 `Input` 中移除 `never` 类型的属性。
 *
 * @template Input - 待处理的类型。
 * @returns 移除 `never` 类型属性后的类型。
 */
export type NoNever<Input> = {
  [K in NoNeverKeys<Input>]: Input[K];
}

/**
 * 反向查找类型 `C` 中值类型为 `V` 的键。
 *
 * @template C - 包含值的类型。
 * @template V - 要查找的值的类型。
 * @returns 匹配的键组成的交集类型。
 */
export type ReverseLookup<C, V> = UnionToIntersection<ValueOf<{
  [K in FilterNever<{
    [X in keyof C]:
    V extends C[X]
      ? C[X]
      : never;
  }>]: K
}>>

/**
 * 从类型 `T` 中筛选出不是 `never` 类型的键。
 *
 * @template T - 待筛选的类型。
 * @returns 不是 `never` 类型的键组成的类型。
 */
export type FilterNever<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]
