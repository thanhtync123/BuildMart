import React, { useEffect, useState } from 'react';
// Hàm format ngày giờ
function formatDateTime(dateString: string) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
import Table from '@/components/ui/table';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
type Customer = {
  updated_at?: string;
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
  const [SearchTerm,setSearchTerm] = useState('');
useEffect(() => {
  setLoading(true);
  fetch(`/api/customer${SearchTerm ? `?search=${encodeURIComponent(SearchTerm)}` : ''}`)
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [SearchTerm]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const handleAdd = async () => {
      try {
        await fetch('/api/customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        setForm({ id: '', name: '', address: '', phone: '', email: '' });
        // Fetch lại danh sách customer sau khi thêm
        const response = await fetch('/api/customer');
        const data = await response.json();
        setData(data);
      } catch (err: any) {
        console.error('POST lỗi:', err.message);
      }
    };
    const handleEdit = async () => {
      try {
        await fetch('/api/customer', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        setForm({ id: '', name: '', address: '', phone: '', email: '' });
        const response = await fetch('/api/customer');
        const data = await response.json();
        setData(data);
      } catch (err: any) {
        console.error('PUT lỗi:', err.message);
      }
    };
    const handleCellClick = (row: Customer) => {
      setForm({
        id: row.id.toString(),
        name: row.name,
        address: row.address,
        phone: row.phone,
        email: row.email,
      });
    };
    const handleDelete = async (id: number) => {
      try {
        await fetch(`/api/customer/${id}`, {
          method: 'DELETE',
        });
        const response = await fetch('/api/customer');
        const data = await response.json();
        setData(data);
      } catch (err: any) {
        console.error('DELETE lỗi:', err.message);
      }
    };

  return (
    <div>
      <Input
        label="ID"
        id="id"
        className="w-60"
        name="id"
        value={form.id}
        onChange={handleChange}
      />
      <div className="flex gap-4">
        <Input
          label="Tên"
          id="name"
          className="w-60"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          label="Địa chỉ"
          id="address"
          className="w-80"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="SĐT"
          id="phone"
          className="w-60"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          label="Email"
          id="email" // Sửa lại cho đúng
          className="w-80"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Button onClick={handleAdd}>Thêm</Button>
        <Button onClick={handleEdit} disabled={!form.id}>Sửa</Button>
        <Button onClick={() => handleDelete(Number(form.id))} disabled={!form.id}>Xóa</Button>
      </div>

      <h2 className="mb-4 text-xl font-bold">Danh sách khách hàng</h2>
      <Input
        label="Tìm kiếm"
        className="w-[400px] mb-1"
        onChange={(e) => setSearchTerm(e.target.value)} id={'search'}
      />
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <Table
          data={data.map((row) => ({
            ...row,
            updated_at: row.updated_at ? formatDateTime(row.updated_at) : '',
          }))}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Tên' },
            { key: 'address', label: 'Địa chỉ' },
            { key: 'phone', label: 'Số điện thoại' },
            { key: 'email', label: 'Email' },
            { key: 'updated_at', label: 'Thời gian cập nhật' },
          ]}
          onRowClick={(row) => {handleCellClick(row)}}
        />
      )}
    </div>
  );
}

export default Customer;
