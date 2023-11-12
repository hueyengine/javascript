const fs = require('fs');


// 创建读取流对象
const rs = fs.createReadStream('../资料/子雷 - 千年风雅.flac.mp4');

// 绑定 data 事件
rs.on('data', chunk => {
    console.log(chunk.length);
})

// 绑定 end 事件
rs.on('end', () => {
    console.log('读取完成');
});