import React from 'react';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Table from '@/components/ui/table';
import { useState } from 'react';
type Category = {
  id: string;
  name: string;
};
function Category() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [name, setName] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [form, setForm] = useState({
    id: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  React.useEffect(() => {
    fetch('/api/category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);
  const handleAdd = async () => {
    const response = await fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: form.name }),
    });
    if (response.ok) {
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setForm({ id: '', name: '' });
    }
  };
  const handleCellClick = (row: Category) => {
    setForm({
      id: row.id,
      name: row.name,
    });
  };
  const handleDelete = async (id: string) => {
    {
      const response = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
      }
    }
  };
   const handleEdit = async () => {
        try {
          await fetch('/api/category', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          setForm({ id: '', name: '' });
          const response = await fetch('/api/category');
          const data = await response.json();
          setCategories(data);
        } catch (err: any) {
          console.error('PUT lỗi:', err.message);
        }
      };

  return (
    <>
      <div className="flex gap-4">
        <Input label="ID" id={'id'} value={form.id} onChange={handleChange} />
        <Input
          label="Tên danh mục"
          id="category-name"
          name="name" // Thêm dòng này!
          value={form.name}
          onChange={handleChange}
        />
        <Button onClick={handleAdd}>Thêm</Button>
        <Button onClick={handleEdit}>Sửa</Button>
        <Button onClick={() => handleDelete(form.id)}>Xóa</Button>
      </div>

      <Table
        columns={[
          {
            key: 'id',
            label: 'ID',
          },
          {
            key: 'name',
            label: 'Tên danh mục',
          },
        ]}
        data={categories}
        onRowClick={(row) => {
          handleCellClick(row);
        }}
      />
    </>
  );
}

export default Category;
