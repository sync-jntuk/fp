import express from "express"
import upload from "../utility_modules/fileHandler.js"
import dotenv from "dotenv"

dotenv.config()
const app = express.Router()

app.route('/exam-fee-recipts')
    .post(async (req, res) => {
        upload(req, res, async (err) => {
            try {
                if (err) {
                    res.status(200).json({ errno: 500 })
                } else {
                    const root = process.env.ROOT
                    req.file.path = root + req.file.path
                    console.log(req.file)
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
                console.log(err)
                if (err) {
                    res.status(200).json({ errno: 501, message: err })
                } else {
                    const root = process.env.ROOT
                    req.file.path = root + req.file.path
                    res.status(200).json(req.file)
                }
            } catch (err) {
                res.status(200).json({ errno: 500 })
            }
        })
    })

const fileUpload = app
export default fileUpload
