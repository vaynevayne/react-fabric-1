import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // 关闭显式 any 的检查，隐式 any 由 TypeScript 的 noImplicitAny 选项检查
      '@typescript-eslint/no-explicit-any': 'off',
      // 允许使用 console，因为这是一个库项目，需要向用户提供有用的警告信息
      'no-console': 'off',
    },
  },
]
