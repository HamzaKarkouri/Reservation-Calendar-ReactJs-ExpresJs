const express = require('express');
const router = express.Router();

const Worker = require('../Models/Worker');

router.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    console.log(workers);
    res.status(200).json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/workers', async (req, res) => {
  try {
    const { name, phone,position } = req.body;

    const newworker = new Worker({
      name,
      phone,
      position,
    
    });

    const createdWorker = await newworker.save();
    res.status(201).json(createdWorker);
  } catch (error) {
    console.error('Error creating worker:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




router.delete('/workers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Worker.findByIdAndRemove(id);
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    console.error('Error deleting worker:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



router.put('/workers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, position } = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { name, phone, position },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error('Error updating worker:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});










module.exports = router;
