import React, { useState } from 'react';

interface TableProps {
  data: Array<{ [key: string]: any }>;
  columns: Array<{ key: string; label: string }>;
  onRowClick?: (row: any) => void; //
}

const Table: React.FC<TableProps> = ({ data, columns, onRowClick }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      if (a[sortKey] === b[sortKey]) return 0;
      if (a[sortKey] == null) return 1;
      if (b[sortKey] == null) return -1;
      if (typeof a[sortKey] === 'number' && typeof b[sortKey] === 'number') {
        return sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
      }
      return sortAsc
        ? String(a[sortKey]).localeCompare(String(b[sortKey]))
        : String(b[sortKey]).localeCompare(String(a[sortKey]));
    });
  }, [data, sortKey, sortAsc]);

  return (
    <div className="overflow-x-auto rounded shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-b bg-gray-50 px-4 py-2 text-left font-semibold cursor-pointer select-none"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1">{sortAsc ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)} // Dòng này rất quan trọng!
              >
                {columns.map((col) => (
                  <td key={col.key} className="border-b px-4 py-2">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
