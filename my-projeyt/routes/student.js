import express from "express"
import StudentController from "../controllers/student.js"

const app = express.Router()
const studentController = StudentController()

app.route('/login')
    .post(async (req, res) => {
        res.status(200).json(await studentController.login(req.body))
    })

app.route('/register')
    .post(async (req, res) => {
        res.status(200).json(await studentController.register(req.body))
    })

app.route('/updateprofile')
    .post(async (req, res) => {
        res.status(200).json(await studentController.updateProfile(req.body))
    })

app.route('/result')
    .post(async (req, res) => {
        res.status(200).json(await studentController.getResult(req.body))
    })

app.route('/applyforsemester')
    .post(async (req, res) => {
        res.status(200).json(await studentController.applyForSemester(req.body))
    })

app.route('/metadata')
    .post(async (req, res) => {
        res.status(200).json(await studentController.getStreak(req.body))
    })

const student = app
export default student
