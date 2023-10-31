import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form,Table } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
const Calendar = () => {
  

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEmptySlotModal, setShowEmptySlotModal] = useState(false);
  const [name, setClientName] = useState('');
  const [room, setRoom] = useState('');
  const [startTime1, setClickedDate] = useState(null);
  const [endTime1, setEndDay] = useState('');

  const calendarRef = useRef(null);
  const [id, setid] = useState('');
  const [workers, setWorkers] = useState([]);
  const [worker, setWorker] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchWorkers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:3008/wor/workers');
      const data = response.data.map(worker => ({ id: worker.name, title: worker.name }));
   
      setWorkers(data); // Set the fetched worker data directly into the workers state
     
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };
  useEffect(() => {
    const workerEvents = events.reduce((acc, event) => {
      if (!acc[event.worker]) {
        acc[event.worker] = [];
      }
      acc[event.worker].push({
        id: event._id,
        title: event.title,
        start: event.startTime,
        end: event.endTime,
        name: event.name,
        
        room: event.room,
      });
      return acc;
    }, {});

    const calendarEvents = workers.flatMap((worker) => {
      const workerId = worker.id;
      
      return workerEvents[workerId]
        ? workerEvents[workerId].map((event) => ({
            ...event,
            resourceId: workerId,
          }))
        : [];
    });

    calendarRef.current?.getApi().removeAllEventSources(); 
    calendarRef.current?.getApi().addEventSource(calendarEvents);
  }, [events, workers]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowEventModal(true);
    setRoom(info.event.extendedProps.room);
    setClientName(info.event.extendedProps.name);
    setid(info.event.id);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  const handleEmptySlotClick = (arg) => {
    setShowEmptySlotModal(true);
    setClickedDate(arg.startStr);
    setEndDay(arg.endStr);
    setWorker(arg.resource.title);
  };

  const handleCloseEmptySlotModal = () => {
    setShowEmptySlotModal(false);
    setClientName('');
      setTitle('');
      setClickedDate('');
      setEndDay('');
      setWorker('');
      
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/api/events/${id}`);
      handleCloseEventModal();
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const startTime = startTime1.substring(0, startTime1.indexOf('+'));
    const endTime = endTime1.substring(0, endTime1.indexOf('+'));
    const date = new Date();

    try {
      const response = await axios.post('http://localhost:3008/api/events', {
        name,
        title,
        date,
        startTime,
        endTime,
        worker,
        room,
      });

      console.log(response.data); 


      setClientName('');
      setTitle('');
      setClickedDate('');
      setEndDay('');
      setWorker('');
      setRoom('');

      
      handleCloseEmptySlotModal();
      fetchEvents(); 
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="container3">
      
      
        <FullCalendar
          ref={calendarRef}
          contentHeight="auto"
          plugins={[dayGridPlugin, resourceTimelinePlugin, interactionPlugin]}
          initialView="resourceTimelineDay"
          nowIndicator
          slotDuration={{ hours: 1 }}
          slotLabelInterval={{ hours: 1 }}
          slotMinTime="10:00:00"
          slotMaxTime="18:00:00"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          resources={workers}
          events={[]}
          resourceAreaHeaderContent=""
          dateClick={handleDateChange}
          eventClick={handleEventClick}
          selectable
          select={handleEmptySlotClick}
        />
      

      <Modal show={showEventModal} onHide={handleCloseEventModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Client name: {name}</p>
          <p>Room: {room}</p>
          <p>Start: {selectedEvent?.startStr}</p>
          <p>End: {selectedEvent?.endStr}</p>
        </Modal.Body>
        <Button variant="danger" onClick={() => handleDelete(id)}>
                  <BsTrash /> Delete
                </Button>
      </Modal>

      <Modal show={showEmptySlotModal} onHide={handleCloseEmptySlotModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="clientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                name="name"
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="select"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              >
                <option value="">Select a title</option>
                <option value="massage">Massage</option>
                <option value="soin de visage">Soin de visage</option>
                <option value="hammam">Hammam</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="startDay">
              <Form.Label>Start Day</Form.Label>
              <Form.Control
                type="text"
                value={startTime1}
                name="startTime"
                onChange={(e) => setClickedDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="endDay">
              <Form.Label>End Day</Form.Label>
              <Form.Control
                type="text"
                value={endTime1}
                name="endTime"
                onChange={(e) => setEndDay(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="worker">
              <Form.Label>Worker</Form.Label>
              <Form.Control
                as="select"
                value={worker}
                name="worker"
                onChange={(e) => setWorker(e.target.value)}
                required
              >
                <option value="">Select a worker</option>
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.title}>
                    {worker.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="room">
              <Form.Label>Room</Form.Label>
              <Form.Control
                type="text"
                value={room}
                name="room"
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Create Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Calendar;
