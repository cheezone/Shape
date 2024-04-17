/* eslint-disable ts/no-unsafe-declaration-merging */
import { cloneDeep, lowerFirst } from 'lodash-es'
import { OperatorManager } from '../../managers'
import { AliasOperatorEnum, type GetShapeOperatorMethod, OperatorEnum } from '../../operators'
import type { ShapeMap, ShapeTypeName } from './type'

/** 定义图形数据的接口 */
export interface ShapeData { }

/**
 * 图形类。
 * @template TData 图形数据的类型。
 */
export class Shape<TData extends ShapeData = ShapeData> {
  /**
   * 构造一个新的图形实例。
   */
  constructor(public data: TData) {
  }

  /**
   * 克隆当前图形实例。
   */
  clone<T extends ShapeMap[ShapeTypeName]>(this: T): T {
    const Class = this.constructor as any
    return new Class(cloneDeep(this.data as T['data']))
  }
}

export interface Shape extends GetShapeOperatorMethod { }

/**
 * 将运算符的实例方法混入 Shape 类。
 */
export function applyShapeMixins() {
  // 添加操作方法
  for (const iterator of Object.values(OperatorEnum)) {
    (Shape as any).prototype[lowerFirst(iterator)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(iterator as any, this as any, ...p)
    }
  }

  // 添加别名操作方法
  for (const [alias, operatorType] of Object.entries(AliasOperatorEnum)) {
    (Shape as any).prototype[lowerFirst(alias)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(operatorType as any, this as any, ...p)
    }
  }
}

applyShapeMixins()
