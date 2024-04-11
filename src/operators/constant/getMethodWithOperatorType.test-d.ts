import { expectTypeOf, test } from 'vitest'
import type { GetMethodWithOperatorType } from './getMethodWithOperatorType'

type InMethods = GetMethodWithOperatorType<'In', {
  method1: () => void
}>

test('Get Method With OperatorType', () => {
  expectTypeOf<{
    method1: (operatorType: 'In') => void
  }>().toMatchTypeOf<InMethods>()
})
