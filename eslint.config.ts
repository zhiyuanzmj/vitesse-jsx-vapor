// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'prefer-const': 'off',
    'semi': ['error', 'never'],
  },
})
