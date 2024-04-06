import type { ShapeEnum, ShapeInstance, ShapeType } from '../constant'
import { RelationManager } from '../relation'
import { RelationEnum, RelationType } from '../relation/type'

export abstract class Shape {
  public in<T extends ShapeInstance, TRight extends ShapeInstance>(this: T, other: TRight) {
    return RelationManager.runImpl('In', this, other) 
  }
}
