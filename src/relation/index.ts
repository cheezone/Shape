import type { ShapeInstance } from '../constant'
import { Point } from '../shapes/Point.shape'
import { Segment } from '../shapes/Segment.shape'
import type { Relation } from './base'
import type { RelationInstance, RelationMap, RelationType } from './type'

export class RelationManager {
  private static map: Record<string, typeof Relation> = {}

  static register(relation: RelationInstance): void {
    this.map[relation.type] = relation

    const point = new Point({ x: 1, y: 1 })
    const segment = new Segment({ end: { x: 1, y: 1 }, start: { x: 1, y: 1 } })

    this.runImpl('In', point, segment)(point.data, segment.data)
  }

  // 获取
  static get<T extends RelationType>(type: T): RelationMap[T] {
    return this.map[type] as unknown as RelationMap[T]
  }

  static runImpl<T extends RelationType, TRelation extends RelationMap[T], TLeft extends ShapeInstance, TRight extends ShapeInstance>(type: T, left: TLeft, right: TRight,
  ) {
    const relation = this.get(type) as TRelation
    // left.type
    // relation.type
    // const func = relation.getFunction(left, right)
    const func = relation.getFunction(left, right)

    return func

    // const functionName = `${left.type}${relation.type}${right.type}` as const

    // if (functionName in relation) {
    //   const func = relation[functionName]

    //   return relation[functionName](left.data, right.data)
    // }

    // return void 0
  }
}
