import type { OperatorMap, OperatorTypeName } from '../models'

/**
 * 根据名字获取对应的运算符类型。
 */
export type GetOperator<TName extends OperatorTypeName> = OperatorMap[TName]
