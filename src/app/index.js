import React, { useState } from "react";
import PayoutChart from "../components/PayoutChart";

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/everything?q=tech&apiKey=bc4c6d6284d64cfb84f0e0a1eaf68b20"
    );
    const data = await res.json();

    return { props: { articles: data.articles || [] } };
  } catch (error) {
    console.error("API Error:", error.message);
    return { props: { articles: [], error: "Failed to fetch articles." } };
  }
}

const Dashboard = ({ articles, error }) => {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");

  // Filter Articles
  const filteredArticles = articles
    .filter((article) => (author ? article.author === author : true))
    .filter((article) => (type ? article.type === type : true))
    .filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase())
    );

  // Unique Author List for Dropdown
  const authors = Array.from(new Set(articles.map((a) => a.author).filter(Boolean)));

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <div className="flex space-x-4">
              <select
                onChange={(e) => setAuthor(e.target.value)}
                className="border p-2"
                value={author}
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setType(e.target.value)}
                className="border p-2"
                value={type}
              >
                <option value="">All Types</option>
                <option value="Blog">Blog</option>
                <option value="News">News</option>
              </select>
            </div>
          </div>
          <ul>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <li key={index} className="border-b py-2">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p>By: {article.author || "Unknown"}</p>
                  <p>Date: {article.publishedAt}</p>
                  <p>Type: {article.type}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No articles match your filters.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
