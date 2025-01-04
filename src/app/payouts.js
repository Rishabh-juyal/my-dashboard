import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import Papa from "papaparse"; // For CSV parsing

const Payouts = () => {
  const [data, setData] = useState([
    { author: "John", articles: 5, rate: 100 },
    { author: "Jane", articles: 7, rate: 120 },
  ]);

  const handleRateChange = (idx, newRate) => {
    const updatedData = [...data];
    updatedData[idx].rate = newRate;
    setData(updatedData);
  };

  // Function to export data as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Payout Details", 10, 10);

    // Table Header
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
      <h1 className="text-2xl font-bold">Payout Details</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Author</th>
            <th>Articles</th>
            <th>Payout Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.author}</td>
              <td>{row.articles}</td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleRateChange(idx, Number(e.target.value))}
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export to PDF
        </button>
        <button
          onClick={exportToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default Payouts;
