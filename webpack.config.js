const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('mini-css-extract-plugin')

const mainStyleExtractor = new ExtractPlugin({ filename: 'public/css/styles.css'});

const TARGET = {
    WEB: 'web',
    NODE: 'node',
    WORKER: 'webworker'
}

const SRC = './src'
const entries = {
    [TARGET.NODE]: SRC + '/server/index.ts',
    [TARGET.WEB]: SRC + '/client/index.ts',
    [TARGET.WORKER]: SRC + '/worker/index.ts',
}

const output = {
    [TARGET.NODE]: '.',
    [TARGET.WEB]: './public/js',
    [TARGET.WORKER]: './public',
}

const outputNamings = {
    [TARGET.NODE]: () => 'server',
    [TARGET.WEB]: (name) => `${name}.[contenthash]`,
    [TARGET.WORKER]: () => 'cache-worker',
}

const createConfig = (target) => ({
    target,
    mode: process.env.NODE_ENV ?? 'development',
    entry: entries[target],
    output: {
        publicPath: './public',
        filename: `${output[target]}/${outputNamings[target](target)}.js`
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {test: /\.css$/, use: [ExtractPlugin.loader, 'css-loader']},
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: target === TARGET.WEB ? [
        mainStyleExtractor,
        new HtmlWebpackPlugin({ publicPath: '..' }),
    ] : []
})

module.exports = Object.values(TARGET).map(target => createConfig(target))