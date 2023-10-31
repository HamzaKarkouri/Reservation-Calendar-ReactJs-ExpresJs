const express = require('express');
const router = express.Router();

const Event = require('../Models/Event');

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/events', async (req, res) => {
  try {
    const { name, title,date, startTime, endTime, worker, room } = req.body;

    const newEvent = new Event({
      name,
      title,
      date,
      startTime,
      endTime,
      worker,
      room,
    });

    const createdEvent = await newEvent.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndRemove(id);
    res.status(200).json({ message: 'event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});









module.exports = router;
