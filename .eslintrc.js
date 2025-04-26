module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    eqeqeq: ['error', 'always'],
    camelcase: 'error',
    indent: ['error', 2],
    semi: ['error', 'always'],
  },
};
