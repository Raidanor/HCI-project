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
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </>
  );
}

export default CalendarComponent;
