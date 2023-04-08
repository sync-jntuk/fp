import express from "express"
import NewsFeedController from "../controllers/newsfeed.js"

const app = express.Router()
const newsFeedController = NewsFeedController()

app.route('/current')
    .get(async (req, res) => {
        res.status(200).json({
            feeds: await newsFeedController.searchNews({
                query: "Current trending computer science technologies",
                limit: 10,
                save: false
            })
        })
    })

app.route('/search')
    .post(async (req, res) => {
        res.status(200).json({
            feeds: await newsFeedController.searchNews({
                roll: req.body.roll,
                query: req.body.query,
                limit: 15,
                save: true
            })
        })
    })

const newsFeed = app
export default newsFeed
