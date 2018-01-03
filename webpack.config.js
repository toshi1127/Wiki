const path = require('path')
module.exports = {
  entry: path.join(__dirname, 'dist/public/component/index.js'),
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.ts(x?)$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  }
}
/*
var path = require('path');
module.exports = {
  // webpack処理の起点となるファイルの指定と出力アイテムの指定
  entry: {
    app_start: './src/app.ts'
  },
  target: "node",
  output: {
    path: __dirname + '/dist',        // webpack処理したファイルの出力先フォルダ
    publicPath: '/js',     // webpack処理したファイルの公開時のフォルダ
    filename: '[name].js'  // webpack処理したファイルのファイル名
  },
  devServer: {
    contentBase: 'public'  // webpack-dev-serverの公開フォルダ
  },
  module: {
    loaders: [
      { test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader' }
    ]
  },
}*/