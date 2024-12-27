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
    date: '2024-12-01',
    startTime: '8',
    duration: 2,
  },
  {
    id: 2,
    date: '2024-12-01',
    startTime: '14',
    duration: 3,
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
];

function ManagerHome() {
  const [parkingLots, setParkingLots] = useState(mockParkingLots);
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isSpotDetailsOpen, setIsSpotDetailsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Fetch parking lots from the server
    const url = 'localhost:8080/manager/parkinglots';
    fetch(url, {
        method: 'GET', // Explicitly specify the request method
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setParkingLots(data))
        .catch((error) => console.error('Error fetching parking lots:', error));      
    
    // Fetch notifications from the server
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
  });


  const handleLotSelect = (lot) => {
    setSelectedLot(lot);
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotDetailsOpen(true);
  };

  const handleNewLotSubmit = (newLot) => {
    setParkingLots([...parkingLots, newLot]);
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
