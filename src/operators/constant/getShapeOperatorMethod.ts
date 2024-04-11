import type { OperatorMap } from '../models'
import type { GetOverloadMethods } from './getOverloadMethods'

// /**
//  * 根据类型和操作符获取方法。
//  */
//  type GetShapeMethodByOperator<TShape, TOperatorName extends keyof OperatorMap> = GetOverloadMethods<StaticMethodsWithParams<OperatorMap[TOperatorName], TShape>>

// export type GetShapeOperatorMethod<TShape> = {
//   [K in keyof OperatorMap as Lowercase<K>]: GetShapeMethodByOperator<TShape, K>
// }

// type FilterNever<T> = {
//   [K in keyof T]: T[K] extends never ? never : K;
// }[keyof T]

// type StaticMethodsWithParams<C, Param0> = {
//   [K in FilterNever<{
//     [X in keyof C]: X extends string
//       ? C[X] extends (arg0: infer A, ...args: infer B) => infer C
//         ? A extends Param0
//           ? (...args: B) => C
//           : never
//         : never
//       : never;
//   }>]: K extends string
//     ? C[K] extends (arg0: infer A, ...args: infer B) => infer C
//       ? A extends Param0
//         ? (...args: B) => C
//         : never
//       : never
//     : never;
// }

/**
 * 根据类型和操作符获取方法。
 */
type GetShapeMethodByOperator<TOperatorName extends keyof OperatorMap> = GetOverloadMethods<StaticMethodsWithParams<OperatorMap[TOperatorName]>>

export type GetShapeOperatorMethod = {
  [K in keyof OperatorMap as Lowercase<K>]: GetShapeMethodByOperator<K>
}

type FilterNever<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]

type StaticMethodsWithParams<C> = {
  [K in FilterNever<{
    [X in keyof C]: X extends string
      ? C[X] extends (...args: any) => any
        ? C[X]
        : never
      : never;
  }>]: K extends string
    ? C[K] extends (arg0: infer A, ...args: infer B) => infer C
      ? (this: A, ...args: B) => C
      : never
    : never;
}
