const { Console } = require('console');
const fs = require('fs');

fs.appendFile('./座右铭.txt', ',择其善者而从之', err => {
    if (err) {
        console.log('写入失败~~');
        return;
    }
    console.log('追加写入成功');
});

fs.appendFileSync('./座右铭.txt', '\r\n温故而知新，可以为师矣');

fs.writeFile('./座右铭.txt', 'Love', { flag: 'a' }, err => {
    // 关于err 写入失败：错误对象  写入成功：null
    if (err) {
        console.log('写入失败');
        return;
    }
    console.log('写入成功');
});