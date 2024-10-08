import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchTransactions = async (month, search = '', page = 1) => {
    try {
      const response = await axios.get(`/api/transactions`, {
        params: { month, search, page }
      });
      setTransactions(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 10)); // assuming 10 items per page
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(month, searchText, page);
  }, [month, searchText, page]);

  return (
    <div>
      <label>Select Month: </label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m, index) => (
          <option key={index} value={m}>{m}</option>
        ))}
      </select>

      <input 
        type="text" 
        placeholder="Search transactions..." 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)} 
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button 
        disabled={page === totalPages} 
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default TransactionTable;
