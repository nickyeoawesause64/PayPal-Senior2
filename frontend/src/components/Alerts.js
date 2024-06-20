import React, { useState, useEffect } from 'react';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);

    // Mock function to simulate adding alerts
    useEffect(() => {
        const mockAlerts = ['High-risk transaction detected.', 'Family member approval required.'];
        setAlerts(mockAlerts);
    }, []);

    return (
        <div>
            <h2>Alerts</h2>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
