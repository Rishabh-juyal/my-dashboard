import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Analytics = ({ articles }) => {
  const trendData = articles.map((article) => ({
    author: article.author || 'Unknown',
    type: article.type || 'Blog',
  }));

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">News Analytics</h1>
      <LineChart width={600} height={300} data={trendData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="author" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="type" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch('https://newsapi.org/v2/everything?q=tech&apiKey=bc4c6d6284d64cfb84f0e0a1eaf68b20');
    const data = await res.json();
    return { props: { articles: data.articles || [] } };
  } catch (error) {
    return { props: { articles: [], error: 'API error' } };
  }
}

export default Analytics;