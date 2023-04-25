module.exports = {
    //  api 接口
    app: {
        // 默认端口 3000
        port: process.env.PORT || 3000
    },
    // 数据库配置
    db: {
        url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/luxiaohang"
    },
    // 定义jwt密钥
    secret: "e25f8291-a17b-4627-ae8a-72724a87ef4b",
}