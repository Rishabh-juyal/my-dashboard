import React from "react";
import PayoutChart from "../components/PayoutChart";
import React, { useState } from "react";

const Dashboard = ({ articles }) => {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-5 w-full"
      />
      <ul>
        {filteredArticles.map((article, index) => (
          <li key={index} className="border-b py-2">
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
const [author, setAuthor] = useState("");
const [type, setType] = useState("");

const filteredArticles = articles
  .filter((article) => (author ? article.author === author : true))
  .filter((article) => (type ? article.type === type : true));

// Dropdowns
<select onChange={(e) => setAuthor(e.target.value)}>
  <option value="">All Authors</option>
  {Array.from(new Set(articles.map((a) => a.author))).map((author) => (
    <option key={author} value={author}>
      {author}
    </option>
  ))}
</select>;

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/everything?q=tech&apiKey=bc4c6d6284d64cfb84f0e0a1eaf68b20"
    );
    const data = await res.json();
    return { props: { articles: data.articles || [] } };
  } catch (error) {
    return { props: { articles: [], error: "API error" } };
  }
}

export default Dashboard;
