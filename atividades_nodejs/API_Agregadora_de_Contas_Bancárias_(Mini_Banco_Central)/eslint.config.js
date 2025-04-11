import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // obriga a utilização de variaveis
      'semi': ['error', 'always'], // obriga ponto e vírgula
      'quotes': ['error', 'single'], // aspas simples
      'indent': ['error', 2], // identação com 2 espaços
      'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }], // ignora vars como "next" (Express)
      'no-console': 'warn', // alerta pra console.log
      'eqeqeq': ['error', 'always'], // exige ===
      'curly': 'error', // obriga chaves em if/else
      'no-var': 'error', // força uso de let/const
      'prefer-const': 'error', // sugere const quando possível
      'comma-dangle': ['error', 'always-multiline'], // vírgula no último item (útil no git)
    },
  },
  js.configs.recommended,
  prettier,
];
