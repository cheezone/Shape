import get from 'lodash-es/get'
import type { ShapeInstance } from '../constant'
import type { PointLike } from '../shapes/Point.shape';
import { Point } from '../shapes/Point.shape'
import type { SegmentLike } from '../shapes/Segment.shape'
import { fuzzyEqual } from '../util'

/**
 * 运算符。
 */
export abstract class Operator {
  abstract staticClass: typeof Operator
}

/**
 * 运算符管理器。
 */
export abstract class OperatorManager {
  private static map: Partial<OperatorMap> = {}

  static register<TOperatorTypeName extends OperatorTypeName, TOperator extends OperatorMap[TOperatorTypeName]>(operator: TOperator): void {
    this.map[operator.type] = operator
  }

  static get<TOperatorTypeName extends OperatorTypeName>(type: TOperatorTypeName): OperatorMap[TOperatorTypeName] {
    return this.map[type]!
  }

  static runOperator<TOperatorTypeName extends OperatorTypeName, TOperator extends OperatorMap[TOperatorTypeName], TOperatorParameters extends any[]>(operatorType: TOperatorTypeName, ...operatorParameters: TOperatorParameters): StaticMethodsWithParams<TOperator, TOperatorParameters> {
    const a = this.get(operatorType)
    a
    return this.get(operatorType).runImpl(...operatorParameters)
  }
}

type GetFunctionNameByOperatorAndShape<TOperator extends OperatorMap[keyof OperatorMap], TLeft extends ShapeInstance, TRight extends ShapeInstance> =
    InObjectKeys<`${TLeft['type']}${TOperator['type']}${TRight['type']}`, TOperator>
type InObjectKeys<T, TOperator extends OperatorMap[keyof OperatorMap]> = FilterNever<{
  [K in keyof TOperator]: K extends T ? K : never;
}>

type a = InObjectKeys<`${ShapeInstance['type']}${InOperator['type']}${ShapeInstance['type']}`, typeof InOperator>

export function runOperator<TOperatorTypeName extends OperatorTypeName, TOperator extends OperatorMap[TOperatorTypeName], TOperatorParameters extends any[], TFunctionsMap extends StaticMethodsWithParams<TOperator, TOperatorParameters>>(operatorType: TOperatorTypeName, ...operatorParameters: TOperatorParameters): ValueOf<MethodValues<TFunctionsMap>> {
  const operator = OperatorManager.get(operatorType)
  if (operatorParameters.length === 2)
    return operator[`${operatorParameters[0].type}${operator.type}${operatorParameters[1].type}`]

  result

  return operator[(`${operator.type}${operatorParameters[0].type}`)](...operatorParameters)
}

const r = runOperator('In', new Point({ x: 1, y: 1 }), { x: 2, y: 2 })

type StaticMethodOfType<T, M extends string> = T extends { [K in M]: (...args: any[]) => any } ? T[M] : never

type a = StaticMethodOfType<typeof InOperator, 'PointInPoint'>

function runImpl<TOperatorParameters extends any[], TFunctions extends StaticMethodsWithParams<typeof InOperator, TOperatorParameters>>(...operatorParameters: TOperatorParameters): ValueOf<MethodValues<TFunctions>> {
  // const [left, right] = operatorParameters
  // return this[`${left.type}`]
  return null as any
}

class InOperator extends Operator {
  static type = 'In' as const

  //   static runImpl<TOperatorParameters extends any[], TFunctions extends StaticMethodsWithParams<typeof InOperator, TOperatorParameters>>(...operatorParameters: TOperatorParameters): TFunctions {
  //     // const [left, right] = operatorParameters
  //     // return this[`${left.type}`]
  //     return null as any
  //   }

  static PointInSegment(point: PointLike, segment: SegmentLike) {
    return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
  }

  static SegmentInSegment(segment1: SegmentLike, segment2: SegmentLike) {
    return this.PointInSegment(segment1.start, segment2) && this.PointInSegment(segment1.end, segment2)
  }

  static PointInPoint(point1: PointLike, point2: PointLike) {
    return fuzzyEqual(point1.x, point2.x) && fuzzyEqual(point1.y, point2.y)
  }

  type = 'In' as const

  staticClass = InOperator
}

type GetOperatorByType<TTypeName extends keyof OperatorMap> = OperatorMap[TTypeName]
type FilterNever<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]

interface OperatorMap {
  In: typeof InOperator
}

type OperatorTypeName = keyof OperatorMap

type StaticMethodsWithParams<C, Params extends any[]> = {
  [K in FilterNever<{
    [X in keyof C]: X extends string
      ? C[X] extends (...args: infer A) => any
        ? Params extends A
          ? X
          : never
        : never
      : never;
  }>]: C[K];
}

type StaticMethodsWithParamsV<C, Params extends any[]> = {
  [K in FilterNever<{
    [X in keyof C]: X extends string
      ? C[X] extends (...args: infer A) => infer R
        ? A extends Params
          ? R
          : never
        : never
      : never;
  }>]: C[K];
}

// 定义获取方法值的集合的类型
type MethodValues<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
}

type ValueOf<T> = T[keyof T]

type PointWithAnyValue<C, Params extends any[], Value> = {
  [K in keyof StaticMethodsWithParams<C, Params>]: ReturnType<StaticMethodsWithParams<C, Params>[K]>
}[keyof StaticMethodsWithParams<C, Params>]
type PointWithAny = StaticMethodsWithParams<InOperator['staticClass'], [PointLike, any]>
type PointWithAnyValue = ValueOf<MethodValues<PointWithAny>>
