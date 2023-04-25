const express = require('express');
// 导入端口
const config = require('./config/index');
// 跨域
const cors = require('cors');
// 引入log4j.js
const log4js = require("./utils/log4j.js");
const { app } = require('./config/index');
// 引入morgan处理日志
// const morgan = require('morgan');

//import routes from './routes';
class App {
    constructor() {
        this.server = express();
        // 中间件
        this.middleWares();
        // 路由
        this.routes();

    }
    // 中间件
    middleWares() {
        // 处理json中间件
        this.server.use(express.json())
        // 跨域
        this.server.use(cors())
        // 处理日志
        // this.server.use(morgan('dev'))
        
        // 静态资源托管
          this.server.use(express.static("public"))

        // 引入数据库
        require('./model')


    }

    routes() {

        // 引入路由中间件
        this.server.use("/api", require('./routes'))

        // 引入错误处理中间件
        this.server.use(require("./middleware/error"))

        // 监听端口
        this.server.listen(config.app.port, () => {
            console.log(`Running at http://localhost:${config.app.port}`);
        })



    }
}

module.export = new App().server


