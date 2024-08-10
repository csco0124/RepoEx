module.exports = {
  env: { 
    browser: true,
    es2020: true 
  },
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module' 
  },
  plugins: [
    "react",
    "react-hooks",
    'react-refresh',
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        //탭 너비
        tabWidth: 2,
        //탭 사용 여부
        useTabs: false,
        //세미클론 여부
        semi: true,
        //' or "
        singleQuote: true,
        parser: "flow",
        //여러줄 사용시, 뒷줄 콤마 여부
        trailingComma: 'all',
        //객체 리터럴 사용시 괄호에 공백 삽입 여부
        bracketSpacing: true,
        //화살표 함수 괄호 사용 방식
        arrowParens: 'avoid',
        //맨마지막 줄 넣는지 여부
        endOfLine: 'auto',
        bracketSameLine: true,
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
};
