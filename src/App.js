
import { useState, useEffect } from 'react'
import Map from './components/Map'
import SliderComponent from './components/SliderComponent'
import axios from "axios"

function App() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(null)
  const [eventDataFromDB, setEventDataFromDB] = useState([{
    _id: '',
    arrayOfEvents: '',
    todaysDate: ''
  }])
  const [liveEvents, setLiveEvents] = useState([])
  const [dateFormatted, setDateFormatted] = useState('')
  const [todaysActualDate, setTodaysActualDate] = useState('')
  const [ranAlready, setRanAlready] = useState(false)


  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todaysDate2 = mm + '/' + dd + '/' + yyyy;
    setTodaysActualDate(todaysDate2)
  }, [])

  //The following grabs todays info
  useEffect(() => {
    console.log('running api fetch')
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()
      setEventData(events)
      setLiveEvents(events)
      setLoading(false)
      //await console.log(events)
    }
    fetchEvents()
  }, [])



  //https://corsanywhere.herokuapp.com/https://nasa-event-backend.herokuapp.com/

  //http://localhost:3001/

  //******************************************************************************************* */
  //The following posts the event data to the database. Will want to execute this once a day
  useEffect(() => {

    if (liveEvents.length && eventDataFromDB[eventDataFromDB.length - 1].todaysDate !== todaysActualDate && !ranAlready) {
      console.log('running post to database!')
      axios.post('https://nasa-event-backend.herokuapp.com/', liveEvents.slice(0, 200))
      setRanAlready(true)
    }
  }, [eventDataFromDB, liveEvents])
  /*************************************************************************************************/




  //The following gets all database data. Will need to uncomment setEventDataFromDB and send that to the map
  useEffect(() => {
    const fetchNewEvents = async () => {
      const res = await fetch("https://nasa-event-backend.herokuapp.com/")
      const json = await res.json();
      setEventDataFromDB(json)
    }
    fetchNewEvents()
  }, [])


  //If date is changed, set eventData to the events from the specific date from the DB.
  //I will want to add something that changes date to null, thereby changing eventData to
  //todays live events.
  useEffect(() => {
    //console.log(`date = ${date}`)
    if (date !== null) {
      setEventData(eventDataFromDB[date].arrayOfEvents)
      setDateFormatted(eventDataFromDB[date].todaysDate)
    } else {
      setEventData(liveEvents)
    }
  }, [date])

  return (
    <div>
      {!loading ? <Map eventData={eventData} /> : <h1>Loading</h1>}
      <div className="slider-container">
        {!loading ? <SliderComponent
          eventDataLength={eventDataFromDB.length}
          dateFormatted={dateFormatted}
          setDate={setDate}
          date={date}
        /> : null}
      </div>
    </div>
  );
}

export default App;
