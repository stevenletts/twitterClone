const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to mongoDB")
    }).catch((error) => {
        throw error
    })
}

app.listen(3000, () => {
    connect()
    console.log("listening on port 3000")
})