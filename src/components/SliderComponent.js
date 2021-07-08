import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const SliderComponent = (props) => {
    //const [localDate, setLocalDate] = useState(null)
    const isFirstRun = useRef(true);


    const valuetext = (value) => {
        if (!isFirstRun.current) {
            setTimeout(function () {
                props.setDate(value)
            }, 50);
            //props.setDate(localDate);
        }
    }
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
    }, []);

    // useEffect(() => {
    //     props.setDate(localDate);
    // }, [localDate]);

    //console.log(`localDate: ${localDate}`)

    function waitToAllowForTimeTravel() {
        setTimeout(function () {
            isFirstRun.current = false;
        }, 1000);
    }


    const handleClick = () => {
        isFirstRun.current = true;
        //setLocalDate(null);
        props.setDate(null);
        waitToAllowForTimeTravel()
    }

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    const classes = useStyles();



    return (
        <div>

            <Slider
                className="date-slider"
                defaultValue={null}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                //valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={props.eventDataLength - 1}

            //valueLabelDisplay="on"
            //value={iterateThrough ? iterationHandler : 0}
            //valueLabelDisplay="on"
            //onChange={handleSliderChange}
            //value={sliderValue}
            //onChange={handleInputChange}
            />
            {props.date !== null ? (
                <section>
                    <Typography id="discrete-slider" className="slider-text" gutterBottom>

                        Date: {props.dateFormatted} (Click through dates with 'left' and 'right' arrow keys)

                    </Typography>
                    <button className="show-live-button" onClick={handleClick}>Show live data</button>
                </section>
            ) : (
                <Typography id="discrete-slider" className="slider-text" gutterBottom>
                    Showing Live Data (Click on timeline to view historic data)
                </Typography>

            )}




            {/* <button value={1} onClick={e => handleClick(e, "value")} className="test-button-1">1</button>
            <button value={2} onClick={e => handleClick(e, "value")} className="test-button-2">2</button>
            <button value={3} onClick={e => handleClick(e, "value")} className="test-button-3">3</button> */}
        </div>
    )
}
export default SliderComponent
