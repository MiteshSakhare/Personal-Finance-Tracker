import React, { useState, useEffect } from 'react';
import { getTransactions, createTransaction, getSummary, resetDatabase } from './services/api';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const transResponse = await getTransactions();
      const summaryResponse = await getSummary();
      setTransactions(transResponse.data);
      setSummary(summaryResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      await createTransaction(transaction);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction');
    }
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset the database? This will delete all data.")) {
      try {
        setLoading(true);
        await resetDatabase();
        await fetchData(); // Refresh data after reset
        alert('Database reset successfully');
      } catch (error) {
        console.error('Error resetting database:', error);
        alert('Failed to reset database: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading your financial data...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1> Personal Finance Tracker</h1>
        <button onClick={handleReset} className="reset-btn" disabled={loading}>
          🗑️ {loading ? 'Resetting...' : 'Reset Database'}
        </button>
      </header>
      
      {error && <div className="error">⚠️ {error}</div>}
      
      <main>
        {summary && <Dashboard summary={summary} />}
        
        <div className="form-section">
          <h2>➕ Add New Transaction</h2>
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>
        
        <div className="transactions-section">
          <h2>📊 Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}

export default App;
