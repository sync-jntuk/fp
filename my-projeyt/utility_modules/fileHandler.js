import multer from "multer"
// import multerS3 from "multer-s3"
// import aws from "aws-sdk"



const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploaded_files')
    },
    filename: function (req, file, callback) {
        const ext = file.originalname.split('.').pop()
        const file_name = Math.floor(100000 + Math.random() * 100000) + '_' + Date.now() + '.' + ext
        // file.filename = req.body.email + "_profile." + ext
        file.filename = file_name
        callback(null, file.filename)
    }
})
const upload = multer({ storage: storage }).single("file_to_upload")

// const s3 = new aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldname: file.fieldname })
//         },
//         key: function (req, file, cb) {
//             cb(null, Math.floor(100000 + Math.random() * 100000) + '_' + Date.now())
//         },
//     })
// })

export default upload
