import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function LocationSelector({ onLocationSelect }) {
  const [position, setPosition] = useState([30.033333, 31.233334]); // Initial view at Egypt

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function NewParkingLotForm({ onSubmit }) {
  const [location, setLocation] = useState([30.033333, 31.233334]);
  const [lotName, setLotName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [disabledDiscount, setDisabledDiscount] = useState('');
  const [evFees, setEvFees] = useState('');
  const [regularSpots, setRegularSpots] = useState('');
  const [disabledSpots, setDisabledSpots] = useState('');
  const [evSpots, setEvSpots] = useState('');

  const handleSubmit = () => {
    const totalSpots = parseInt(regularSpots) + parseInt(disabledSpots) + parseInt(evSpots);
    if (totalSpots !== parseInt(capacity)) {
      alert('The sum of regular, disabled, and EV spots must equal the capacity.');
      return;
    }
    if (disabledDiscount < 0 || disabledDiscount > 1 || evFees < 0 || evFees > 1) {
      alert('Disabled discount and EV fees must be numbers in the range [0,1].');
      return;
    }

    const spots = [
      ...Array(parseInt(regularSpots)).fill().map((_, i) => ({ spot_id: i, type: 'regular', status: 'available', reservations: [] })),
      ...Array(parseInt(disabledSpots)).fill().map((_, i) => 
        ({ spot_id: i + parseInt(regularSpots), type: 'disabled', status: 'available', reservations: [] })),
      ...Array(parseInt(evSpots)).fill().map((_, i) => 
        ({ spot_id: i + parseInt(regularSpots) + parseInt(disabledSpots), type: 'ev', status: 'available', reservations: [] })),
    ];

    const newLot = {
      name: lotName,
      longitude: location[1],
      latitude: location[0],
      capacity: parseInt(capacity),
      original_price: parseFloat(price),
      dynamic_weight: 1,
      disabled_discount: parseFloat(disabledDiscount),
      ev_fees: parseFloat(evFees),
      spots: spots,
    };

    onSubmit(newLot);

    // Clear form values
    setLotName('');
    setCapacity('');
    setPrice('');
    setDisabledDiscount('');
    setEvFees('');
    setRegularSpots('');
    setDisabledSpots('');
    setEvSpots('');

    const url = 'http://localhost:8080/manager/add/lot';
    const token = sessionStorage.getItem('token');
    // fetch(url, {
    //   method: 'POST', // Explicitly specify the request method
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newLot),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //  .catch((error) => console.error('Error adding new lot:', error));
  };

  return (
    <Paper
      sx={{
        p: 2,
        maxHeight: 650,
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6">Add New Parking Lot</Typography>
      <MapContainer center={location} zoom={6} style={{ height: '300px', marginBottom: '20px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationSelector onLocationSelect={setLocation} />
      </MapContainer>
      <TextField
        label="Lot Name"
        fullWidth
        value={lotName}
        onChange={(e) => setLotName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Capacity"
        fullWidth
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Price"
        fullWidth
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Disabled Discount"
        fullWidth
        type="number"
        value={disabledDiscount}
        onChange={(e) => setDisabledDiscount(e.target.value)}
        margin="normal"
        inputProps={{ min: 0, max: 1, step: 0.01 }}
      />
      <TextField
        label="EV Fees"
        fullWidth
        type="number"
        value={evFees}
        onChange={(e) => setEvFees(e.target.value)}
        margin="normal"
        inputProps={{ min: 0, max: 1, step: 0.01 }}
      />
      <TextField
        label="Regular Spots"
        fullWidth
        type="number"
        value={regularSpots}
        onChange={(e) => setRegularSpots(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Disabled Spots"
        fullWidth
        type="number"
        value={disabledSpots}
        onChange={(e) => setDisabledSpots(e.target.value)}
        margin="normal"
      />
      <TextField
        label="EV Spots"
        fullWidth
        type="number"
        value={evSpots}
        onChange={(e) => setEvSpots(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Parking Lot
      </Button>
    </Paper>
  );
}

export default NewParkingLotForm;