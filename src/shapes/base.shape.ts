import type { ShapeInstance } from '../constant'
import { RelationManager } from '../relation'

interface ShapeData {}

export abstract class Shape<TData extends ShapeData> {
  constructor(public data: TData) {
  }

  public in<T extends ShapeInstance, TRight extends ShapeInstance>(this: T, other: TRight) {
    return RelationManager.runImpl('In', this, other)
  }

  public contains<T extends ShapeInstance, TRight extends ShapeInstance>(this: T, other: TRight) {
    return RelationManager.runImpl('In', other, this)
  }
}
