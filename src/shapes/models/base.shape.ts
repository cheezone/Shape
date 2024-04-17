/* eslint-disable ts/no-unsafe-declaration-merging */
import { cloneDeep, lowerFirst } from 'lodash-es'
import { OperatorManager } from '../../managers'
import { AliasOperatorEnum, type GetShapeOperatorMethod, OperatorEnum } from '../../operators'
import type { ShapeMap, ShapeTypeName } from './type'

export interface ShapeData { }

export class Shape<TData extends ShapeData = ShapeData> {
  constructor(public data: TData) {
  }

  clone<T extends ShapeMap[ShapeTypeName]>(this: T): T {
    return new (Object.getPrototypeOf(this).constructor)(cloneDeep(this.data as T['data']))
  }
}

export interface Shape extends GetShapeOperatorMethod { }

export function applyShapeMixins() {
  for (const iterator of Object.values(OperatorEnum)) {
    Object.getPrototypeOf(Shape)[lowerFirst(iterator)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(iterator as any, this as any, ...p)
    }
  }
  for (const [alias, operatorType] of Object.entries(AliasOperatorEnum)) {
    Object.getPrototypeOf(Shape)[lowerFirst(alias)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(operatorType as any, this as any, ...p)
    }
  }
}

applyShapeMixins()
