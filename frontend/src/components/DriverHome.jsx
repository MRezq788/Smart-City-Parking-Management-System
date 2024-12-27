import { useState, useEffect } from 'react';
import { Grid, Container, Paper, Box, IconButton, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ParkingMap from './ParkingMap';
import ParkingLotList from './ParkingLotList';
import SpotList from './SpotList';
import ReservationModal from './ReservationModal';
import SpotDetails from './SpotDetails';
import NotificationList from './NotificationList';
import { hasTimeConflict } from '../utils/dateUtils';

const mockReservations = [
  {
    id: 1,
    date: '2024-12-01', // Format: YYYY-MM-DD
    startTime: '8', // 8 AM
    duration: 2, // 2 hours
  },
  {
    id: 2,
    date: '2024-12-01',
    startTime: '2', // 2 PM
    duration: 3, // 3 hours
  },
];

const mockParkingLots = [
  {
    name: "Downtown Parking",
    longitude: 31.2,
    latitude: 29.9,
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
    name: "Sporting Parking",
    longitude: 31,
    latitude: 29.5,
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
    name: "Sidi Gaber Parking",
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

function DriverHome() {
  useEffect(() => {
    // Fetch parking lots from the server
    const url = 'localhost:8080/driver/parkinglots';
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
        
    //Fetch notifications from the server
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


  const [parkingLots, setParkingLots] = useState(mockParkingLots);
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpotDetailsOpen, setIsSpotDetailsOpen] = useState(false);
  const [reservationError, setReservationError] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLotSelect = (lot) => {
    setSelectedLot(lot);
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotDetailsOpen(true);
  };

  const handleReservation = (reservation) => {
    if (hasTimeConflict(selectedSpot.reservations, reservation)) {
      setReservationError('This time slot conflicts with an existing reservation');
      return;
    }

    if (!selectedLot) return;
    const updatedSpots = selectedLot.spots.map(spot => {
      if (spot.id === selectedSpot.id) {
        if (spot.status !== 'occupied') {
          return { ...spot, reservations: [...spot.reservations, reservation], status: 'reserved' };
        } else {
          return { ...spot, reservations: [...spot.reservations, reservation] };
        }
      }
      return spot;
    });

    setSelectedLot({ ...selectedLot, spots: updatedSpots });

    const url = `localhost:8080/driver/reserve/spot/${selectedSpot.id}`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reservation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error('Error submitting reservation:', error));

    setReservationError('');
    setIsModalOpen(false);
    setIsSpotDetailsOpen(false);
  };

  const handleMakeReservation = () => {
    setReservationError('');
    setIsSpotDetailsOpen(false);
    setIsModalOpen(true);
  };

  const toggleNotificationList = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Blue Bar */}
      <Box sx={{
        backgroundColor: '#162852',
        color: 'white',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Smart City Parking</Typography>
        <IconButton color="inherit" onClick={toggleNotificationList}>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Parking Lot and Spot Management */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}>
            <ParkingLotList parkingLots={parkingLots} onLotSelect={handleLotSelect} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ParkingMap parkingLots={parkingLots} onLotSelect={handleLotSelect} />
          </Paper>
        </Grid>

        {/* Parking Spots */}
        {selectedLot && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, maxHeight: 770, overflowY: 'auto' }}>
              <h2>{selectedLot.name} - Parking Spots</h2>
              <SpotList spots={selectedLot.spots} onSpotSelect={handleSpotSelect} />
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

      {/* Modals */}
      <SpotDetails
        lot={selectedLot}
        spot={selectedSpot}
        open={isSpotDetailsOpen}
        onClose={() => setIsSpotDetailsOpen(false)}
        onReserve={handleMakeReservation}
        isDriver={true}
      />

      <ReservationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        spot={selectedSpot}
        onReserve={handleReservation}
        error={reservationError}
      />
    </Container>
  );
}

export default DriverHome;
