/* eslint-disable ts/no-unsafe-declaration-merging */
import { type GetShapeOperatorMethod, OperatorEnum, OperatorManager } from '../../operators'
import { RelationManager } from '../../relation'
import type { ShapeInstance } from './type'

export interface ShapeData { }

export abstract class Shape<TData extends ShapeData = ShapeData> {
  constructor(public data: TData) {
  }
}

export interface Shape extends GetShapeOperatorMethod {}

// function applyMixins(derivedCtor: any, baseCtors: any[]) {
//   for (const iterator of Object.values(OperatorEnum))
//     derivedCtor.prototype[iterator] = OperatorManager.run.bind(OperatorManager, iterator)

//   baseCtors.forEach((baseCtor) => {
//     Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//       derivedCtor.prototype[name] = baseCtor.prototype[name]
//     })
//   })
// }
