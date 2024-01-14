// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // console.log(request.host);
    // console.log(request.method);
    // console.log(request.url);
    // console.log(request.httpVersion);
    // console.log(request.headers);
    let body = '';
    request.on('data', chunk => {
        body += chunk;
    });
    request.on('end', () => {
        console.log(body);
        // 设置响应体
        response.setHeader('content-type', 'text/html;charset=utf-8');
        response.end('你好');
    })
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动......');
})