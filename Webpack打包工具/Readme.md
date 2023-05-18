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