import React, { useState } from 'react';

const TransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    type: 'expense',
    category: 'Other',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    // Reset form
    setFormData({
      amount: '',
      description: '',
      type: 'expense',
      category: 'Other',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Transaction Type:</label>
        <div className="type-buttons">
          <button 
            type="button"
            className={`btn-income ${formData.type === 'income' ? 'active' : ''}`}
            onClick={() => handleTypeChange('income')}
          >
            💹 Income
          </button>
          <button 
            type="button"
            className={`btn-expense ${formData.type === 'expense' ? 'active' : ''}`}
            onClick={() => handleTypeChange('expense')}
          >
            💸 Expense
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Amount (₹):</label>
        <input 
          type="number" 
          name="amount" 
          value={formData.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input 
          type="text" 
          name="description" 
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Transaction description"
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Housing">🏠 Housing</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Healthcare">🏥 Healthcare</option>
          <option value="Education">📚 Education</option>
          <option value="Salary">💰 Salary</option>
          <option value="Other">📦 Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        ➕ Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
