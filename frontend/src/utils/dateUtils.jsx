import { addHours, isBefore, isAfter, isEqual, isSameDay } from 'date-fns';

export function hasTimeConflict(existingReservations, newReservation) {
  const newStartTime = new Date(newReservation.start_hour);
  const newEndTime = addHours(newStartTime, newReservation.duration);

  return existingReservations.some(reservation => {
    const existingStartTime = new Date(reservation.start_hour);
    const existingEndTime = addHours(existingStartTime, reservation.duration);

    if (!isSameDay(reservation.date, newReservation.date)) {
      return false;
    }

    // Check if the new reservation's time overlaps with an existing reservation's time (exclusive boundaries)
    return (
      // If new reservation's start or end time falls within the existing reservation's exclusive time
      (isAfter(newStartTime, existingStartTime) && isBefore(newStartTime, existingEndTime)) ||
      (isAfter(newEndTime, existingStartTime) && isBefore(newEndTime, existingEndTime)) ||
      // If existing reservation's time falls within the new reservation's exclusive time
      (isAfter(existingStartTime, newStartTime) && isBefore(existingStartTime, newEndTime)) ||
      (isAfter(existingEndTime, newStartTime) && isBefore(existingEndTime, newEndTime)) ||
      // Prevent exact match where new start time is the same as the existing reservation's start time
      isEqual(newStartTime, existingStartTime) ||
      // Prevent exact match where new end time is the same as the existing reservation's end time
      isEqual(newEndTime, existingEndTime)
    );
  });
}