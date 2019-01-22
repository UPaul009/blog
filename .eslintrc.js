module.exports = {
  extends: ['mcansh/typescript'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'jest.setup.js',
          'jest.config.js',
          'utils/renderWithIntl.tsx',
          'scripts/**/*',
          'next.config.js',
        ],
      },
    ],
  },
};
