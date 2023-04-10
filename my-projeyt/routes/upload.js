import express from "express"
import upload from "../utility_modules/fileHandler.js"
import dotenv from "dotenv"
import fs from "fs"

import StudentController from "../controllers/student.js"

const studentController = StudentController()

dotenv.config()
const app = express.Router()

function move(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy()
            } else {
                callback(err)
            }
            return
        }
        callback()
    })
    function copy() {
        var readStream = fs.createReadStream(oldPath)
        var writeStream = fs.createWriteStream(newPath)
        readStream.on('error', callback)
        writeStream.on('error', callback)
        readStream.on('close', function () {
            fs.unlink(oldPath, callback)
        })
        readStream.pipe(writeStream)
    }
}

app.route('/exam-fee-recipts')
    .post(async (req, res) => {
        upload(req, res, async (err) => {
            try {
                if (err) {
                    res.status(200).json({ errno: 500 })
                } else {
                    move(req.file.path, '../my-projext/src/assets/img/' + req.file.path, () => { })
                    req.file.path = process.env.ROOT + req.file.path
                    res.status(200).json(req.file)
                }
            } catch (err) {
                res.status(200).json({ errno: 500 })
            }
        })
    })

app.route('/profile-picture')
    .post(async (req, res) => {
        // console.log(req.files)
        // let result = await upload.single("file_to_upload")
        // res.json(result)
        upload(req, res, async (err) => {
            try {
                if (err) {
                    res.status(200).json({ errno: 501, message: err })
                } else {
                    move(req.file.path, '../my-projext/src/assets/img/' + req.file.path, () => { })
                    req.file.path = process.env.ROOT + req.file.path
                    const { roll } = req.body
                    await studentController.updateProfile({ roll: roll, picture: req.file.path })
                    res.status(200).json(req.file)
                }
            } catch (err) {
                res.status(200).json({ errno: 500 })
            }
        })
    })

const fileUpload = app
export default fileUpload
