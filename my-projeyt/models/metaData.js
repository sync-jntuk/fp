import mongoose from "mongoose"

const metaDataScheme = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
})

export default mongoose.model("metaData", metaDataScheme)
