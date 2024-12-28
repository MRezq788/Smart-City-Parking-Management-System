import { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [lots, setLots] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState('drivers');
    
    const token = sessionStorage.getItem('token');

    const pageSize = 10;

    useEffect(() => {
        fetchData();
    }, [currentPage, view]);

    const fetchData = async () => {
        const endpoint = view === 'drivers' ? 'http://localhost:8080/admin/drivers' : 'http://localhost:8080/admin/lots';
        const params = `?page=${currentPage - 1}&size=${pageSize}`;
        const response = await fetch(endpoint + params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (view === 'drivers') setDrivers(data);
        else setLots(data);
    };

    const handleSearch = async () => {
        const endpoint = view === 'drivers' ? 'http://localhost:8080/admin/drivers/search' : 'http://localhost:8080/admin/lots/search';
        const params = `?key=${searchKey}&page=${currentPage - 1}&size=${pageSize}`;
        const response = await fetch(endpoint + params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (view === 'drivers') setDrivers(data);
        else setLots(data);
    };

    const handleBanUnban = async (driverId, isBanned) => {
        const endpoint = isBanned ? 'http://localhost:8080/admin/drivers/unban' : 'http://localhost:8080/admin/drivers/ban';
        await fetch(endpoint + `?driverId=${driverId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchData();
    };

    const handleDeleteLot = async (lotId) => {
        await fetch(`http://localhost:8080/admin/lots/${lotId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchData();
    };

    const handleDownload = async () => {
        try {
            const response = await fetch('http://localhost:8080/report/admin');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'adminPageDriversReport.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading the report:', error);
        }
    };

    const renderDrivers = () => (
        <div>
            {drivers.length==0 && <h1>No Drivers Found</h1>}
            {drivers.map(driver => (
                <div key={driver.id} className="card">
                    <h3>{driver.fullName} ({driver.username})</h3>
                    <p>Plate: {driver.plateNumber}</p>
                    <p>Penalties: {driver.penaltyCounter}</p>
                    <button onClick={() => handleBanUnban(driver.id, driver.isBanned)}>
                        {driver.isBanned ? 'Unban' : 'Ban'}
                    </button>
                </div>
            ))}
        </div>
    );

    const renderLots = () => (
        <div>
            {lots.length==0 && <h1>No Parking Lots Found</h1>}
            {lots.map(lot => (
                <div key={lot.lotId} className="card">
                    <h3>{lot.name}</h3>
                    <p>Manager: {lot.lotManagerUsername}</p>
                    <button onClick={() => handleDeleteLot(lot.lotId)}>Delete</button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="admin-dashboard">
            <div className="header">
                <button className={view === 'drivers' ? 'active' : ''} onClick={() => setView('drivers')}>Drivers</button>
                <button className={view === 'lots' ? 'active' : ''} onClick={() => setView('lots')}>Parking Lots</button>
                <button onClick={handleDownload}>Download Report</button>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {view === 'drivers' ? renderDrivers() : renderLots()}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={view=="drivers"&&drivers.length<pageSize || view=="lots"&&lots.length<pageSize}>Next</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
