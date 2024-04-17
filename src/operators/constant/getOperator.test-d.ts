import { expectTypeOf, test } from 'vitest'
import { InOperator } from '../models'
import type { GetOperator } from './getOperator'

type In = GetOperator<'In'>

test('通过类型名称获取运算符类', () => {
  expectTypeOf(InOperator).toMatchTypeOf<In>()
})
