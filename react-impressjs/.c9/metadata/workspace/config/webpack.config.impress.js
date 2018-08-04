{"filter":false,"title":"webpack.config.impress.js","tooltip":"/config/webpack.config.impress.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":82,"column":0},"action":"remove","lines":["var webpack = require('webpack');","var paths = require('./paths');","var ExtractTextPlugin = require(\"extract-text-webpack-plugin\");","","var publicPath = '/';","","module.exports = {","  entry: [","    //index: paths.componentPath","    //Impress: paths.impressPath,","    //Step: paths.stepPath","    require.resolve('./polyfills'),","    paths.appIndexJs,","  ],","  output: {","    path: paths.appDist,","    pathinfo: true,","    filename: '[name].js',","    publicPath: publicPath","  },","  resolve: {","    fallback: paths.nodePaths,","    extensions: ['.js', '.json', '.jsx', ''],","    alias: {","      'react-native': 'react-native-web'","    }","  },","  module: {","    preLoaders: [","      {","        test: /\\.(js|jsx)$/,","        loader: 'eslint',","        include: paths.appSrc,","      }","    ],","    loaders: [","      {","        exclude: [","          /\\.html$/,","          /\\.(js|jsx)$/,","          /\\.css$/,","          /\\.json$/,","          /\\.svg$/,","          /\\.sass$/,","          /\\.scss$/","          ","        ],","        loader: 'url',","        query: {","          limit: 10000,","          name: 'static/media/[name].[hash:8].[ext]'","        }","      },","      {","        test: /\\.(js|jsx)$/,","        include: paths.appSrc,","        loader: 'babel',","        query: {","          cacheDirectory: true","        }","      },","      {","        test: /\\.css$/,","        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')","      },","      {","        test: /\\.json$/,","        loader: 'json'","      },","      {","        test: /\\.svg$/,","        loader: 'file',","        query: {","          name: 'static/media/[name].[hash:8].[ext]'","        }","      }","    ]","  },","  plugins: [","    new ExtractTextPlugin(\"[name].css\")","  ]","};",""],"id":328},{"start":{"row":0,"column":0},"end":{"row":88,"column":0},"action":"insert","lines":["var webpack = require('webpack');","var paths = require('./paths');","var ExtractTextPlugin = require(\"extract-text-webpack-plugin\");","","var publicPath = '/';","","module.exports = {","  entry: [","    //index: paths.componentPath","    //Impress: paths.impressPath,","    //Step: paths.stepPath","    require.resolve('./polyfills'),","    paths.appIndexJs,","  ],","  output: {","    path: paths.appDist,","    pathinfo: true,","    filename: '[name].js',","    publicPath: publicPath","  },","  resolve: {","    fallback: paths.nodePaths,","    extensions: ['.js', '.json', '.jsx', ''],","    alias: {","      'react-native': 'react-native-web'","    }","  },","  module: {","    preLoaders: [","      {","        test: /\\.(js|jsx)$/,","        loader: 'eslint',","        include: paths.appSrc,","      }","    ],","    loaders: [","      {","        exclude: [","          /\\.html$/,","          /\\.(js|jsx)$/,","          /\\.css$/,","          /\\.json$/,","          /\\.svg$/,","          /\\.sass$/,","          /\\.scss$/","          ","        ],","        loader: 'url',","        query: {","          limit: 10000,","          name: 'static/media/[name].[hash:8].[ext]'","        }","      },","      {","        test: /\\.(js|jsx)$/,","        include: paths.appSrc,","        loader: 'babel',","        query: {","          cacheDirectory: true","        }","      },","      {","        test: /\\.css$/,","        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')","      },","      // Scss","      {","        test: /\\.s[ac]ss$/,","        include: paths.appSrc,","        loader: ExtractTextPlugin.extract(['css', 'sass'])","      },","      {","        test: /\\.json$/,","        loader: 'json'","      },","      {","        test: /\\.svg$/,","        loader: 'file',","        query: {","          name: 'static/media/[name].[hash:8].[ext]'","        }","      }","    ]","  },","  plugins: [","    new ExtractTextPlugin(\"[name].css\")","  ]","};",""]}]]},"ace":{"folds":[],"scrolltop":366,"scrollleft":0,"selection":{"start":{"row":88,"column":0},"end":{"row":88,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":25,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1490331137707,"hash":"aed7e63fedd0fbd5fd1d1cf558a5a845ae656460"}