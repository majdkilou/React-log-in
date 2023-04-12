import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.scss';

interface TableData {
  id: number;
  name: string;
  email: string;
}

const Table: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: { sortBy, sortOrder, searchQuery },
        });
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [sortBy, sortOrder, searchQuery]);

  const handleSortClick = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th onClick={() => handleSortClick('id')}>
          ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSortClick('name')}>
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSortClick('email')}>
          Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
      </tr>
    );
  };

  const renderTableRows = () => {
    return data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
      </tr>
    ));
  };

  return (
    <>
    <div className='container'>
        <h1>Table with hard-coded valus</h1>
        <p>Search:</p>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      <table className='table'>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      </div>
    </>
  );
};

export default Table;
