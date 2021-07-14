const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config()
const key = process.env.MONGO_KEY
const mongoURL = process.env.MONGODB_URI


app.use(cors());
app.use(express.json());

const url = `mongodb+srv://jeffreysford2:${key}@cluster0.yq5ke.mongodb.net/nasaDB?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const fetchAllEvents = async () => {
//     const eventArray = await db.collection("events").find({ "todaysDate": "06/25/2021" })
//     await console.log(`eventArray = ${eventArray}`)
// }
// fetchAllEvents()


app.use("/", require("./routes/eventRoute"));

app.listen(process.env.PORT || 3001, function () {
    console.log("express server is running on port 3001")
})