
import React, { useEffect, useState } from 'react';
import Table from '@/components/ui/table';

type Customer = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
};


function Customer() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      fetch('/api/customer')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Danh sách khách hàng</h2>
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <Table
          data={data}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Tên' },
            { key: 'address', label: 'Địa chỉ' },
            { key: 'phone', label: 'Số điện thoại' },
            { key: 'email', label: 'Email' },
          ]}
        />
      )}
    </div>
  );
}

export default Customer;
