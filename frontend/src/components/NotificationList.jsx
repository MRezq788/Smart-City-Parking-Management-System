import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function NotificationList({ notifications }) {
  return (
    <div style={{ padding: '20px' }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        style={{ marginBottom: '15px', color: '#3f51b5', fontWeight: 'bold' }}
      >
        Notifications
      </Typography>
      <List style={{ backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
        {notifications.map((notification, index) => {
          // Convert the timestamp array into a valid Date object
          const timestampDate = new Date(
            notification.timestamp[0], // Year
            notification.timestamp[1] - 1, // Month (0-based)
            notification.timestamp[2], // Day
            notification.timestamp[3], // Hour
            notification.timestamp[4] // Minute
          );

          return (
            <ListItem 
              key={index} 
              style={{
                borderBottom: '1px solid #ddd',
                padding: '15px 10px',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary={notification.message}
                secondary={`Received: ${timestampDate.toLocaleString()}`}
                style={{ color: '#333' }}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default NotificationList;
