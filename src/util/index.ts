import type { UnionToIntersection, ValueOf } from 'type-fest'

/**
 * 检查给定的值是否在给定的误差范围内相等。
 *
 * 如果两个数字的差小于 `epsilon`，则它们在给定的误差范围内相等。
 *
 * @param a - 第一个值。
 * @param b - 第二个值。
 * @param epsilon - 误差范围，默认为 0.0001。
 *
 * @returns 如果两个值在给定的误差范围内相等，则返回 `true`，否则返回 `false`。
 */
export function fuzzyEqual(a: number, b: number, epsilon: number = 0.0001): boolean {
  return Math.abs(a - b) < epsilon
}

export type NoNeverKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]

export type NoNever<Input> = {
  [K in NoNeverKeys<Input>]: Input[K];
}

export type ReverseLookup<C, V> = UnionToIntersection<ValueOf<{
  [K in FilterNever<{
    [X in keyof C]:
    V extends C[X]
      ? C[X]
      : never;
  }>]: K
}>>

export type FilterNever<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]
