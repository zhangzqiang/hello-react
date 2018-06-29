1.为什么是React
2.准备开发环境
3.常用的轮子
4.从零开始搭建react应用
5.ReactJS优秀的UI框架
6.ES2015(ES6)
7.JavaScript状态容器Redux
8.JavaScript编译器Babel
9.Eslint让你的代码更规范
10.动态样式语言Less、Sass/Scss
11.模块打包器Webpack
12.模拟数据MockJS
13.Ajax、Fetch、Axios如何选

1.JavaScript模块打包器rollup





node

vscode

npm/yarn

淘宝镜像

NPM设置淘宝镜像
1.查询当前配置的镜像

npm get registry 

> https://registry.npmjs.org/

设置成淘宝镜像

npm config set registry http://registry.npm.taobao.org/

 

2.换成原来的

npm config set registry https://registry.npmjs.org/

 

Yarn 设置淘宝镜像
1.查询当前配置的镜像

yarn config get registry

> https://registry.yarnpkg.com

设置成淘宝镜像

yarn config set registry http://registry.npm.taobao.org/


SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass 



## 问题解决方案

### Cannot read property ‘type’ of undefined

```bash
"babel-core": "6.26.0", // 目前babel7还再测试，用6更稳定
"eslint": "4.13.0", // 官方也指定这个版本不会报这个错
"eslint-plugin-flowtype": "^2.49.3", // 这个可以是最新版
```

react-redux仅有2个API，Provider和connect
* Provider提供的是一个顶层容器的作用，实现store的上下文传递。
* connect方法比较复杂，为redux中常用的功能，实现了和react连接的建立。

react

antd

redux

babel

eslint

webpack

调试webpack
在浏览器地址栏输入：chrome://inspect/#devices



export default 和 export 区别：
1.export与export default均可用于导出常量、函数、文件、模块等
2.你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
3.在一个文件或模块中，export、import可以有多个，export default仅有一个
4.通过export方式导出，在导入时要加{ }，export default则不需要

1.export
//a.js
export const str = "blablabla~";
export function log(sth) { 
  return sth;
}
对应的导入方式：

//b.js
import { str, log } from 'a'; //也可以分开写两次，导入的时候带花括号

2.export default
//a.js
const str = "blablabla~";
export default str;
对应的导入方式：

//b.js
import str from 'a'; //导入的时候没有花括号
使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名
//a.js
let sex = "boy";
export default sex（sex不能加大括号）
//原本直接export sex外部是无法识别的，加上default就可以了.但是一个文件内最多只能有一个export default。
其实此处相当于为sex变量值"boy"起了一个系统默认的变量名default，自然default只能有一个值，所以一个文件内不能有多个export default。
// b.js
本质上，a.js文件的export default输出一个叫做default的变量，然后系统允许你为它取任意名字。所以可以为import的模块起任何变量名，且不需要用大括号包含
import any from "./a.js"
import any12 from "./a.js" 
console.log(any,any12)   // boy,boy

作者：开车去环游世界
链接：https://www.jianshu.com/p/edaf43e9384f
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。



less-loader 多语言用到