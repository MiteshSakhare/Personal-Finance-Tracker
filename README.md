Personal Finance Tracker
A modern, responsive personal finance tracking application built with FastAPI backend and React frontend. Track your income, expenses, budgets, and get comprehensive financial insights with a beautiful, mobile-friendly interface.

✨ Features
📊 Financial Dashboard - Real-time overview of income, expenses, and net balance

💰 Transaction Management - Add, view, and track all your financial transactions

🏷️ Category Organization - Organize transactions by customizable categories

📱 Mobile Responsive - Fully optimized for mobile devices and tablets

🎨 Modern UI/UX - Beautiful, intuitive interface with smooth animations

🔄 Real-time Updates - Instant data synchronization across all views

📈 Financial Insights - Visual summary cards with key financial metrics

🗃️ Database Management - Easy reset and data management capabilities

🚀 Quick Start
Prerequisites
Python 3.8+

Node.js 16+

npm or yarn

Backend Setup
Clone the repository

bash
git clone <repository-url>
cd finance-tracker
Set up the backend

bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
The backend API will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

Frontend Setup
Set up the frontend

bash
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
The frontend will be available at: http://localhost:3000

📁 Project Structure
text
finance-tracker/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── services/
│   │   │   └── api.js       # API service functions
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling and responsive design
│   │   └── index.js         # React entry point
│   └── package.json         # Node.js dependencies
└── README.md
🛠️ Technology Stack
Backend
FastAPI - Modern, fast web framework for Python

SQLAlchemy - SQL toolkit and ORM

SQLite - Lightweight database

Pydantic - Data validation using Python type hints

Uvicorn - ASGI server implementation

Frontend
React 18 - JavaScript library for building user interfaces

Axios - HTTP client for API requests

Chart.js - Charting library (ready for future enhancements)

Date-fns - Date utility library

CSS3 - Modern styling with CSS Grid and Flexbox

📖 API Documentation
Endpoints
Method	Endpoint	Description
GET	/	API health check
POST	/transactions/	Create a new transaction
GET	/transactions/	Get all transactions
POST	/budgets/	Create a new budget
GET	/budgets/	Get all budgets
GET	/summary/	Get financial summary
DELETE	/reset/	Reset database
Example API Usage
javascript
// Create a transaction
const transaction = {
  amount: 150.00,
  description: "Groceries",
  type: "expense",
  category: "Food",
  date: "2024-01-15"
};

fetch('http://localhost:8000/transactions/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(transaction)
});
📱 Mobile Responsive Design
The application is fully responsive with breakpoints for:

📱 Mobile phones (≤768px)

📲 Small mobile (≤480px)

🔄 Landscape orientation support

📟 Tablets (≤968px)

💻 Desktops (>968px)

Mobile Features
Touch-friendly buttons (44px+ touch targets)

Swipe-friendly table scrolling

Optimized typography and spacing

Single-column layout on mobile

Landscape mode optimization

🎨 Design Features
Modern Color Palette - Beautiful gradients and consistent theming

CSS Custom Properties - Maintainable design system

Smooth Animations - Subtle transitions and hover effects

Card-based Layout - Clean, organized information display

Visual Hierarchy - Clear typography and spacing

Accessibility - Touch-friendly and keyboard navigation support
