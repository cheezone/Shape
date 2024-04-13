// @ts-check
import antfu from '@antfu/eslint-config'
import sortClassMembers from 'eslint-plugin-sort-class-members'
import tsParser from '@typescript-eslint/parser'
import exportScope from 'eslint-plugin-export-scope'

export default antfu(
  {
    ignores: [
      // ignore Temp Files
      '*-temp.*',
    ],
  },
  {
    rules: {
      // overrides
    },
  },

  // sort class members
  sortClassMembers.configs['flat/recommended'],

  {
    files: ['**/*.ts'],
    rules: {
      // Customize specific configuration properties
      'sort-class-members/sort-class-members': [
        2,
        {
          order: ['[typeName]', '[static-properties]', '[static-methods]', '[properties]', '[conventional-private-properties]', 'constructor', '[methods]', '[conventional-private-methods]'],
          groups: {
            typeName: [{ name: '/type|typeName/' }],
          },
          accessorPairPositioning: 'getThenSet',
        },
      ],
    },
  },

  // Export scope controls
  {
    files: ['**/*.ts'],
    plugins: {
      'export-scope': {
        meta: {
          name: 'export-scope',
          version: '2.3.0',
        },
        configs: {},
        rules: {
          'no-imports-outside-export-scope': exportScope.rules['no-imports-outside-export-scope'],
        },
      },
    },
    rules: {
      'export-scope/no-imports-outside-export-scope': 'error',
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: true, tsconfigRootDir: import.meta.dirname },
    },
  },
)
