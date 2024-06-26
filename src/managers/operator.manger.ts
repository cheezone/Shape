import type { AllOperatorMethod, OperatorMap, OperatorTypeName } from '../operators'
import type { ShapeTypeName } from '../shapes'

/**
 * 运算符管理器。
 */
export class OperatorManager {
  private static map: OperatorMap = {} as OperatorMap

  static run: AllOperatorMethod = (operatorType: OperatorTypeName, ...operatorParameters: { type: ShapeTypeName }[]) => {
    const operator = this.get(operatorType)
    const methodName = OperatorManager.getFunctionName(operatorType, ...operatorParameters.map(p => p.type))
    const method = operator[methodName as keyof typeof operator] as unknown as Function
    return method.call(operator, ...operatorParameters)
  }

  /**
   * 注册。
   *
   * @param operator 运算符对象。
   */
  static register<TOperatorTypeName extends OperatorTypeName, TOperator extends OperatorMap[TOperatorTypeName]>(operator: TOperator): void {
    const type = operator.type as TOperatorTypeName
    this.map[type] = operator
  }

  /**
   * 获取运算符。
   *
   * @param type 类型。
   */
  static get<TOperatorTypeName extends OperatorTypeName>(type: TOperatorTypeName): OperatorMap[TOperatorTypeName] {
    return this.map[type]!
  }

  /**
   * 根据运算符类型和图形类型名称生成函数名称。
   *
   * @param operatorTypeName 运算符类型名称。
   * @param shapeTypeNames 图形类型名称数组。
   * @returns 根据运算符和图形类型名称组合成的函数名称。
   */
  static getFunctionName(operatorTypeName: OperatorTypeName, ...shapeTypeNames: ShapeTypeName[]): string {
    if (shapeTypeNames.length === 1)
      return `${operatorTypeName}${shapeTypeNames[0]}`
    else if (shapeTypeNames.length === 2)
      return `${shapeTypeNames[0]}${operatorTypeName}${shapeTypeNames[1]}`
    else
      return `${shapeTypeNames[0]}${operatorTypeName}${shapeTypeNames[1]}With${shapeTypeNames[2]}`
  }
}
