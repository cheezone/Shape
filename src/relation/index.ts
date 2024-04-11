import type { ShapeInstance } from '../shapes'
import type { Relation } from './base'
import type { RelationInstance, RelationMap, RelationType } from './type'

export class RelationManager {
  private static map: Record<string, typeof Relation> = {}

  static register(relation: RelationInstance): void {
    this.map[relation.type] = relation
  }

  static get<T extends RelationType>(type: T): RelationMap[T] {
    return this.map[type] as unknown as RelationMap[T]
  }

  static runImpl<T extends RelationType, TRelation extends RelationMap[T], TLeft extends ShapeInstance, TRight extends ShapeInstance>(type: T, left: TLeft, right: TRight,
  ) {
    const relation = this.get(type) as TRelation
    const func = relation.getFunction(left, right) as ((left: TLeft, right: TRight) => ReturnType<TRelation[`${TLeft['type']}${TRelation['type']}${TRight['type']}`]>)

    return func(left, right)
  }
}
