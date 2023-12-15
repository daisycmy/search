import React, {useState, useEffect} from "react";

const ListOfEvents = ({locID}) => {

    const [table, setTable] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/lo/${locID}`)
            .then(response => response.json())
            .then(data => setTable(data))
            .catch(error => console.error('Error:', error));
        console.log(priceLimit);
    }, [locID]);



    return (
        table
    )
}

export default ListOfEvents;




