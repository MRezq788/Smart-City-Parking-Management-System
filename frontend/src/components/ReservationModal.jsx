import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { startOfToday, isToday } from 'date-fns';

function ReservationModal({ open, onClose, spot, onReserve, error }) {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState('');
  
  // Get the current date and time
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  
  // Function to check if the selected date is today and if time is valid
  const handleTimeChange = (newTime) => {
    // If the selected date is today and the chosen hour is before the current hour
    if (isToday(date) && newTime.getHours() < currentHour) {
      setStartTime(null); // Clear the time field
      return; // Prevent setting the invalid time
    }
    setStartTime(newTime); // Otherwise, set the time
  };

  const handleReserve = () => {
    if (!date || !startTime || !duration) return;

    const reservation = {
      date: date,
      startTime: startTime,
      duration: parseInt(duration),
    };

    onReserve(reservation);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Make a Reservation</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            minDate={startOfToday()}
            sx={{ mt: 2, width: '100%' }}
          />
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={handleTimeChange}
            ampm={false}   // Disable AM/PM, use 24-hour format
            views={['hours']}  // Limit the picker to hours
            sx={{ mt: 2, width: '100%' }}
          />
          <TextField
            label="Duration (hours)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleReserve}
            disabled={!date || !startTime || !duration}
          >
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default ReservationModal;
