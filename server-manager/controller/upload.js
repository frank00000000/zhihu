exports.upload = (req, res, next) => {
    try {
        res.status(200).json({
            code: 200,
            msg: "上传成功",
            data: "http://localhost:3000/" + "upload/" + req.file.originalname
        })

    } catch (error) {
        next(error)
    }

}