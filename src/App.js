
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
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let today = `${month < 10 ? `0${month}` : `${month}`}/${date}/${year}`
    setTodaysActualDate(today)
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
      axios.post('http://localhost:3001/', liveEvents.slice(0, 200))
      setRanAlready(true)
    }
  }, [eventDataFromDB, liveEvents])
  /*************************************************************************************************/




  //The following gets all database data. Will need to uncomment setEventDataFromDB and send that to the map
  useEffect(() => {
    const fetchNewEvents = async () => {
      const res = await fetch("http://localhost:3001/")
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
