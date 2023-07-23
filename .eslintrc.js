module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 14,
        sourceType: 'module'
    },
    rules: {
        // Add your ESLint rules here
        // 'indent': ['error', 2], // Enforce 2-space indentation
        'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }], // Customize unused variable warning
        // 'quotes': 'error', // Use 'warn' for a warning
        'semi': 'error',  // Use 'error' for an error
        'quotes': ['error', 'single'],

    },
};
