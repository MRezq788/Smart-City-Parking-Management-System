import { Grid, Card, CardContent, Typography } from '@mui/material';

function SpotList({ spots, onSpotSelect }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#4caf50';
      case 'occupied':
        return '#f44336';
      case 'reserved':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

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

  return (
    <Grid container spacing={2}>
      {spots.map((spot, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <Card 
            onClick={() => onSpotSelect(spot)}
            sx={{ 
              height: '100%',
              backgroundColor: getStatusColor(spot.status),
              color: 'white',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 1 }}>
                {getSpotIcon(spot.type)} Spot {index + 1}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)}
              </Typography>
              <Typography variant="body2">
                {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default SpotList;