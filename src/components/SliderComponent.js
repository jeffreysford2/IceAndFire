import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const SliderComponent = (props) => {

    const [eventDate, setEventDate] = useState(props)
    const [sliderValue, setSliderValue] = useState(2)
    console.log('props:', props)

    const handleClick = (e) => {
        console.log(e)
        props.setDate(e.target.value);
        //props.setDate(props.name)
    }
    const handleInputChange = (e) => {
        console.log(e.target.value)
        setSliderValue(parseInt(e.target.value))
        //props.setDate(props.name)
    }

    function valuetext(value) {
        setEventDate(value)
        props.setDate(value)
        return `${value}°C`;
    }

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    const classes = useStyles();


    return (
        <div>
            <Typography id="discrete-slider" className="slider-text" gutterBottom>
                Date
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
            //value={sliderValue}
            //onChange={handleInputChange}
            />



            {/* <button value={1} onClick={e => handleClick(e, "value")} className="test-button-1">1</button>
            <button value={2} onClick={e => handleClick(e, "value")} className="test-button-2">2</button>
            <button value={3} onClick={e => handleClick(e, "value")} className="test-button-3">3</button> */}
        </div>
    )
}
export default SliderComponent
