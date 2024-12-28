import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button, Typography, Divider } from '@mui/material';
import { format } from 'date-fns';

function SpotDetails({ lot, spot, open, onClose, onReserve, isDriver }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (spot) {
      setReservations(spot.reservations);
    }
  }, [spot]);

  const getSpotIcon = (type) => {
    switch (type) {
      case 'disabled':
        return '♿';
      case 'ev':
        return '⚡';
      default:
        return '🅿️';
    }
  };

  const calculatePrice = () => {
    if (!lot || !spot) {
      return "Loading...";
    }

    if (spot?.type === "disabled") {
      return lot.original_price * (1 - lot.disabled_discount) * lot.dynamic_weight;
    } else if (spot?.type === "regular") {
      return lot.original_price * lot.dynamic_weight;
    } else {
      return lot.original_price * (1 + lot.ev_fees) * lot.dynamic_weight;
    }
  };

  const updateSpot = async (updatedSpot) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/manager/update/spot`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSpot),
      });
      // console.log(updatedSpot);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating spot:', error);
    }
  };

  const deleteReservation = async (reservation) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/manager/delete/reservation`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      // console.log(reservation);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating spot:', error);
    }
  };

  const handleDeleteReservation = (index) => {
    const updatedReservations = [...reservations];
    const [deletedReservation] = updatedReservations.splice(index, 1);
    setReservations(updatedReservations);

    if (updatedReservations.length === 0 && spot.status === 'reserved') {
      spot.status = 'available';
    }

    const updatedSpot = { ...spot, reservations: updatedReservations };
    // console.log(updatedSpot);
    deleteReservation(deletedReservation);
  };

  const handleToggleStatus = () => {
    if (reservations.length === 0) {
      spot.status = spot.status === 'occupied' ? 'available' : 'occupied';
    } else {
      spot.status = spot.status === 'occupied' ? 'reserved' : 'occupied';
    }

    const updatedSpot = { ...spot, reservations };
    // console.log(updatedSpot);
    updateSpot(updatedSpot);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {getSpotIcon(spot?.type)} Spot Details
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Type: {spot?.type.charAt(0).toUpperCase() + spot?.type.slice(1)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Status: {spot?.status.charAt(0).toUpperCase() + spot?.status.slice(1)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: {calculatePrice()}
        </Typography>

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Reservations
        </Typography>
        <List
          sx={{
            height: '50vh',
            maxHeight: '60vh',
            overflowY: 'auto',
          }}
        >
          {reservations.length > 0 ? (
            [...reservations]
              .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                
                if (dateA - dateB !== 0) {
                  return dateA - dateB;
                }
                
                return a.start_hour - b.start_hour;
              })
              .map((reservation, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={format(new Date(reservation.date), 'PP')}
                      secondary={`Time: ${reservation.start_hour}:00 | Duration: ${reservation.duration} hours`}
                    />
                    {!isDriver && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteReservation(index)}
                      >
                        Delete
                      </Button>
                    )}
                  </ListItem>
                  {index < reservations.length - 1 && <Divider />}
                </div>
              ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              No reservations for this spot
            </Typography>
          )}
        </List>

        {!isDriver && (
          <Button
            variant="contained"
            onClick={handleToggleStatus}
            fullWidth
            sx={{ mt: 2 }}
          >
            Toggle Status
          </Button>
        )}

        {isDriver && (
          <Button
            variant="contained"
            onClick={onReserve}
            fullWidth
            sx={{ mt: 2 }}
          >
            Make Reservation
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SpotDetails;