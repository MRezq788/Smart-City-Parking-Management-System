import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

function ParkingLotList({ parkingLots, onLotSelect }) {
  return (
    <List>
      {parkingLots.map((lot) => (
        <ListItem key={lot.name} disablePadding>
          <ListItemButton onClick={() => onLotSelect(lot)}>
            <ListItemText
              primary={lot.name}
              secondary={`Capacity: ${lot.capacity} | Regular price: $${lot.original_price}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default ParkingLotList;