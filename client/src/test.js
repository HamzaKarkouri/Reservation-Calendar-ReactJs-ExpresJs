import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');

  useEffect(() => {
    fetchEvents(selectedDay);
  }, [selectedDay]);

  const fetchEvents = async (date) => {
    try {
      const response = await fetch(`/calendar/${date}`); // Replace with the appropriate route
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleNewEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newEventTitle, start: selectedDay, end: selectedDay }),
      });
      const data = await response.json();
      setEvents([...events, data]);
      setNewEventTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Calendar</h1>
      <div>
        <h3>Select a day:</h3>
        <input type="date" value={selectedDay} onChange={(e) => handleDayChange(e.target.value)} />
      </div>

      <div>
        <h3>Create New Event:</h3>
        <form onSubmit={handleNewEventSubmit}>
          <input type="text" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} />
          <button type="submit">Add Event</button>
        </form>
      </div>

      {/* Render your calendar UI and events */}
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>Start: {event.start}</p>
          <p>End: {event.end}</p>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
