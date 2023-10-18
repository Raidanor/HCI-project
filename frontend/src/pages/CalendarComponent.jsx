import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import DatePicker from "react-datepicker";

const locales = 
{
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer(
{
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = 
[
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023,9,13),
        end: new Date(2023,9,13)
    },
    {
        title: "Vacation",
        start: new Date(2023,9,17),
        end: new Date(2023,9,20)
    },
    {
        title: "Conference ",
        start: new Date(2023,9,15),
        end: new Date(2023,9,16)
    },
    
]

export const CalendarComponent = () =>
{
    const [newEvent, setNewEvent] = useState<String(String)>( { title: null, start: null, end: null} );
    const [allEvents, setAllEvents] = useState( events );
    
    function handleAddEvent()
    {
        setAllEvents([... allEvents, newEvent])
    }

    return(
        <>
            <h1>Calendar</h1>
            <h2>Add New Event</h2>

            <div>
                <input type="text" 
                placeholder="Add Title" 
                style={ { width: "20%", marginRight: "10px" } }
                value={ newEvent.title } onChange = {(e) => setNewEvent( {...newEvent, title: e.target.value} )}
                />

                <DatePicker placeholderText="Start Date" style={ {marginRight: "10px"} }
                    selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
                />

                <DatePicker placeholderText="End Date"
                    selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
                />

                <button style={{marginTop:"10px"}} onClick={handleAddEvent}>
                    Add Event 
                </button>
            </div>
            <Calendar 
                localizer={localizer} 
                events={allEvents} 
                startAccessor="start" 
                endAccessor="end"
                style={{height: 600, margin: "50px"}}

            />


        </>
    )
}

export default CalendarComponent;