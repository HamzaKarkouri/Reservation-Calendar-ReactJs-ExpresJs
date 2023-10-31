const express = require('express');
const router = express.Router();

const Room = require('../Models/Worker');

router.get('/room', async (req, res) => {
  try {
    const Rooms = await Room.find();
    console.log(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/rooms', async (req, res) => {
  try {
    const { name, phone,position } = req.body;

    const newworker = new Event({
      name,
      phone,
      position,
    
    });

    const createdroom = await newroom.save();
    res.status(201).json(createdroom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
