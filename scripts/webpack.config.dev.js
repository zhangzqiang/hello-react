const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const apiMocker = require ('webpack-api-mocker');
const pkg = require ('../package.json');
const environment = 'development';

process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

//创建一个HtmlWebpackPlugin插件实例
const htmlPlugin = new HtmlWebpackPlugin ({
  title: pkg.title,
  //模板文件
  template: path.join (__dirname, '../public/index.html'),
  //生成文件名
  filename: 'index.html',
  favicon: path.join (__dirname, '../public/favicon.ico'),
  minify: {
    // 移除属性的引号
    removeAttributeQuotes: true,
  },
});

//创建一个MiniCssExtractPlugin插件实例
const cssPlugin = new MiniCssExtractPlugin ({
  filename: 'main.css?[hash]',
});


//向外暴露一个配置对象，commonjs规范（因为webpack是基于node构建）
//在webpack4中有一大特性是约定大于配置，默认打包入口路径是'src/index.js'，打包输出路径是'dist/main.js'
module.exports = {
  mode: environment, //development|production ( 生产环境会将代码压缩 )
  output: {
    //配置文件输出路径
    filename: 'main.js?[hash]',
    path: path.resolve (__dirname, '../dist'),
    publicPath: 'http://localhost:3000/',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin (),
    new webpack.HotModuleReplacementPlugin(),
    htmlPlugin,
    cssPlugin,
  ],
  // 指定第三方库目录，减少webpack寻找时间
  resolve: {
    modules: [path.resolve (__dirname, '../node_modules')],
  },
  module: {
    //webpack默认只能打包处理.js后缀的文件，像.jpg .vue等文件无法主动处理，所以需要配置第三方loader
    rules: [
      // 解析js|jsx文件
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        // 在使用babel-loader时候一定要加上exclude,排除node_modules文件夹
        exclude: /node_modules/,
      },
      // 解析css文件
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // 解析less
      {
        test: /\.(less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      //解析sass/scss
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      //解析图片文件
      {
        test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
              limit: 1024,
              //指定打包后的图片位置
              outputPath: 'images/',
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    //自动打开默认浏览器
    //open: true,
    //如果省略，默认8080
    port: 3000,
    //通过代理，解决跨域问题
    proxy: {
      // 请求到 '/api' 下 的请求都会被代理到 target： http://192.168.14.119:14211 中
      '/api': {
        target: 'http://192.168.14.119:14211',
        // 接受 运行在 https 上的服务
        secure: false,
        changeOrigin: true,
      },
    },
    //默认会以根文件夹提供本地服务器，这里指定文件夹
    //contentBase: path.resolve (__dirname, '../dist'),
    publicPath: '/',
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    //利用webpack-dev-server 的before 方法调用webpack-api-mocker
    before (app) {
      if (pkg.mocker) {
        apiMocker (
          app,
          path.resolve (__dirname, '../mocker/index.js') //生成模拟数据
        );
      }
    },
  },
};
