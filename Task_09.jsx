import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const PriceRangeChart = ({ month }) => {
  const [chartData, setChartData] = useState({});

  const fetchPriceRangeData = async (selectedMonth) => {
    try {
      const response = await axios.get(`/api/price-range`, {
        params: { month: selectedMonth }
      });

      const data = {
        labels: response.data.map(item => item.range),
        datasets: [
          {
            label: 'Number of Items',
            data: response.data.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
      };

      setChartData(data);
    } catch (error) {
      console.error('Error fetching price range data:', error);
    }
  };

  useEffect(() => {
    fetchPriceRangeData(month);
  }, [month]);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  );
};

export default PriceRangeChart;
