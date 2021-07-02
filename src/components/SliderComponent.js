import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const SliderComponent = (props) => {
    const [iterateThrough, setIterateThrough] = useState(false);
    const [localDate, setLocalDate] = useState(null)


    const isFirstRun = useRef(true);


    const valuetext = (value) => {
        if (!isFirstRun.current) {
            setLocalDate(value)
        }

    }
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        console.log("Effect was run");
    });


    useEffect(() => {
        console.log('local date changed')
        props.setDate(localDate);
    }, [localDate])


    //If I want a play button to iterate though dates
    const iterationHandler = () => {

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
                defaultValue={null}
                getAriaValueText={valuetext}

                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={3}
            //value={iterateThrough ? iterationHandler : 0}
            //valueLabelDisplay="on"
            //onChange={handleSliderChange}
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
