import type { UnionToIntersection, ValueOf } from 'type-fest'

/**
 * 把函数 Map 的值合并成函数重载。
 */
export type GetOverloadMethods<T> = UnionToIntersection<ValueOf<T>>
