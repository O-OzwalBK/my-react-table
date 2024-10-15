// src/SortableTable.js
import React, { useState } from 'react';
import './SortableTable.css'; // Import CSS for styling

const SortableTable = ({ data }) => {
   const [sortConfig, setSortConfig] = useState({ key: 'serialNumber', direction: 'ascending' });

   const sortedData = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
         return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
         return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
   });

   const requestSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
         direction = 'descending';
      }
      setSortConfig({ key, direction });
   };

   return (
      <table className="sortable-table">
         <thead>
            <tr>
               <th onClick={() => requestSort('serialNumber')}>Serial Number</th>
               <th onClick={() => requestSort('companyName')}>Company Name</th>
               <th onClick={() => requestSort('price')}>Price</th>
               <th onClick={() => requestSort('createdDate')}>Created Date</th>
               <th onClick={() => requestSort('updatedDate')}>Updated Date</th>
            </tr>
         </thead>
         <tbody>
            {sortedData.map((item) => (
               <tr key={item.serialNumber}>
                  <td>{item.serialNumber}</td>
                  <td>{item.companyName}</td>
                  <td>{item.price}</td>
                  <td>{item.createdDate}</td>
                  <td>{item.updatedDate}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default SortableTable;
