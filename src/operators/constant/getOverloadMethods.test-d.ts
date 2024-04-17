import { expectTypeOf, test } from 'vitest'
import type { GetOverloadMethods } from './getOverloadMethods'

type TResult = GetOverloadMethods<{
  Method1: (a: '1') => 1
  Method3: (a: '2') => 2
}>

test('获取多个方法作为重载', () => {
  expectTypeOf<((a: '1') => 1) & ((a: '2') => 2)>().toMatchTypeOf<TResult>()
})
