
import { useState, useEffect } from 'react'
import Map from './components/Map'
import axios from "axios"

function App() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)
  const [eventDataFromDB, setEventDataFromDB] = useState([{
    _id: '',
    arrayOfEvents: '',
    todaysDate: ''
  }])



  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()
      setEventData(events)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  //The following posts the event data to the database. Will want to execute this once a day
  useEffect(() => {
    if (eventData.length) {
      axios.post('http://localhost:3001/', eventData)
    }
  }, [eventData])

  // useEffect(() => {
  //   axios.get('http://localhost:3001/')
  // }, [])

  //The following gets all database data. Will need to uncomment setEventDataFromDB and send that to the map
  useEffect(() => {
    console.log('test')
    const fetchNewEvents = async () => {
      const res = await fetch("http://localhost:3001/")
      const json = await res.json();
      console.log(json)

      // const { events } = await res.json()
      // setEventDataFromDB(events);
      // console.log(events)
    }
    fetchNewEvents()
  }, [])

  return (
    <div>
      {!loading ? <Map eventData={eventData} /> : <h1>Loading</h1>}
    </div>
  );
}

export default App;
