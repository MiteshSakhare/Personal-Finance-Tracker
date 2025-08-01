import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  const categories = [...new Set(transactions
    .filter(t => t.type === 'expense')
    .map(t => t.category))];
  
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category => 
          transactions
            .filter(t => t.category === category && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
        ],
      }
    ]
  };

  return <Pie data={data} />;
};

export default ExpenseChart;