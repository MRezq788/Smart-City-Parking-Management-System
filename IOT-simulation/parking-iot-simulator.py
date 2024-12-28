import mysql.connector
from mysql.connector import Error
import random
import time
from datetime import datetime

class ParkingIoTSimulator:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host='localhost',
            database='smart_city_db',
            user='root',
            password='Root@1234'
        )
        self.cursor = self.connection.cursor(dictionary=True)

    def get_active_lots(self):
        query = "SELECT lot_id FROM parking_lot"
        self.cursor.execute(query)
        lots = [lot['lot_id'] for lot in self.cursor.fetchall()]
        print(f"Active lots: {lots}")
        return lots

    def get_spots_in_lot(self, lot_id):
        query = "SELECT spot_id, status FROM parking_spot WHERE lot_id = %s"
        self.cursor.execute(query, (lot_id,))
        spots = self.cursor.fetchall()
        print(f"Spots in lot {lot_id}: {[spot['spot_id'] for spot in spots]}")
        return spots

    def get_reservations_for_spot(self, spot_id):
        current_date = datetime.now().date()
        query = """
        SELECT COUNT(*) as count FROM reservation 
        WHERE spot_id = %s AND date = %s AND is_arrived = 0
        """
        self.cursor.execute(query, (spot_id, current_date))
        return self.cursor.fetchone()['count']

    def update_spot_status(self, spot_id, new_status):
        query = "UPDATE parking_spot SET status = %s WHERE spot_id = %s"
        self.cursor.execute(query, (new_status, spot_id))
        self.connection.commit()
        print(f"Updated spot {spot_id} status to {new_status}")

    def simulate_sensor_update(self):
        lots = self.get_active_lots()
        selected_lot = random.choice(lots)
        print(f"Selected lot: {selected_lot}")
        spots = self.get_spots_in_lot(selected_lot)

        for spot in spots:
            print(f"Evaluating spot {spot['spot_id']} with current status {spot['status']}")
            if random.random() < 0.3:  # 30% chance to update each spot
                current_status = spot['status']
                reservations = self.get_reservations_for_spot(spot['spot_id'])

                if current_status in ('available', 'reserved'):
                    new_status = 'occupied'
                elif current_status == 'occupied':
                    if reservations > 0:
                        new_status = 'reserved'
                    else:
                        new_status = 'available'
                
                if new_status != current_status:
                    self.update_spot_status(spot['spot_id'], new_status)
                    print(f"Spot {spot['spot_id']} status changed: {current_status} -> {new_status}")

    def run(self):
        try:
            while True:
                print(f"\nSimulating sensor updates at {datetime.now()}")
                self.simulate_sensor_update()
                time.sleep(10)  # Wait for 2 minutes
        except KeyboardInterrupt:
            print("\nSimulation stopped by user")
        finally:
            self.connection.close()

if __name__ == "__main__":
    simulator = ParkingIoTSimulator()
    simulator.run()
