import express from "express"
import AdminController from "../controllers/admin.js"
import RegulationController from "../controllers/regulation.js"

const app = express.Router()
const adminController = new AdminController()
const regulationController = new RegulationController()

app.route('/login')
    .post(async (req, res) => {
        res.status(200).json(await adminController.login(req.body))
    })

app.route('/add-regulation')
   .post(async (req, res) => {
       res.status(200).json(await regulationController.updateRegulation(req.body))
    })

app.route('/upload-result')
    .post(async (req, res) => {
        res.status(200).json(await adminController.uploadResult(req.body))
    })

app.route('/upload-supplyresult')
    .post(async (req, res) => {
        res.status(200).json(await adminController.uploadSupplyResult(req.body))
    })

app.route('/semester-applications')
    .post(async (req, res) => {
        res.status(200).json(await adminController.getSemesterApplications(req.body))
    })

app.route('/send-result')
    .post(async (req, res) => {
        res.status(200).json(await adminController.sendResult(req.body))
    })

app.route('/send-results')
    .post(async (req, res) => {
        res.status(200).json(await adminController.sendAllResults(req.body))
    })

const admin = app
export default admin
