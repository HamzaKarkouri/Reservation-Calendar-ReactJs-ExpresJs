
import React, { useState, useEffect } from 'react';
import axios from 'axios';





import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';


const Calendar = () => {
  

 

  const workers = [
    { id: 'Worker 1', title: 'Worker 1' },
    { id: 'worker2', title: 'Worker 2' },
    { id: 'worker3', title: 'Worker 3' },
  ];
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3007/api/events'); // Replace with your API endpoint
      
      setEvents(response.data);
      
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const workerEvents = events.reduce((acc, event) => {
    if (!acc[event.worker]) {
      acc[event.worker] = [];
    }
    const start1=new Date(event.start);
    const end1=new Date(event.end);
    acc[event.worker].push({
      id: event.worker,
      title: event.title,
      start: '2023-05-18T12:00:00',
      end: '2023-05-18T12:00:00',
    });
    return acc;
  }, {});
  
  const calendarEvents = workers.flatMap((worker) => {
    const workerId = worker.id;
    
    return workerEvents[workerId] ? workerEvents[workerId].map((event) => ({
     
      ...event,
      resourceId: workerId,
    })) : [];
  });
  
  

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Daily Calendar</h1>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, resourceTimelinePlugin]}
          initialView="resourceTimelineDay"
          nowIndicator
          slotDuration={{ hours: 1 }}
          slotLabelInterval={{ hours: 1 }}
          slotMinTime="10:00:00"
          slotMaxTime="18:00:00"
          headerToolbar={{
            left: '',
            center: 'title',
            right: '',
          }}
          resources={workers}
          events={calendarEvents}
          resourceAreaHeaderContent=""
        />
      </div>
    </div>
  );
};

export default Calendar;
