//webpack.config.js
const path = require('path');
const {merge} = require('webpack-merge');

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};

const baseConfig = {
  entry: {
    main: './src/base.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/base.js', // <--- Will be compiled to this single file
  },
};

const userConfig = {
  entry: {
    main: './src/user.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/user.js', // <--- Will be compiled to this single file
  },
};

const groupConfig = {
  entry: {
    main: './src/group.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/group.js', // <--- Will be compiled to this single file
  },
};

const masterGroupConfig = {
  entry: {
    main: './src/master_group.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/master_group.js', // <--- Will be compiled to this single file
  },
};

const productConfig = {
  entry: {
    main: './src/product.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/product.js', // <--- Will be compiled to this single file
  },
};

const configs = [baseConfig, userConfig, masterGroupConfig, productConfig].map(
  conf => merge(defaultConfig, conf),
);

module.exports = configs;
