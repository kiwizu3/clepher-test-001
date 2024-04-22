import React from 'react';

interface TableProps {
  headers: string[];
  rows: { [key: string]: string }[];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border px-4 py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index} className="border px-4 py-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
