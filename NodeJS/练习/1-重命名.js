const fs = require('fs');

const files = fs.readdirSync('./code');

files.forEach(item => {
    let data = item.split('-');
    let [num, name] = data;
    console.log(num, name);

    if (Number(num) < 10) {
        num = '0' + num;
    }

    let newName = num + '-' + name;
    fs.renameSync(`./code/${item}`, `./code/${newName}`);
})