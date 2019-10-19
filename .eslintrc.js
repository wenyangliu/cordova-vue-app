module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard' // 打包验证会报错
  ],
  rules: {
    'indent': 0,
    // 'one-var': ['error', 'always'],
    'space-before-function-paren': 0,
    'no-tabs': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
