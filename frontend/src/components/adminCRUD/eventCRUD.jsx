import React from "react";


const eventCRUD = () => {
    function handleSubmit(event){
        const { id } = event.nativeEvent.submitter;
        if(id === "create"){
            // shitty code please dont do this
            let eventid = document.getElementById("eventId").value
            if(!eventid){
                alert('You must enter the event ID!');
                return
            }
            let locId = document.getElementById("locId").value
            if(!locId){
                alert('You must enter the locId!');
                return
            }            
            let title = document.getElementById("title").value
            if(!title){
                alert('You must enter the event!');
                return
            }            
            let starttime = document.getElementById("starttime").value
            if(!eventid){
                alert('You must enter the starttime!');
                return
            }            
            let endtime = document.getElementById("endtime").value
            if(!eventid){
                alert('You must enter the endtime!');
                return
            }
            let description = document.getElementById("description").value || ""
            let presenter = document.getElementById("presenter").value
            if(!eventid){
                alert('You must enter the presenter!');
                return
            }            
            let price = document.getElementById("price").value
            if(!eventid){
                alert('You must enter the price!');
                return
            } 

            fetch("http://localhost:3000/newEvent", {
                method: "POST",
                body: JSON.stringify({
                    "eventId": eventId,
                    "title": title,
                    "locId": locId,
                    "starttime": starttime,
                    "endtime": endtime,
                    "recurring": recurring,
                    "description": description,
                    "presenter": presenter,
                    "price": price
                })
            }).then((response) => {
                if(!response.ok){
                    alert(response.statusText)
                }else{
                    alert('ok!')
                }
            })
        }else if(id === "update"){
            // shitty code please dont do this
            let eventid = document.getElementById("eventId").value
            if(!eventid){
                alert('You must enter the event ID!');
                return
            }
            let locId = document.getElementById("locId").value
            let title = document.getElementById("title").value
            let starttime = document.getElementById("starttime").value
            let endtime = document.getElementById("endtime").value
            let description = document.getElementById("description").value || ""
            let presenter = document.getElementById("presenter").value
            let price = document.getElementById("price").value

            fetch("http://localhost:3000/updateEvent", {
                method: "POST",
                body: JSON.stringify({
                    "eventId": eventId,
                    "title": title,
                    "locId": locId,
                    "starttime": starttime,
                    "endtime": endtime,
                    "recurring": recurring,
                    "description": description,
                    "presenter": presenter,
                    "price": price
                })
            }).then((response) => {
                if(!response.ok){
                    alert(response.statusText)
                }else{
                    alert('ok!')
                }
            })
        }else if(id === "delete"){
            // shitty code please dont do this
            let eventid = document.getElementById("eventId").value
            if(!eventid){
                alert('You must enter the event ID!');
                return
            }
            fetch("http://localhost:3000/deleteEvent", {
                method: "POST",
                body: JSON.stringify({
                    "eventId": eventId
                })
            }).then((response) => {
                if(!response.ok){
                    alert(response.statusText)
                }else{
                    alert('ok!')
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="eventId">Event ID (This is a unqiue identifier for an event which should not be changed once created!)</label>
            <input name="eventId" id="eventId" type="number"/>
            
            <label for="locId">Location ID</label>
            <input name="locId" id="locId" type="number"/>
            

            <label for="title">Event Title</label>
            <input name="title" id="title" type="text"/>
            
            <label for="starttime">Starting time</label>
            <input name="starttime" id="starttime" type="datetime-local"></input>
            
            <label for="endtime">Ending time</label>
            <input name="endtime" id="endtime" type="datetime-local"></input>

            <label for="description">Short description of the event</label>
            <input name="description" id="description" type="text"></input>

            <label for="presenter">Presenter of the event</label>
            <input name="presenter" id="presenter" type="text"></input>

            <label for="price">Presenter of the event</label>
            <input name="price" id="price" type="text"></input>
            
            <input type="submit" id="create">New Event</input>
            <input type="submit" id="update">Update Event</input>
            <input type="submit" id="delete">Delete Event</input>

        </form>
    )
}


export default eventCRUD;