import { expectTypeOf, test } from 'vitest'
import { InOperator } from '../models'
import type { GetOperator } from './getOperator'

type In = GetOperator<'In'>

test('Get Operator class by typeName', () => {
  expectTypeOf(new InOperator().staticClass).toMatchTypeOf<In>()
})
