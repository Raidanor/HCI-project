import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const locales = {
  "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [
  {
    title: "Big Meeting",
    start: new Date(2023, 9, 13),
    end: new Date(2023, 9, 13)
  },
  {
    title: "Vacation",
    start: new Date(2023, 9, 17),
    end: new Date(2023, 9, 20)
  },
  {
    title: "Conference",
    start: new Date(2023, 9, 15),
    end: new Date(2023, 9, 16)
  },
];


function CalendarComponent()
{
  const nav = useNavigate();
    const [cookies, removeCookie] = useCookies([]); 
    const logOut = () =>
    {
        removeCookie("jwt"); 
        nav("/Login"); 
    };

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent()
  {
    // Validate date inputs
    if (!newEvent.title || !newEvent.start || !newEvent.end)
    {
      // Handle validation error, e.g., show an error message.
      return;
    }
  
    // Convert date strings to Date objects
    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);
  
    // Create the new event object
    const event =
    {
      title: newEvent.title,
      start: startDate,
      end: endDate,
    };
  
    // Update the events array
    setAllEvents([...allEvents, event]);
    setAllEvents([...allEvents, events]);
    
  
    // // Clear the input fields or set newEvent to its initial state
    // setNewEvent({ title: "", start: "", end: "" });
    // setAllEvents([...allEvents, events]);

  }
  

  useEffect(() =>
  {
    const verifyUser = async () =>
    {
        if (!cookies.jwt)
        {
            nav("/Login");
        }
        else
        {
            try {
                const response = await axios.post("http://localhost:3500", {}, {
                    withCredentials: true,
                });

                if (!response.data.status) {
                    logOut(); // Call the logOut function to remove the cookie and navigate to the login page
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    verifyUser();
    }, [cookies.jwt, nav]);

  return (
    <div >
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

        <button onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "50px" }}
      />
    </div>
  );
}

export default CalendarComponent;