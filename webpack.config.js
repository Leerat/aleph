const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isAnalyzing = process.env.ANALYZE

const skip = () => false

const envs = {
  API_URL_CATALOG: JSON.stringify(process.env.API_URL_CATALOG || '/catalog')
}

const root = process.cwd()
const pathToRoot = path.resolve(root)
const pathToDist = path.resolve(root, 'dist')
const pathToContext = path.resolve(root, 'src')
const pathToStatic = path.resolve(root, 'static')

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  context: pathToContext,
  entry: {
    app: './index.js',
    core: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-react'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: pathToDist,
    publicPath: '',
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: isProduction ? [new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })] : [],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: 'core',
          name: 'core',
          chunks: 'initial'
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: -10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: 'initial',
          priority: -20
        },
        css: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'async',
          enforce: true
        }
      }
    }
  },
  devServer: {
    port: '3030',
    hotOnly: true,
    contentBase: [pathToDist, pathToStatic],
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api' : {
        target: 'http://localhost:3000/api',
        cookieDomainRewrite: "localhost",
        pathRewrite: {"^/api" : ""},
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [
      path.resolve(root, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envs
    }),
    isAnalyzing ? new BundleAnalyzerPlugin() : skip,
    isProduction ? new CopyWebpackPlugin([{
      from: 'static',
      to: '',
      context: path.resolve(root),
    }]) : skip,
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'src/index.html'),
      hash: true
    }),
    isProduction ? new CleanWebpackPlugin([pathToDist]) : skip,
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js(x)?$|.ts(x)?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/, pathToDist],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: { minimize: true }}
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]',
        }
      }
    ]
  },
}

module.exports = config
