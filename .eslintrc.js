module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
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
        'import/prefer-default-export': 'off',
    },
};
