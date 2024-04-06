import type { ShapeInstance } from '../constant'
import type { RelationInstance } from './type'

export abstract class Relation {
  static getFunctionName<T extends RelationInstance, TLeft extends ShapeInstance, TRight extends ShapeInstance>(this: T, left: TLeft, right: TRight): GetFunctionNameByRelationAndShape<T, TLeft, TRight> {
    return `${left.type}${this.type}${right.type}` as GetFunctionNameByRelationAndShape<T, TLeft, TRight>
  }

  static getFunction<T extends RelationInstance, TLeft extends ShapeInstance, TRight extends ShapeInstance>(this: T, left: TLeft, right: TRight) {
    return this[this.getFunctionName(left, right)]
  }
}

type GetFunctionNameByRelationAndShape<T extends RelationInstance, TLeft extends ShapeInstance, TRight extends ShapeInstance> =
  `${TLeft['type']}${T['type']}${TRight['type']}`
