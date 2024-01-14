const http = require('http');

const server = http.createServer((request, response) => {
    let { method } = request;
    let { pathname } = new URL(request.url, 'http://127.0.0.1');

    response.end('practise');
})