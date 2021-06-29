import { useState } from 'react'

const Slider = (props) => {

    const [eventDate, setEventDate] = useState(props)
    console.log(props)

    const handleClick = (e) => {
        console.log(e.target.value)
        props.setDate(e.target.value);
        //props.setDate(props.name)
    }

    return (
        <div>
            <button value={1} onClick={e => handleClick(e, "value")} className="test-button-1">1</button>
            <button value={2} onClick={e => handleClick(e, "value")} className="test-button-2">2</button>
            <button value={3} onClick={e => handleClick(e, "value")} className="test-button-3">3</button>
        </div>
    )
}
export default Slider
