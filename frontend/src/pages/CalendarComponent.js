import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
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
  const [cookies, removeCookie] = useCookies(['jwt']);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState([]);

  // Function to log out the user
  const logOut = () => {
    removeCookie('jwt');
    navigate('/Login');
  };

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Modified API endpoint to match the updated backend route
        const response = await axios.get('http://localhost:3500/events', {
          withCredentials: true,
        });
        setAllEvents(response.data);
      } catch (error) {
        console.error('Could not fetch events:', error);
      }
    };

    fetchEvents();
  }, [navigate]); // Added navigate to dependency array for strict mode compliance

  // Function to handle adding new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      // Handle validation error, e.g., show an error message.
      return;
    }

    // Formatted dates to ISO string to ensure compatibility with JSON transmission
    const event = {
      title: newEvent.title,
      start: new Date(newEvent.start).toISOString(),
      end: new Date(newEvent.end).toISOString(),
    };

    axios
      .post('http://localhost:3500/events/add', event, { // Updated endpoint to the new backend route
        withCredentials: true,
      })
      .then((response) => {
        setAllEvents([...allEvents, response.data]);
        setNewEvent({ title: '', start: '', end: '' });
      })
      .catch((error) => {
        console.error('Could not save the event:', error);
      });
  };

  // User verification useEffect
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/Login');
      } else {
        try {
          // The endpoint here seems to be missing specific path, assuming it is for user verification, it should point to a specific backend verification endpoint
          const response = await axios.post(
            'http://localhost:3500/verify', // Assuming 'verify' is the endpoint for verification
            {},
            {
              withCredentials: true,
            }
          );

          if (!response.data.status) {
            logOut(); // Call the logOut function to remove the cookie and navigate to the login page
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    verifyUser();
  }, [cookies.jwt, navigate]); // Added navigate to dependency array

  return (
    <>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: '20%', marginRight: '10px' }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: '10px' }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </>
  );
}

export default CalendarComponent;
