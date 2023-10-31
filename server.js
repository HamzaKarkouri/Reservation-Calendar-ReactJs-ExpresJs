const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });







const User = require('./Models/User.js'); 


const user = new User({
  username: 'hamzakarkouri',
  password: '123',
  name: 'Hamza Karkouri',
  
}); 

/* Save the event to the collection
user.save()
  .then(saveduser => {
    console.log('User saved successfully:', saveduser);
  })
  .catch(err => {
    console.error('Error saving user:', err);
  });  */


const eventsRouter = require('./Routes/Calendarroutes');
const workerRouter = require('./Routes/workersroutes');
const loginRouter = require('./Routes/loginroutes');
app.use(express.json());


app.use('/api', eventsRouter);
app.use('/wor', workerRouter);
app.use('/log', loginRouter);
const port = 3008;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});