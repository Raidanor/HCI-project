
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./pages.css";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CalendarComponent() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['jwt']);
    const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });
    const [allEvents, setAllEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // Event Handlers
    // Make sure when adding new events we are using _id over id, 
    // In mongoDB it since I didn't create an ID field it creates one and we have to 
    // use that to get at it
    const handleAddOrUpdateEvent = async () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            return;
        }

        // Update event if selectedEvent is set, otherwise add a new event
        const url = selectedEvent ? `http://localhost:3500/events/${selectedEvent._id}` : 'http://localhost:3500/events';
        const method = selectedEvent ? 'put' : 'post';

        axios({
            method: method,
            url: url,
            data: newEvent,
            headers: {
                Authorization: `Bearer ${cookies.jwt}`,
            },
        }).then((response) => {
            if (selectedEvent) {
                setAllEvents(allEvents.map(event => event._id === selectedEvent._id ? response.data : event));
            } else {
                setAllEvents([...allEvents, response.data]);
            }
            setNewEvent({ title: "", start: new Date(), end: new Date() });
            setSelectedEvent(null);
        }).catch((error) => {
            console.error('Could not save the event:', error);
        });
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;

        axios.delete(`http://localhost:3500/events/${selectedEvent._id}`, {
            headers: {
                Authorization: `Bearer ${cookies.jwt}`,
            },
        }).then(() => {
            setAllEvents(allEvents.filter(event => event._id !== selectedEvent._id));
            setSelectedEvent(null);
        }).catch((error) => {
            console.error('Could not delete the event:', error);
        });
    };

    const handleSelectEvent = (event) => {
        setEditMode(true);
        setSelectedEvent(event);
        setNewEvent({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
        });
    };

    const resetForm = () => {
        setEditMode(false);
        setSelectedEvent(null);
        setNewEvent({ title: "", start: new Date(), end: new Date() });
    };

    // Fetch Events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3500/events', {
                    headers: {
                        Authorization: `Bearer ${cookies.jwt}`,
                    },
                });
                setAllEvents(response.data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                })));
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                } else {
                    console.error("Could not fetch events:", error);
                }
            }
        };

        if (cookies.jwt) {
            fetchEvents();
        } else {
            navigate("/login");
        }
      }
    };
  
    if (cookies.jwt) {
      fetchEvents();
    } else {
      navigate("/Login");
    }
  }, [cookies.jwt, navigate]);

  return (
    <>
        <div className= "container">
        {/* <div className="row center"><h1 className="mx-auto">Calendar</h1></div> */}
        {/* <div><h1 className="calendartext">Calendar</h1></div> */}
        <div className="parent">
        {/* <div className="row"><h2 className="mx-auto">Add New Event</h2></div> */}
        <div><h2 className="child addtasktext">Add New Event</h2></div>
        {/* <div className="row">
        </div> */}
        <div>
            <input
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="child"
            />
        </div>
        {/* <div className="row ">
            <div className="col-6">
            <DatePicker
            placeholderText="Start Date"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            className="leftbox"
            />
            </div> */}

          {/* <div className="row ">
            <div className="col-6">
            <DatePicker
            placeholderText="Start Date"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            className="leftbox"
            />
            </div> */}

            
            <DatePicker
            placeholderText="Start Date"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            className="child"
            />
            

            {/* <div className="col-6 align-end">
            <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
            </div> */}

            
            <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            className="child"
            />
            

            
        
        {/* <div className="row">
            <button onClick={handleAddEvent} className="w-50 mx-auto">
            Add Event
            </button> */}

            <div className="row">
            <button onClick={handleAddEvent} className="button3">
            Add Event
            
            </div>
            <div className="row ">
            <div className="col-6">
                <DatePicker
                placeholderText="Start Date"
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
                className="leftbox"
                />
            </div>
    
            <div className="col-6 align-end">
                <DatePicker
                placeholderText="End Date"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
            </div>
            </div>
            <div className="row">
            <button onClick={handleAddOrUpdateEvent} className="btn btn-primary w-50 mx-auto">
                {editMode ? 'Update Event' : 'Add Event'}

            </button>
            {editMode && (
                <button onClick={resetForm} className="btn btn-secondary w-50 mx-auto">
                Cancel
                </button>
            )}
            </div>
            {selectedEvent && (
            <div className="row mt-2">
                <button onClick={handleDeleteEvent} className="btn btn-danger w-50 mx-auto">
                Delete Event
                </button>
            </div>
            )}
        </div>

        <Calendar

            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}

            onSelectEvent={handleSelectEvent}
        />
        </>
    );

}

export default CalendarComponent;
