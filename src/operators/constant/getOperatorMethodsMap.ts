import type { NoNever } from '../../util'

/**
 * 过滤出首字母大写的静态方法。
 */
export type GetOperatorMethodsMap<T> = NoNever<{
  [K in keyof T]:

  // 是函数
  T[K] extends (...args: any[]) => any
    ? K extends string

    // 首字母大写
      ? Capitalize<K> extends K
        ? T[K]
        : never
      : never
    : never;
}>
