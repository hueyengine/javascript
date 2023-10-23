# 提升开发效率的工具

### package.json 文件
下述代码效果是 webpack 会监听打包的文件。若打包的文件发生变化，则 webpack 会自动重新打包。
```json
"scripts": {
    "watch": "webpack --watch"
}
```
### WebpackDevServer
devServer可以帮助我们启动一个服务器。我们可以自己写一个nodeJS服务器来模拟devServer。webpack不仅可以以命令行的方式使用，还可以在node中直接使用。



## TreeShaking

作用：引用什么，打包什么，把一个模块里的没有引入的变量、方法等摇晃掉。

特点：只支持 ES Module。在Webpack.config.js中，在开发环境下使用treeshaking时，需要配置optimization:{usedExports: true}配置项。另外，还需再package.json里面配置sideEffects:["*.css"]项，以禁用treeshaking对某些第三方模块的作用，例如@babel/pollyfill



## CSS 文件的代码分割

webpack在打包的时候会将css文件直接打包到js文件里，即css in js。

需求：将css文件打包到css文件里面。

MiniCssExtractPlugin：这个插件一般会在线上打包环境中使用，在开发环境中不使用。因为该插件不支持HMR热模块更新。1、若css文件直接被页面引用，那么该插件直接走filename配置选项，若是间接引用，则走chunkFileName配置选项。

 

## 打包分析，Preloading，Prefetching

**打包分析**

当使用webpack对代码进行打包后，我们可以借助一些打包分析工具来对打包生成的文件进行分析。我们进入www.github.com/webpack/analyse 。我们首先生成打包过程描述文件。

You can generate the required JSON file for this tool by running webpack --profile --json > stats.json

 

来自 <https://github.com/webpack/analyse> 

 

官方提供的打包分析工具：

http://webpack.github.com/analyse

 

来自 <https://github.com/webpack/analyse> 

 

 

## Lazy Loading 和 Chunk

这里的懒加载指的是import()这种语法可以让页面在执行的时候需要某些模块的时候再去请求这些模块的代码，而不需要在最开始的时候一次性请求所有的代码。import()语法可以用于异步加载某个模块。懒加载并非是webpack里的概念，而是ES提出的一个实验性语法，本质上它和webpack的关系不大，webpack只不过是能够识别出这种语法，然后对它引入的模块进行代码分割而已。

 

Import()语句返回一个promise对象，所以需要使用pollyfill来识别这种语法。

 

Chunk: 在项目完成打包后，打包目录下的js文件即可成为chunk。在代码分割的基础上，webpack打包过程中生成的每个js文件都可以称为一个chunk。

 

## Webpack 和 Code Splitting

业务痛点：1. webpack会将业务代码和第三方模块库代码打包到一个main.js文件中，导致打包文件很大，加载时间长。2. 当业务代码被改变，用户重新访问我们的页面，需要重新加载新的打包文件，而这个打包文件会很大。

解决方案：在src目录下新建lodash.js文件，在该文件中引入lodash第三方库，并将 引入的变量挂载到window变量上。更改webpack.common.js文件配置，在entry:{}中新增lodash: './src/lodash.js'配置。

总结：现在打包的js被分成了两个main.js和lodash.js。现在当我们改变业务代码且用户重新访问我们的页面时，客户端只需要重新加载业务代码文件main.js，而第三方库没有做任何改变，lodash就不需要在加载，因为浏览器里有缓存。另外，浏览器支持并行加载文件。

 

**webpack****支持同步引入的代码的分割**

以前我们需要自己手动进行代码分割。现在webpack支持代码分割。将lodash.js删除，将main.js恢复成最初始的模样。只需要在webpack.common.js中做简单的配置optimization：{splitChunks:{chunks: 'all'}}

 

**webpack****支持异步引入的代码的分割**

对于异步引入的代码例如使用import()引入的代码，无需做任何配置，会自动进行代码分割，放置到新的文件中。

 

**optimization.splitChunks** **配置参数详解**

webpack代码分割底层使用了splitChunksPlugin插件。

业务痛点：业务代码异步加载了一个lodash第三方库。只要是异步加载，webpack在打包的时候会将这个异步加载文件单独打包成一个文件，自动做的代码分割。该文件的文件名是一个常量值，也就是代码分割时产生的一个id值，例如 0.js，现在自定义这个文件名。

在异步加载组件代码中，有个语法：Magic Comment 魔法注释。

 

当打包同步代码库时，不仅会走chunks这个配置参数，还会走cacheGroups这个配置参数。当打包的代码符合vendors的test配置项要求时，webpack会将打包生成一个vendors.filename的文件。

 

## Development 和 Production 模式的区分打包

 

业务痛点：当前在不同环境下，需要更改webpack.config.js的配置。

解决方法：在项目更目录下新建webpack.dev.js和webpack.prod.js文件，然后分别配置这两个文件。另外，需在package.json文件中的script修改配置，“script”:{ "dev": "webpack-deve-server --config webpack.dev.js", "build": "webpack --config webpack.prod.js"}

 

业务痛点：webpack.dev.js与webpack.prod.js存在大量重复的代码。

解决方案：在项目根目录新建webpack.common.js文件，然后把webpack.dev.js和webpack.prod.js中相同的配置移动到webpack.common.js中，然后将webpack.commone.js与其他两个文件的内容进行合并。合并需要引入webpack-merge模块（module.export = merge(commonConfig, devConfig)）。

 

 





## 环境变量的使用方法

 

 

# Vue-Cli3

vue-cli与webpack之间的转换在node_modules目录下的@vue/cli-service下，入口文件为该目录下的service文件。