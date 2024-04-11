import type { OperatorMap, OperatorTypeName } from './models'

/**
 * 运算符管理器。
 */
export class OperatorManager {
  private static map: OperatorMap = {} as OperatorMap

  static register<TOperatorTypeName extends OperatorTypeName, TOperator extends OperatorMap[TOperatorTypeName]>(operator: TOperator): void {
    const type = operator.type as TOperatorTypeName
    this.map[type] = operator
  }

  static get<TOperatorTypeName extends OperatorTypeName>(type: TOperatorTypeName): OperatorMap[TOperatorTypeName] {
    return this.map[type]!
  }

  // static runOperator<TOperatorTypeName extends OperatorTypeName, TOperator extends OperatorMap[TOperatorTypeName], TOperatorParameters extends ShapeTypeName[]>(operatorType: TOperatorTypeName, ...operatorParameters: TOperatorParameters): StaticMethodsWithParams<TOperator, TOperatorParameters> {
  //   // const a = this.get(operatorType)
  //   // a

  //   const sss = this.getFunctionName('In', 'Point')

  //   // return this.get(operatorType).runImpl(...operatorParameters)
  // }

  // static getFunction<TOperatorTypeName extends OperatorTypeName>(typeName: TOperatorTypeName, ...shapeTypeNames: ShapeTypeName[]) {
  //   return this.get(typeName)[this.getFunctionName(typeName, ...shapeTypeNames)]
  // }

  // static getFunctionName<TOperatorTypeName extends OperatorTypeName, T extends [ShapeTypeName] | [ShapeTypeName, ShapeTypeName] | [ShapeTypeName, ShapeTypeName, ShapeTypeName]>(operatorTypeName: TOperatorTypeName, ...shapeTypeNames: T): getFunctionName<TOperatorTypeName, T> {
  //   if (shapeTypeNames.length === 1)
  //     return `${operatorTypeName}${shapeTypeNames[0]}` as getFunctionName<TOperatorTypeName, T>
  //   else if (shapeTypeNames.length === 2)
  //     return `${shapeTypeNames[0]}${operatorTypeName}${shapeTypeNames[1]}` as getFunctionName<TOperatorTypeName, T>
  //   else
  //     return `${shapeTypeNames[0]}${operatorTypeName}${shapeTypeNames[1]}With${shapeTypeNames[2]}` as getFunctionName<TOperatorTypeName, T>
  // }
}

// export interface OperatorManager{
//   run: G<'In'>
// }

// new OperatorManager().run()

// type getFunctionName<TOperatorTypeName extends OperatorTypeName, T extends [ShapeTypeName] | [ShapeTypeName, ShapeTypeName] | [ShapeTypeName, ShapeTypeName, ShapeTypeName]> =
//   T extends [infer T1 extends ShapeTypeName, infer T2 extends ShapeTypeName, infer T3 extends ShapeTypeName] ?
//   `${T1}${TOperatorTypeName}${T2}With${T3}` :
//     T extends [infer T1 extends ShapeTypeName, infer T2 extends ShapeTypeName] ?
//   `${T1}${TOperatorTypeName}${T2}`
//       : T extends [infer T1 extends ShapeTypeName] ?
//   `${TOperatorTypeName}${T1}`
//         : never

// type buildFunctionName<TOperatorTypeName extends OperatorTypeName, T extends [ShapeTypeName] | [ShapeTypeName, ShapeTypeName] | [ShapeTypeName, ShapeTypeName, ShapeTypeName]> =
//   T extends [infer T1 extends ShapeTypeName, infer T2 extends ShapeTypeName, infer T3 extends ShapeTypeName] ?
//   `${T1}${TOperatorTypeName}${T2}With${T3}` :
//     T extends [infer T1 extends ShapeTypeName, infer T2 extends ShapeTypeName] ?
//   `${T1}${TOperatorTypeName}${T2}`
//       : T extends [infer T1 extends ShapeTypeName] ?
//   `${TOperatorTypeName}${T1}`
//         : never

// type sda = getAllFunctionName<'In', ['Point']>

// type getTargetFunctionName<TOperatorTypeName extends OperatorTypeName, T extends [ShapeTypeName] | [ShapeTypeName, ShapeTypeName] | [ShapeTypeName, ShapeTypeName, ShapeTypeName]> = Pick<GetOperatorMethodsMap<GetOperator<TOperatorTypeName>>, buildFunctionName<TOperatorTypeName, T>>

// type dsa = getFunctionName<'In', ['Point']>

// type G<TOperatorTypeName extends OperatorTypeName> = GetOverloadMethods<GetOperatorMethodsMap<GetOperator<TOperatorTypeName>>>

// type asdas = G<'In'>

// function asdasdas(a: asdas) {
//   a(new Point({ x: 1, y: 1 }), new Point({ x: 1, y: 1 }))
// }
