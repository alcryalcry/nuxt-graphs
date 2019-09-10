module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "require-await": 0,
    "object-shorthand": 0,
    "unicorn/prefer-includes": 0,
    "curly": 0,
    "space-before-function-paren": 0
  }
}
