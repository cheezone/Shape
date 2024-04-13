import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'lcov'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.test-d.ts'],
      ignoreEmptyLines: true,
    },
  },
})
