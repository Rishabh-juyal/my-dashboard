import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const PayoutChart = ({ data }) => {
  const chartData = data.map((article) => ({
    author: article.author || 'Unknown',
    payout: Math.floor(Math.random() * 500),
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={chartData} dataKey="payout" nameKey="author" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
      <Tooltip />
    </PieChart>
  );
};

export default PayoutChart;