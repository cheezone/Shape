import { expectTypeOf, test } from 'vitest'
import { Point } from '../models'
import type { getShape } from './getShape'

type GotPoint = getShape<'Point'>

test('Get Shape type by typeName', () => {
  expectTypeOf(new Point({ x: 1, y: 1 })).toMatchTypeOf<GotPoint>()
})
