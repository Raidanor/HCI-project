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
    allDay: false, 
    start: new Date(2023, 9, 13),
    end: new Date(2023, 9, 13)
  },
  {
    title: "Vacation",
    allDay: false, 
    start: new Date(2023, 9, 17),
    end: new Date(2023, 9, 20)
  },
  {
    title: "Conference",
    allDay: false, // Set this to false
    start: new Date(2023, 9, 15),
    end: new Date(2023, 9, 16)
  },
];


function CalendarComponent() {
  const nav = useNavigate();
    const [cookies, removeCookie] = useCookies([]); 
    const logOut = () => {
        removeCookie("jwt"); 
        nav("/Login"); 
    };

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    // Validate date inputs
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      // Handle validation error, e.g., show an error message.
      return;
    }
  
    // Convert date strings to Date objects
    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);
  
    // Create the new event object
    const event = {
      title: newEvent.title,
      start: startDate,
      end: endDate,
    };
  
    // Update the events array
    setAllEvents([...allEvents, event]);
  
    // Clear the input fields or set newEvent to its initial state
    setNewEvent({ title: "", start: "", end: "" });
  }
  

  useEffect(() => {
    const verifyUser = async () => {
        if (!cookies.jwt) {
            nav("/Login");
        } else {
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
    <>
        <div class = "container">
        <div class="row center"><h1 class="mx-auto">Calendar</h1></div>
        <div class="row"><h2 class="mx-auto">Add New Event</h2></div>

        <div class="row">
            <input
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            class="w-25 mx-auto"
            />
        </div>
        <div class="row ">
            <div class="col-6">
            <DatePicker
            placeholderText="Start Date"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            class="leftbox"
            />
            </div>

            <div class="col-6 align-end">
            <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
            </div>
        </div>
        <div class="row">
            <button onClick={handleAddEvent} class="w-50 mx-auto">
            Add Event
            </button>
        </div>
        </div>

        <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "50px" }}
      />
    </>
  );
}

export default CalendarComponent;