import { use, useState, useEffect } from 'react';
import { Grid, Container, Paper } from '@mui/material';
import ParkingMap from './ParkingMap';
import ParkingLotList from './ParkingLotList';
import SpotList from './SpotList';
import ReservationModal from './ReservationModal';
import SpotDetails from './SpotDetails';
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
  });

  const [parkingLots, setParkingLots] = useState(mockParkingLots);
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpotDetailsOpen, setIsSpotDetailsOpen] = useState(false);
  const [reservationError, setReservationError] = useState('');

  const handleLotSelect = (lot) => {
    setSelectedLot(lot);
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsSpotDetailsOpen(true);
  };

  const handleReservation = (reservation) => {
    // Check for time conflicts
    if (hasTimeConflict(selectedSpot.reservations, reservation)) {
      setReservationError('This time slot conflicts with an existing reservation');
      return;
    }

    
    if (!selectedLot) return;
    // Update spot's reservations
    const updatedSpots = selectedLot.spots.map(spot => {
      if (spot.id === selectedSpot.id) {
        // Check if the selected spot is available
        if (spot.status != 'occupied') {
          return { 
            ...spot, 
            reservations: [...spot.reservations, reservation], 
            status: 'reserved' 
          };
        } else {
          return { 
            ...spot, 
            reservations: [...spot.reservations, reservation]
          };
        }
      }
      return spot;
    });

  
    setSelectedLot({ ...selectedLot, spots: updatedSpots });

    const url = `localhost:8080/driver/reserve/spot/${selectedSpot.id}`;
    fetch(url, {
        method: 'POST', // Explicitly specify the request method
        body: JSON.stringify(reservation)
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .catch((error) => console.error('Error submiting reservation:', error));
    
    

    setReservationError('');
    setIsModalOpen(false);
    setIsSpotDetailsOpen(false);
  };

  const handleMakeReservation = () => {
    setReservationError('');
    setIsSpotDetailsOpen(false);
    setIsModalOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              maxHeight: 400, // Adjust the height limit as needed
              overflowY: 'auto', // Enable vertical scrolling
            }}
          >
            <ParkingLotList
              parkingLots={parkingLots}
              onLotSelect={handleLotSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ParkingMap
              parkingLots={parkingLots}
              onLotSelect={handleLotSelect}
            />
          </Paper>
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
      </Grid>

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