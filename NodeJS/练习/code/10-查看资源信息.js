const { log } = require('console');
const fs = require('fs');

fs.stat('../资料/子雷 - 千年风雅.flac.mp4', (err, data) => {
    if (err) {
        console.log('操作失败');
        return;
    }
    console.log(data);
    console.log(data.isFile(), data.isDirectory());
})