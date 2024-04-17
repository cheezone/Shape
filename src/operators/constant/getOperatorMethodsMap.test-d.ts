import { expectTypeOf, test } from 'vitest'
import type { GetOperatorMethodsMap } from './getOperatorMethodsMap'

// 定义一个类
class MyClass {
  static Method1() { }
  static method2() { }
  static Method3() { }
  static method4() { }
}

// 使用示例
type MyStaticMethodsMap = GetOperatorMethodsMap<typeof MyClass>

test('获取运算符的静态方法', () => {
  // MyStaticMethodsMap 类型为 { Method1: () => void; Method3: () => void; }
  expectTypeOf<{
    Method1: () => void
    Method3: () => void
  }>().toMatchTypeOf<MyStaticMethodsMap>()
})
