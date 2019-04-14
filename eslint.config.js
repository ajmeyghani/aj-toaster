module.exports = {
  "extends": ["google", "plugin:react/recommended"],
  "plugins": [
    "react-hooks"
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
  },
  "env": {
    "browser": true,
  },
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "quotes": ["warn", "double"],
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "VariableDeclarator": 1,
      "outerIIFEBody": 1,
      "FunctionDeclaration": {
        "parameters": 1,
        "body": 1,
      },
      "FunctionExpression": {
        "parameters": 1,
        "body": 1,
      },
      "CallExpression": {
        "arguments": 1,
      },
      "ArrayExpression": 1,
      "ObjectExpression": 1,
      "ImportDeclaration": 1,
      "flatTernaryExpressions": false,
      "ignoredNodes": [
        "JSXElement",
        "JSXElement > *",
        "JSXAttribute",
        "JSXIdentifier",
        "JSXNamespacedName",
        "JSXMemberExpression",
        "JSXSpreadAttribute",
        "JSXExpressionContainer",
        "JSXOpeningElement",
        "JSXClosingElement",
        "JSXText",
        "JSXEmptyExpression",
        "JSXSpreadChild",
      ],
      "ignoreComments": false,
    }],
    "require-jsdoc": "off",
    "arrow-parens": "off",
    "valid-jsdoc": "off",
    "new-cap": "off",
  },
};
