import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionDetails, setTransactionDetails] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/transactions', {
                headers: { Authorization:  },
            });
            setTransactions(response.data);
        };

        fetchTransactions();
    }, []);

    const handleNewTransaction = async () => {
        const transactionAmount = parseFloat(prompt('Enter transaction amount:'));
        const isOfficial = confirm('Is this an official transaction? (OK for Yes, Cancel for No)');
        if (transactionDetails) {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/verify-transaction', {
                transaction_amount: transactionAmount,
                is_official: isOfficial ? 1 : 0,
            }, {
                headers: { Authorization:  },
            });

            if (response.data.is_phishing) {
                alert('High-risk transaction detected!');
                // Add alert to alerts component
            } else {
                await axios.post('http://localhost:3000/api/transactions', {
                    details: transactionDetails,
                    transaction_amount: transactionAmount,
                    is_official,
                }, {
                    headers: { Authorization:  },
                });
                setTransactions([...transactions, { details: transactionDetails, transaction_amount: transactionAmount, is_official }]);
            }
        }
    };

    return (
        <div>
            <h2>Transactions</h2>
            <button onClick={handleNewTransaction}>New Transaction</button>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>{transaction.details}</li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
