import React from "react";
import ListOfEvents from "./ListOfEvents.jsx";
import Comments from "./Comments.jsx";
import { useState, useEffect } from "react";

const SingleMap = () => {
    const [loc, setLoc] = useState(1);
    const [lat, setLat] = useState(22.3193);
    const [long, setLong] = useState(114.1894);

    useEffect(() => {
        fetch(`http://localhost:3000/events?price=${priceLimit}`)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
        console.log(priceLimit);
    }, [loc]);

    const changeLoc = (e) => {
        if (loc >= 0 || loc < 9) {
            setLoc(loc + 1);
        } else {
            setLoc(0);
        }
    }

    return (
        <div>
            <button onClick={changeLoc()}>ChangeLoc</button>
            <p>Location ID{loc}</p>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

            <gmp-map id="marker-click-event-example" center={`${lat}, ${long}`} zoom="15" map-id="DEMO_MAP_ID">
                <gmp-advanced-marker position={`${lat}, ${long}`} title={loc}></gmp-advanced-marker>
            </gmp-map>

            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBedbw_-j59ihSLX0n4GEezzV0e4bt3IPY&callback=initMap&libraries=marker&v=beta"
                defer></script>
                
            <ListOfEvents />
            <Comments />
        </div>
    )
}

export default SingleMap;