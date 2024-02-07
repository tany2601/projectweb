const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy database to store user data
let userData = "lohith";

// Endpoint to register user
app.post('/register', (req, res) => {
  const { userName } = req.body;
  if (!userName || userName.trim() === '') {
    return res.status(400).send('Please provide a valid username.');
  }
  data = userData ==userName;
  if(data){
  return res.sendStatus(200);
  }
  else{
    return res.sendStatus(404);
  }
});

// Endpoint to setup machine
app.post('/setup', (req, res) => {
  const { userName, machineName, machineType } = req.body;
  if (!userName || !machineName || !machineType) {
    return res.status(400).send('Invalid setup data.');
  }
  if (!userData[userName]) {
    return res.status(404).send('User not found.');
  }
  userData[userName].machineName = machineName;
  userData[userName].machineType = machineType;
  res.sendStatus(200);
});

// Endpoint to receive sensor data
app.post('/data', (req, res) => {
  const { userName, temperature, vibration, runtime } = req.body;
  if (!userName || !temperature || !vibration || !runtime) {
    return res.status(400).send('Invalid sensor data.');
  }
  if (!userData[userName]) {
    return res.status(404).send('User not found.');
  }
  // Save sensor data to database or perform any desired operation
  console.log('Received sensor data:', req.body);
  res.sendStatus(200);
});

// Endpoint to fetch sensor data based on user
app.get('/data', (req, res) => {
  const { userName } = req.query;
  if (!userName || !userData[userName]) {
    return res.status(404).send('User not found.');
  }
  // Retrieve sensor data from database based on user (not implemented in this example)
  // For simplicity, returning dummy data
  const sensorData = [
    { temperature: 25.5, vibration: 0, runtime: 3600 },
    { temperature: 26.0, vibration: 1, runtime: 7200 }
  ];
  res.json(sensorData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
