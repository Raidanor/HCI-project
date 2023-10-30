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
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);

  function handleAddEvent() {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      // Handle validation error, e.g., show an error message.
      return;
    }

    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    const event = {
      title: newEvent.title,
      start: startDate,
      end: endDate,
    };

    axios.post('http://localhost:3500/events', event, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
    .then((response) => {
      setAllEvents([...allEvents, response.data]);
      setNewEvent({ title: "", start: "", end: "" });
    })
    .catch((error) => {
      console.error('Could not save the event:', error);
    });
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3500/events', {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setAllEvents(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/Login");
        } else {
          console.error("Could not fetch events:", error);
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
        <div className="row center"><h1 className="mx-auto">Calendar</h1></div>
        <div className="row"><h2 className="mx-auto">Add New Event</h2></div>

        <div className="row">
            <input
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-25 mx-auto"
            />
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
            <button onClick={handleAddEvent} className="w-50 mx-auto">
            Add Event
            </button>
        </div>
        
        <div class="row">
            <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            />
        </div>
        </div>
    </>
  );
}

export default CalendarComponent;
