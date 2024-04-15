import type { ShapeClassMap, ShapeTypeName } from '../shapes'

/**
 * 运算符管理器。
 */
export class ShapeManager {
  private static map: ShapeClassMap = {} as ShapeClassMap

  /**
   * 注册。
   *
   * @param type 图形类型。
   * @param shape 图形对象。
   */
  static register<TShapeTypeName extends ShapeTypeName, TShape extends ShapeClassMap[TShapeTypeName]>(type: TShapeTypeName, shape: TShape): void {
    this.map[type] = shape
  }

  /**
   * 获取图形。
   *
   * @param type 类型。
   */
  static get<TShapeTypeName extends ShapeTypeName>(type: TShapeTypeName): ShapeClassMap[TShapeTypeName] {
    return this.map[type]!
  }
}
