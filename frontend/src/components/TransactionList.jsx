// frontend/src/components/TransactionList.jsx
import React from 'react';
import { format } from 'date-fns';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions yet. Add your first transaction to get started!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => {
            const formattedDate = format(new Date(transaction.date), 'MMM dd, yyyy');
            const amountFormatted = `₹${transaction.amount.toFixed(2)}`;
            
            return (
              <tr key={transaction.id} className={transaction.type === 'income' ? 'income-row' : 'expense-row'}>
                <td>{formattedDate}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{amountFormatted}</td>
                <td>
                  <div className={`type-badge ${transaction.type}`}>
                    {transaction.type === 'income' ? (
                      <><FiArrowUp size={14} /> Income</>
                    ) : (
                      <><FiArrowDown size={14} /> Expense</>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;