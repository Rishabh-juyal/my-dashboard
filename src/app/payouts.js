import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import for autoTable support
import Papa from "papaparse"; // For CSV parsing

const Payouts = () => {
  const [data, setData] = useState([]);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("payoutData")) || [
      { author: "John", articles: 5, rate: 100 },
      { author: "Jane", articles: 7, rate: 120 },
    ];
    setData(savedData);
  }, []);

  const handleRateChange = (idx, newRate) => {
    const updatedData = [...data];
    updatedData[idx].rate = newRate;
    setData(updatedData);

    // Save updated data to local storage
    localStorage.setItem("payoutData", JSON.stringify(updatedData));
  };

  // Function to export data as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Payout Details", 10, 10);

    // Table Header and Rows
    const tableColumns = ["Author", "Articles", "Payout Rate"];
    const tableRows = data.map((row) => [row.author, row.articles, row.rate]);

    // Adding table to the PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("payout-details.pdf");
  };

  // Function to export data as CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "payout-details.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Payout Details</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">Articles</th>
            <th className="border border-gray-300 px-4 py-2">Payout Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 px-4 py-2">{row.author}</td>
              <td className="border border-gray-300 px-4 py-2">{row.articles}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleRateChange(idx, Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons for exporting */}
      <div className="mt-5 space-x-3">
        <button
          onClick={exportToPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export to PDF
        </button>
        <button
          onClick={exportToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default Payouts;
