import React from 'react';

const Dashboard = ({ summary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <h2>📈 Financial Overview</h2>
      
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>💹 Total Income</h3>
          <p>{formatCurrency(summary.total_income)}</p>
          <small>Money earned this period</small>
        </div>
        
        <div className="summary-card expense">
          <h3>💸 Total Expenses</h3>
          <p>{formatCurrency(summary.total_expenses)}</p>
          <small>Money spent this period</small>
        </div>
        
        <div className={`summary-card ${summary.net_balance >= 0 ? 'income' : 'expense'}`}>
          <h3>💰 Net Balance</h3>
          <p>{formatCurrency(summary.net_balance)}</p>
          <small>{summary.net_balance >= 0 ? 'You\'re in the green!' : 'Consider reducing expenses'}</small>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
