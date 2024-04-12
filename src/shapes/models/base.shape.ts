/* eslint-disable ts/no-unsafe-declaration-merging */
import { lowerFirst } from 'lodash-es'
import { type GetShapeOperatorMethod, OperatorEnum, OperatorManager } from '../../operators'

export interface ShapeData { }

export class Shape<TData extends ShapeData = ShapeData> {
  constructor(public data: TData) {
  }
}

export interface Shape extends GetShapeOperatorMethod { }

export function applyShapeMixins() {
  for (const iterator of Object.values(OperatorEnum)) {
    (Shape as any).prototype[lowerFirst(iterator)] = function (this: Shape, ...p: [any]) {
      return OperatorManager.run(iterator as any, this as any, ...p)
    }
  }
}

applyShapeMixins()
