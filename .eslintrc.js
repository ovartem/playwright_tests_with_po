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
        indent: [
            'error',
            4,
            {
                ignoredNodes: ['*'],
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
        'no-use-before-define': ['error', {
            functions: true,
            classes: true,
            variables: true,
            allowNamedExports: false,
        }],
        'linebreak-style': [
        'error', 'windows',
        ],
        'import/prefer-default-export': [
            ["warn"],
        ],
    },
};
