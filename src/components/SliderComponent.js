import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const SliderComponent = (props) => {

    const [eventDate, setEventDate] = useState(props)
    console.log(props)

    const handleClick = (e) => {
        console.log(e)
        props.setDate(e.target.value);
        //props.setDate(props.name)
    }
    const handleInputChange = (e) => {
        console.log(e.target.textContent)
        props.setDate(e.target.value);
        //props.setDate(props.name)
    }

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <div>
            <Typography id="discrete-slider" className="slider-text" gutterBottom>
                Temperature
            </Typography>
            <Slider
                className="date-slider"
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={2}
                onChange={e => handleInputChange(e, "getAriaValueText")}
            />



            <button value={1} onClick={e => handleClick(e, "value")} className="test-button-1">1</button>
            <button value={2} onClick={e => handleClick(e, "value")} className="test-button-2">2</button>
            <button value={3} onClick={e => handleClick(e, "value")} className="test-button-3">3</button>
        </div>
    )
}
export default SliderComponent
