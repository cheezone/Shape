import type { OperatorTypeName } from '../models'

export type GetMethodWithOperatorType<TOperatorType extends OperatorTypeName, T> = {
  [K in keyof T]:

  // 在最前面加上运算符的类型
  T[K] extends (...args: infer OriginalArgs extends any[]) => infer ReturnType
    ? (operatorType: TOperatorType, ...args: OriginalArgs) => ReturnType
    : never;
}
