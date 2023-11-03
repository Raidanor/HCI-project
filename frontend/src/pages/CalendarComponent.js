
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

    // Pretty evident what this does, when the form needs to be cleared this function will clear out the data!
    const resetForm = () => {
        setEditMode(false);
        setSelectedEvent(null);
        setNewEvent({ title: "", start: new Date(), end: new Date() });
    };

    // Fetch Events, using the Bearer's jwt token, it will look for any events
    // related to the user before populating the calendar.
    // Using the token allows for the indivivual to see only their own
    // saved events
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
}, [cookies.jwt, navigate]);

// The edit mode is a state variable, when an already created event is created and clicked on edit mode will be enable
// This prefilles out the information about the event using backend calles and allows the user to change the information
// Turns out you need to enclude a PUT request to use, learned that the hard way.
return (
    <>
        <div className="container mt-3">
            <h3 className="mb-3">Manage Your Events</h3>
            <form onSubmit={handleAddOrUpdateEvent}>
                <div className="form-row align-items-end">
                    <div className="form-group col-md-3">
                        <label htmlFor="eventTitle">Title</label>
                        <input
                            id="eventTitle"
                            type="text"
                            placeholder="Add Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    
                    <div className="form-group col-md-3">
                        <label htmlFor="startDate">Start Date</label>
                        <DatePicker
                            id="startDate"
                            placeholderText="Start Date"
                            selected={newEvent.start}
                            onChange={(start) => setNewEvent({ ...newEvent, start })}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="endDate">End Date</label>
                        <DatePicker
                            id="endDate"
                            placeholderText="End Date"
                            selected={newEvent.end}
                            onChange={(end) => setNewEvent({ ...newEvent, end })}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <button type="submit" className="btn btn-primary"> {editMode ? 'Update Event' : 'Add Event'} </button>
                        {editMode && (
                            <button type="button" onClick={resetForm} className="btn btn-secondary ml-2">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {selectedEvent && (
                <div className="mt-3">
                    <button onClick={handleDeleteEvent} className="btn btn-danger">
                        Delete Event
                    </button>
                </div>
            )}

            <div className="mt-5">
                <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </div>
    </>
);
}
export default CalendarComponent;

