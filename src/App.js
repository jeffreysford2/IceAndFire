
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


  //The following grabs todays info
  useEffect(() => {
    console.log('running api fetch')
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()
      setEventData(events)
      setLoading(false)
      await console.log(events)
    }
    fetchEvents()
  }, [])

  //******************************************************************************************* */
  //The following posts the event data to the database. Will want to execute this once a day
  // useEffect(() => {
  //   if (eventData.length) {
  //     axios.post('http://localhost:3001/', eventData)
  //   }
  // }, [eventData])
  /*************************************************************************************************/

  //The following gets all database data. Will need to uncomment setEventDataFromDB and send that to the map
  useEffect(() => {
    console.log('test')
    const fetchNewEvents = async () => {
      const res = await fetch("http://localhost:3001/")
      const json = await res.json();
      console.log('json:', json)
      setEventDataFromDB(json)
      //setEventData(eventDataFromDB[0].arrayOfEvents)
    }
    fetchNewEvents()
    console.log(eventData)

  }, [])

  useEffect(() => {
    //setEvents
    console.log('running')
    console.log('date:', date)
    //console.log(eventDataFromDB[date - 1].arrayOfEvents)
    if (date === '1') {
      setEventData(eventDataFromDB[0].arrayOfEvents)
      console.log('here')
      console.log(eventData)
    } else if (date === '2') {
      setEventData(eventDataFromDB[1].arrayOfEvents)
      console.log(eventData)
    } else if (date === '3') {
      setEventData(eventDataFromDB[2].arrayOfEvents)
      console.log(eventData)
    }
  }, [date])

  //eventDataFromDB
  //DAY 1 ----> setEventData(eventDataFromDB[0].arrayOfEvents)
  //DAY 2 ----> setEventData(eventDataFromDB[1].arrayOfEvents)
  //DAY 3 ----> setEventData(eventDataFromDB[2].arrayOfEvents)

  return (
    <div>
      {!loading ? <Map eventData={eventData} /> : <h1>Loading</h1>}
      {!loading ? <SliderComponent

        setDate={setDate}
      /> : null}
    </div>
  );
}

export default App;
