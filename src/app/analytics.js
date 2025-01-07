import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export async function getServerSideProps() {
  try {
    const res = await fetch(
      'https://newsapi.org/v2/everything?q=tech&apiKey=bc4c6d6284d64cfb84f0e0a1eaf68b20'
    );
    const data = await res.json();
    console.log('API Response:', data); // Debug API response
    return { props: { articles: data.articles || [] } };
  } catch (error) {
    console.log('API Error:', error.message); // Debug API errors
    return { props: { articles: [], error: 'API error' } };
  }
}

const Analytics = ({ articles, error }) => {
  if (error) {
    return <p className="text-red-500">Error fetching data: {error}</p>;
  }

  // Prepare data for LineChart
  const trendData = articles.map((article, index) => ({
    index: index + 1,
    title: article.title || 'Untitled',
    author: article.author || 'Unknown',
    date: article.publishedAt || 'No Date',
  }));

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">News Analytics</h1>
      {trendData.length > 0 ? (
        <LineChart width={600} height={300} data={trendData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="index" stroke="#8884d8" />
        </LineChart>
      ) : (
        <p className="text-gray-500">No articles available to display.</p>
      )}
    </div>
  );
};

export default Analytics;
