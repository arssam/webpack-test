const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  /**
   * 因为服务器和浏览器代码都可以用 JavaScript 编写，所以 webpack 提供了多种构建目标(target)，你可以在你的 webpack 配置中设置。
   */
  target: 'web', // <=== 默认是 'web'，可省略
  entry: {
    index: ['./dev-client', './src/index.js'] // string | object | array
    // 这里应用程序开始执行
    // webpack 开始打包
  },
  output: {
    // webpack 如何输出结果的相关选项
    path: resolve('dist'), // 必须是绝对路径 // string // 所有输出文件的目标路径
    filename: '[name].[hash:7].js', // string  // 将写入到 output.path 选项指定的目录下
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: resolve('src'),
        options: {
          // presets: ["es2015"]
        },
        // loader 的可选项
      },
      { 
        test: /\.css$/, 
        include: resolve('src'),
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
    ]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    /**
     * 清理dist文件夹
     */
    new CleanWebpackPlugin(['dist']),
    /**
     *  UglifyJs 是一个js 解释器、最小化器、压缩器、美化器工具集
     *  使用HtmlWebpackPlugin两大作用：
        1为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
        2可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
     */
    new webpack.optimize.UglifyJsPlugin(),
    // HtmlWebpackPlugin
    // https://www.jianshu.com/p/2919f5b3efdf?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    /**
     * 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。
     * 因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 css/.*css）当中。
     *  如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。
     */
    new ExtractTextPlugin({
      filename: 'css/[name].css'
      // filename: 'css/[name].[contenthash].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};