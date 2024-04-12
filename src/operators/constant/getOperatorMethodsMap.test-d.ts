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

test('Get Operator static methods', () => {
  // MyStaticMethodsMap 类型为 { Method1: () => void; Method3: () => void; }

  expectTypeOf<{
    Method1: () => void
    Method3: () => void
  }>().toMatchTypeOf<MyStaticMethodsMap>()
})
