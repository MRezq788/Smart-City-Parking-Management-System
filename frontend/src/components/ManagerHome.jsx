import { useState, useEffect } from 'react';
import { Grid, Container, Paper, Box, IconButton, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ParkingLotList from './ParkingLotList';
import SpotList from './SpotList';
import SpotDetails from './SpotDetails';
import NewParkingLotForm from './NewParkingLotForm';
import NotificationList from './NotificationList';

const mockReservations = [
    {
      id: 1,
      date: '2024-12-01', // Format: YYYY-MM-DD
      start_hour: '8', // 8 AM
      duration: 2, // 2 hours
    },
    {
      id: 2,
      date: '2024-12-01',
      start_hour: '2024-12-01T14:00:00', // 2 PM
      duration: 3, // 3 hours
    },
    {
      id: 3,
      date: '2024-12-02',
      start_hour: '2024-12-02T10:00:00', // 10 AM
      duration: 1, // 1 hour
    },
    {
      id: 4,
      date: '2024-12-03',
      start_hour: '2024-12-03T15:00:00', // 3 PM
      duration: 4, // 4 hours
    },
    {
      id: 5,
      date: '2024-12-03',
      start_hour: '2024-12-03T09:00:00', // 9 AM
      duration: 1.5, // 1.5 hours
    },
  ];
const mockParkingLots = [
  {
    name: "Downtown Parking2",
    longitude: -70,
    latitude: 52,
    capacity: 30,
    original_price: 15,
    dynamic_weight: 1,
    disabled_discount: 0.5,
    ev_fees: 0.1,
    spots: Array(30).fill().map((_, i) => ({
      id: i,
      type: i < 10 ? 'disabled' : i < 20 ? 'ev' : 'regular',
      status: i < 10 ? 'available' : i < 20 ? 'reserved' : 'occupied',
      reservations: mockReservations
    }))
  },
  {
    name: "Sporting Parking2",
    longitude: -70,
    latitude: 50.7128,
    capacity: 100,
    original_price: 15,
    dynamic_weight: 1,
    disabled_discount: 0.5,
    ev_fees: 0.3,
    spots: Array(2000).fill().map((_, i) => ({
      id: i,
      type: i < 5 ? 'disabled' : i < 15 ? 'ev' : 'regular',
      status: i < 10 ? 'available' : i < 20 ? 'reserved' : 'occupied',
      reservations: []
    }))
  },
  {
    name: "Sidi Gaber Parking2",
    longitude: -74.006,
    latitude: 40.7128,
    capacity: 10,
    original_price: 15,
    dynamic_weight: 1,
    disabled_discount: 0.5,
    ev_fees: 0.1,
    spots: Array(10).fill().map((_, i) => ({
      id: i,
      type: i < 7 ? 'regular' : i < 8 ? 'disabled' : 'ev',
      status: i < 5 ? 'available' : i < 7 ? 'reserved' : 'occupied',
      reservations: []
    }))
  },
  
];


function ManagerHome() {


  const fetchManagerLots = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const id = sessionStorage.getItem('userId');

      const response = await fetch(`http://localhost:8080/manager/${id}/parkinglots`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setParkingLots(data);
    } catch (error) {
      console.error('Error fetching parking lots:', error);
    }
  };
  const addNewLot = async (newLot) => {
    const id = sessionStorage.getItem('userId');
    const lot = {
      manager_id: id,
      capacity: newLot.capacity,
      disabled_discount: newLot.disabled_discount,
      dynamic_weight: 1,
      ev_fees: newLot.ev_fees,
      latitude: newLot.latitude,
      longitude: newLot.longitude,
      name: newLot.name,
      original_price: newLot.original_price,
      spots:newLot.spots,
    }
    // console.log(lot);
    try {
      const token = sessionStorage.getItem('token');
      console.log(token);
      console.log(lot);

      const url = `http://localhost:8080/manager/add/lot`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lot),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Lot Added successful:', data);

    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };


  useEffect(() => {
    fetchManagerLots();
    // Fetch notifications from the server
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('userId');
        fetch(`http://localhost:8080/notifications/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setNotifications(data))
          .catch((error) => console.error('Error fetching notifications:', error));
  },[notifications]);

  const [parkingLots, setParkingLots] = useState(mockParkingLots);
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isSpotDetailsOpen, setIsSpotDetailsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
   const [showNotifications, setShowNotifications] = useState(false);

  const handleLotSelect = (lot) => {
    setSelectedLot(lot);
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotDetailsOpen(true);
  };

  const handleNewLotSubmit = (newLot) => {
    setParkingLots([...parkingLots, newLot]);
    addNewLot(newLot);

  };

  const toggleNotificationList = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Blue Bar */}
      <Box
        sx={{
          backgroundColor: '#162852',
          color: 'white',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Smart City Parking - Manager</Typography>
        <IconButton color="inherit" onClick={toggleNotificationList}>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              maxHeight: 400,
              overflowY: 'auto',
            }}
          >
            <ParkingLotList
              parkingLots={parkingLots}
              onLotSelect={handleLotSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <NewParkingLotForm onSubmit={handleNewLotSubmit} />
        </Grid>
        {selectedLot && (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                maxHeight: 770,
                overflowY: 'auto',
              }}
            >
              <h2>{selectedLot.name} - Parking Spots</h2>
              <SpotList
                spots={selectedLot.spots}
                onSpotSelect={handleSpotSelect}
              />
            </Paper>
          </Grid>
        )}

        {/* Notifications */}
        {showNotifications && (
          <Grid item xs={12}>
            <NotificationList notifications={notifications} />
          </Grid>
        )}
      </Grid>

      <SpotDetails
        lot={selectedLot}
        spot={selectedSpot}
        open={isSpotDetailsOpen}
        onClose={() => setIsSpotDetailsOpen(false)}
        onReserve={() => setIsSpotDetailsOpen(false)}
        isDriver={false}
      />
    </Container>
  );
}

export default ManagerHome;
