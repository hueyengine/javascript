/**
 * 创建一个 HTTP 服务，端口为 9000，满足如下需求
 * GET /index.html 响应 page/index.html 
 * GET /css/app.css 响应 page/css/app.css 文件内容
 * GET /images/logo.png 响应 page/images/logo.png 文件内容
 */

// 导入 http 模块
const http = require('http');
const fs = require('fs');

// 创建服务对象
const server = http.createServer((request, response) => {
    // 获取请求 url 路经
    let { pathname } = new URL(request.url, 'http://127.0.0.1');
    // 写法一
    // if (pathname === '/index.html') {
    //     // 读取文件内容
    //     let html = fs.readdirSync(__dirname + 'page/index.html');
    //     response.end(html);
    // } else if (pathname === 'css/app.css') {
    //     let css = fs.readFileSync(__dirname + 'page/css/app.css');
    //     response.end(css);
    // } else if (pathname === '/index.js') {
    //     let js = fs.readFileSync(__dirname + '/index.js');
    //     request.end(js);
    // } else {
    //     response.statusCode = 404;
    //     response.end('<h1>404 not found</h1>');
    // }

    const filePath = __dirname + page + pathname;
    // 写法二
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.statusCode = 500;
            response.end('文件读取失败~');
            return;
        }
        response.end(data);
    })
});

server.listen(9000, () => {
    console.log('服务已经启动');
})