const mongoose = require("mongoose");

const eventSchema = {
    todaysDate: String,
    arrayOfEvents: []
}

const Event = mongoose.model("Event", eventSchema)

module.exports = Event;
