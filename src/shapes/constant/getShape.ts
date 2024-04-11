import type { ShapeMap, ShapeTypeName } from '../models'

/**
 * 根据名字获取对应的图形类型。
 */
export type getShape<TName extends ShapeTypeName> = ShapeMap[TName]
