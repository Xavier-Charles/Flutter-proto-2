import React from 'react';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import img1x from '../assets/pexels-matheus-henrin-1400x850.jpg'
import img2x from '../assets/pexels-godisable-jacob-1400x850.jpg'
import img3x from '../assets/pexels-uncovered-1400x850.jpg'

import img1 from '../assets/pexels-matheus-henrin-450x800.jpg'
import img2 from '../assets/pexels-godisable-jacob-450x800.jpg'
import img3 from '../assets/pexels-uncovered-450x800.jpg'

export default function Carousel (props) {

    const AutoplaySlider = withAutoplay(AwesomeSlider);
    // Declare a new state variable with the "useState" Hook
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 620;

    React.useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
        the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));

        /* passing an empty array as the dependencies of the effect will cause this
        effect to only run when the component mounts, and not each time it updates.
        We only want the listener to be added once */
    }, [])

    return (
        <div>
            <AutoplaySlider play={true} cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000} fillParent={true}> 
                <div data-src={width > breakpoint? img1x :img1} />
                <div data-src={width > breakpoint? img2x :img2} />
                <div data-src={width > breakpoint? img3x :img3} />
            </AutoplaySlider>
        </div>
    )
}



