import type { Simplify } from 'type-fest'
import type { InOperator } from './in.operator'
import type { OnOperator } from './on.operator'
import type { DistOperator } from './dist.operator'
import type { IntersectOperator } from './intersect.operator'

export const OperatorEnum = {
  In: 'In',
  Out: 'Out',
  On: 'On',
  At: 'At',
  Slice: 'Slice',
  Dist: 'Dist',
  Intersect: 'Intersect',
  Of: 'Of',
  Tangent: 'Tangent',
} as const

export const AliasOperatorEnum = {
  DistanceTo: 'Dist',
} as const

export const OperatorFunctionEnum = {
  /**
   * 图形是否在另外一个图形的内部
   *
   * @description 例如点在圆的内部，但是并不会与其重合。
   */
  in: OperatorEnum.In,

  /**
   * 图形是否在另外一个图形的外部
   *
   * @description 例如矩形在圆的外部，没有任何相交。
   */
  out: OperatorEnum.Out,

  /**
   * 图形是否在另外一个图形的形状上
   *
   * @description 例如圆弧完全与圆重合。
   */
  on: OperatorEnum.On,

  /**
   * 图形是否是另外一个图形的一部分。
   *
   * @description 例如线段只有两个端点都和矩形的端点重合，才会判定为一部分。
   */
  of: OperatorEnum.Of,

  /**
   * 根据下标获取图形的某个部分。
   *
   * @description 例如矩形可以拆解成多个部分。
   */
  at: OperatorEnum.At,

  /**
   * 圆是否与另外一个图形相切。
   *
   * @description 这是圆和其他图形的一种关系，交点为 1 个或者与每条边的交点都为 1 个。
   */
  tangentTo: OperatorEnum.Tangent,

  /**
   * 图形和另外一个图形的最短距离。
   */
  distanceTo: OperatorEnum.Dist,

  /**
   * 图形和另外一个图形是否相交。
   */
  isIntersectedWith: OperatorEnum.Intersect,

  /**
   * 图形和另外一个图形相交的位置。
   */
  intersect: OperatorEnum.Intersect,
}

export interface OperatorMap {
  [OperatorEnum.In]: typeof InOperator
  [OperatorEnum.On]: typeof OnOperator
  [OperatorEnum.Dist]: typeof DistOperator
  [OperatorEnum.Intersect]: typeof IntersectOperator
}

export type OperatorTypeName = Simplify<keyof OperatorMap>
export type OperatorClass = OperatorMap[OperatorTypeName]
