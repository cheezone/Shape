// @ts-check
import antfu from '@antfu/eslint-config'
import sortClassMembers from 'eslint-plugin-sort-class-members'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
    },
  },
  sortClassMembers.configs['flat/recommended'],

)
