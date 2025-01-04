import React from 'react';
import PayoutChart from '../components/PayoutChart';

const Dashboard = ({ articles }) => {
  const totalArticles = articles.length;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p>Total Articles: {totalArticles}</p>
      <PayoutChart data={articles} />
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

export default Dashboard;