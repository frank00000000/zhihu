// 引入配置文件
const config = require('../config')

// 引入mongoose
const mongoose = require('mongoose');

// 连接 mongodb
mongoose.connect(config.db.url)

const db =mongoose.connection

db.on('error', err=>{
    console.log('数据库连接失败');
})


db.on('open', ()=>{
    console.log('数据库连接成功');
})