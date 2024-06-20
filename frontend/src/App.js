import React, { useState } from 'react';
import Login from './components/Login';
import Transactions from './components/Transactions';
import Alerts from './components/Alerts';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <div className="App">
            <header>
                <h1>PayPal Senior</h1>
            </header>
            <main>
                <Transactions />
                <Alerts />
            </main>
        </div>
    );
}

export default App;
