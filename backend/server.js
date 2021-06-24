const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const url = "mongodb+srv://jeffreysford2:2.PPsx5g@ehihS$@cluster0.yq5ke.mongodb.net/nasaDB?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use("/", require("./routes/eventRoute"));

app.listen(3001, function () {
    console.log("express server is running on port 3001")
})