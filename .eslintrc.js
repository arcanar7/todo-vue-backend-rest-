module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
}
