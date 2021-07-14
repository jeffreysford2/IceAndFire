const express = require('express');
const router = express.Router();
const Event = require("../models/eventModel");

router.route("/").post((req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    todaysDate = mm + '/' + dd + '/' + yyyy;

    const arrayOfEvents = req.body;
    const newEvent = new Event({
        todaysDate,
        arrayOfEvents
    });
    console.log(newEvent.arrayOfEvents[0])
    newEvent.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }

    });
})

router.route("/").get((req, res) => {
    try {
        console.log('in get')
        Event.find()
            .then(foundEvents => res.json(foundEvents))
    } catch (err) {
        next(err)
    }

})

module.exports = router;
