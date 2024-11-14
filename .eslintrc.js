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
            code: 150,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],

        'import/prefer-default-export': [
            ('off'),
            { target: 'any' },
        ],

        'max-classes-per-file': ['error', 5],

        'no-restricted-syntax': [
            'error',
            {
                selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
                message: 'setTimeout must always be invoked with two arguments.',
            },
        ],
        'no-await-in-loop': 'off',
        'radix': "off" ,
    },
};
