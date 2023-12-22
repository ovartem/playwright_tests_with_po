module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        mocha: true,
    },
    globals: {
        browser: true,
        driver: true,
        $: true,
        $$: true,
    },
    extends: [
        'airbnb-base',
        'plugin:import/recommended',
        'plugin:playwright/recommended',
    ],
    plugins: [
        'import',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'linebreak-style': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',
        'no-trailing-spaces': 'off'
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'max-len': ['error', {
            code: 120,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],
    },
};
