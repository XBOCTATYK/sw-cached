const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('mini-css-extract-plugin')
const copyDirRecursive = require('./build-utils/copyDir')

const mainStyleExtractor = new ExtractPlugin({ filename: 'static/css/styles.css'});

process.env.NODE_ENV = 'development'

const SERVER_ROOT = {
    'production': '',
    'development': 'https://localhost:3000'
}
const TARGET = {
    WEB: ['web', 'main'],
    NODE: ['node', 'server'],
    WORKER: ['webworker', 'cache-worker'],
    SECOND_PAGE: ['web', 'second'],
}
const TARGET_IND = 0
const NAME_IND = 1

const htmlPluginOptions = {
    [TARGET.WEB[NAME_IND]]: { publicPath: '.' },
    [TARGET.SECOND_PAGE[NAME_IND]]: { publicPath: SERVER_ROOT[process.env.NODE_ENV], filename: './pages/second/index.html' }
}

const SRC = './src'
const entries = {
    [TARGET.NODE[NAME_IND]]: SRC + '/server/index.ts',
    [TARGET.WEB[NAME_IND]]: SRC + '/client/index.ts',
    [TARGET.WORKER[NAME_IND]]: SRC + '/worker/index.ts',
    [TARGET.SECOND_PAGE[NAME_IND]]: SRC + '/client/pages/second/index.ts',
}

const output = {
    [TARGET.NODE[TARGET_IND]]: '.',
    [TARGET.WEB[TARGET_IND]]: './static/js',
    [TARGET.WORKER[TARGET_IND]]: '.',
}

const outputNamings = {
    [TARGET.NODE[TARGET_IND]]: () => 'server',
    [TARGET.WEB[TARGET_IND]]: (name) => `${name}.[contenthash]`,
    [TARGET.WORKER[TARGET_IND]]: () => 'cache-worker',
}

console.log(process.env.NODE_ENV)

const createConfig = ([target, name]) => ({
    target,
    mode: 'development',
    entry: entries[name],
    output: {
        publicPath: './static',
        filename: `${output[target]}/${outputNamings[target](name)}.js`
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {test: /\.css$/, use: [ExtractPlugin.loader, 'css-loader']},
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', ''],
    },
    plugins: target === TARGET.WEB[TARGET_IND] ? [
        mainStyleExtractor,
        new HtmlWebpackPlugin(htmlPluginOptions[name]),
    ] : []
})

module.exports = Object.values(TARGET).map(target => createConfig(target))

copyDirRecursive('static', 'dist')