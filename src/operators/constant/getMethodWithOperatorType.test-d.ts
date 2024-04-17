import { expectTypeOf, test } from 'vitest'
import type { GetMethodWithOperatorType } from './getMethodWithOperatorType'

type InMethods = GetMethodWithOperatorType<'In', {
  method1: () => void
}>

test('获取带有运算符类型的方法', () => {
  expectTypeOf<{
    method1: (operatorType: 'In') => void
  }>().toMatchTypeOf<InMethods>()
})
