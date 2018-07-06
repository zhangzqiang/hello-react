const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//创建一个HtmlWebpackPlugin插件实例
const htmlPlugin = new HtmlWebpackPlugin({
    title: 'react-demo',
    //模板文件
    template: path.join(__dirname, '../public/index.html'),
    //生成文件名
    filename: 'index.html',
    favicon: path.join(__dirname, '../public/favicon.ico'),
    minify: {
        // 移除属性的引号
        removeAttributeQuotes: true,
    },
});

//创建一个MiniCssExtractPlugin插件实例
const cssPlugin = new MiniCssExtractPlugin({
    filename: 'index.css',
});

const environment = 'production';
process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

//向外暴露一个配置对象，commonjs规范（因为webpack是基于node构建）
//在webpack4中有一大特性是约定大于配置，默认打包入口路径是'src/index.js'，打包输出路径是'dist/main.js'
module.exports = {
    // entry:['./src/index.js'],
    mode: environment, //development|production ( 生产环境会将代码压缩 )
    output: {
        //配置文件输出路径
        filename: 'main.js?[hash]',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [htmlPlugin,cssPlugin],
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
                test: /\.(css|less|sass|scss)$/,
                // use从右往左写
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'sass-loader'],
            },
            //解析图片文件
            {
                test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
                        limit: 1024,
                        //指定打包后的图片位置
                        outputPath: 'images/',
                        name: '[name].[ext]?[hash]',
                    },
                }, ],
            },
        ],
    }
};