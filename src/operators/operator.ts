import { ShapeInstance } from "../constant"
import { Point, PointLike } from "../shapes/Point.shape"
import { SegmentLike } from "../shapes/Segment.shape"
import { Shape } from "../shapes/base.shape"
import { fuzzyEqual } from "../util"

export abstract class Operator {
    abstract type: keyof OperatorMap

    abstract staticClass: typeof Operator

    static run<TOperator extends typeof Operator>(this: TOperator, ...operatorParameters: OperatorParameters<TOperator>) {

        this
    }

    // static get<TStatic extends typeof Operator, TLeft extends ShapeInstance, TRight extends ShapeInstance>(operator: TStatic, left: TLeft, right: TRight): StaticMethodOfType<TStatic, `${TLeft['type']}${T['type']}${TRight['type']}`> {
    //     const name = `${left['type']}${operator.}${right['type']}`
    //     return name in this.staticClass ? this.staticClass[name as unknown as typeof Operator] : undefined
    // }

}

type StaticMethodOfType<T, M extends string> = T extends { [K in M]: (...args: any[]) => any } ? T[M] : never;


type a = StaticMethodOfType<typeof InOperator, 'PointInPoint'>

class InOperator extends Operator {
    type = 'In' as const

    staticClass = InOperator

    static PointInSegment(point: PointLike, segment: SegmentLike) {
        return point.x >= segment.start.x && point.x <= segment.end.x && point.y >= segment.start.y && point.y <= segment.end.y
    }

    static SegmentInSegment(segment1: SegmentLike, segment2: SegmentLike) {
        return this.PointInSegment(segment1.start, segment2) && this.PointInSegment(segment1.end, segment2)
    }

    static PointInPoint(point1: PointLike, point2: PointLike) {
        return fuzzyEqual(point1.x, point2.x) && fuzzyEqual(point1.y, point2.y)
    }
}

type GetOperatorByType<TTypeName extends keyof OperatorMap> = OperatorMap[TTypeName]

type GetMatchedFunctions<TTypeName extends keyof OperatorMap, left extends ShapeInstance> =
    StaticMethodsWithPrefix<GetOperatorByType<TTypeName>['staticClass'], left['type']>

type b = GetMatchedFunctions<'In', Point>
type poN = Point['type']
type FilterNever<T> = {
    [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

type StaticMethodsWithPrefix<C, Prefix extends string> = {
    [K in FilterNever<{
        [X in keyof C]: X extends string
        ? C[X] extends (...args: any[]) => any
        ? X extends `${Prefix}${string}`
        ? X
        : never
        : never
        : never;
    }>]: C[K];
};

type c = StaticMethodsWithParams<InOperator['staticClass'], [PointLike, SegmentLike]>

type StaticMethodsWithParams<C, Params extends any[]> = {
    [K in FilterNever<{
        [X in keyof C]: X extends string
        ? C[X] extends (...args: infer A) => any
        ? A extends Params
        ? X
        : never
        : never
        : never;
    }>]: C[K];
};



interface OperatorMap {
    'In': InOperator
}

type OperatorParameters<TOperator extends Operator> = {


}