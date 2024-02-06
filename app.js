let userName = '';

async function registerUser() {
  userName = document.getElementById('userName').value;
  if (userName.trim() !== '') {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: userName })
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      document.getElementById('userRegistration').style.display = 'none';
      document.getElementById('machineSetup').style.display = 'block';
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed. Please try again.');
    }
  } else {
    alert('Please enter your name.');
  }
}

async function setupMachine() {
  const machineName = document.getElementById('machineName').value;
  const machineType = document.getElementById('machineType').value;

  if (machineName.trim() === '' || machineType.trim() === '') {
    alert('Please enter machine name and type.');
    return;
  }

  try {
    const response = await fetch('/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        machineName: machineName,
        machineType: machineType
      })
    });
    if (!response.ok) {
      throw new Error('Machine setup failed');
    }
    document.getElementById('machineSetup').style.display = 'none';
    document.getElementById('sensorData').style.display = 'block';
    fetchSensorData();
    setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
  } catch (error) {
    console.error('Machine setup error:', error.message);
    alert('Machine setup failed. Please try again.');
  }
}

async function fetchSensorData() {
  try {
    const response = await fetch(`/data?userName=${userName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sensor data');
    }
    const data = await response.json();
    displaySensorData(data);
  } catch (error) {
    console.error('Error fetching sensor data:', error.message);
    alert('Failed to fetch sensor data. Please try again.');
  }
}

function displaySensorData(data) {
  const sensorDataBody = document.getElementById('sensorDataBody');
  sensorDataBody.innerHTML = '';

  data.forEach(item => {
    const row = sensorDataBody.insertRow();
    row.innerHTML = `
      <td>${item.temperature}</td>
      <td>${item.vibration}</td>
      <td>${item.runtime}</td>
    `;
  });
}
