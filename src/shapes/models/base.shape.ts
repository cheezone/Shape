/* eslint-disable ts/no-unsafe-declaration-merging */
import { cloneDeep, lowerFirst } from 'lodash-es'
import { AliasOperatorEnum, type GetShapeOperatorMethod, OperatorEnum, OperatorManager } from '../../operators'

export interface ShapeData { }

export class Shape<TData extends ShapeData = ShapeData> {
  constructor(public data: TData) {
  }

  clone(): Shape<TData> {
    return new Shape(cloneDeep(this.data))
  }
}

export interface Shape extends GetShapeOperatorMethod { }

export function applyShapeMixins() {
  for (const iterator of Object.values(OperatorEnum)) {
    (Shape as any).prototype[lowerFirst(iterator)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(iterator as any, this as any, ...p)
    }
  }
  for (const [alias, operatorType] of Object.entries(AliasOperatorEnum)) {
    (Shape as any).prototype[lowerFirst(alias)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(operatorType as any, this as any, ...p)
    }
  }
}

applyShapeMixins()
