import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Textarea from '@/components/ui/textarea';
import SwAlert from '@/components/ui/swalert';
import Table from '@/components/ui/table';
import { data } from 'react-router-dom';
import { Columns } from 'lucide-react';
// import Category from './Category';

type Category = {
  id: string;
  name: string;
};
type Product = {
  id: string 
  name: string
  category_id: string
  unit: string
  price: string 
  stock_quantity:string 
  description: string
}
export default function Product() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    category_id: '',
    unit: '',
    price: '',
    stock_quantity: '',
    description: '',
  });
  const [Categories, setCategories] = useState<Category[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [Product,setProduct] = useState<Product[]>([]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAdd = async () => {
    if (!form.name.trim()) {
      setAlert({ message: 'Vui lòng nhập tên sản phẩm', type: 'error' });
      return;
    }
    if (!form.category_id) {
      setAlert({ message: 'Vui lòng chọn danh mục', type: 'error' });
      return;
    }
    if (!form.unit.trim()) {
      setAlert({ message: 'Vui lòng nhập đơn vị', type: 'error' });
      return;
    }
    if (!form.price.trim()) {
      setAlert({ message: 'Vui lòng nhập giá', type: 'error' });
      return;
    }
    if (!form.stock_quantity.trim()) {
      setAlert({ message: 'Vui lòng nhập số lượng', type: 'error' });
      return;
    }

    try {
      const res = await fetch('api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Lỗi server');
      setAlert({ message: 'Thêm sản phẩm thành công', type: 'success' });
      setForm({
        id: '',
        name: '',
        category_id: '',
        unit: '',
        price: '',
        stock_quantity: '',
        description: '',
      });
    } catch (err: any) {
      setAlert({
        message: err.message || 'Thêm sản phẩm thất bại',
        type: 'error',
      });
    }
  };
  useEffect(() => {
    fetch('/api/category')
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((err) => console.error('Lỗi fetch:', err));
  }, []);
    useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((data: Product[]) => setProduct(data))
      .catch((err) => console.error('Lỗi fetch:', err));
  }, []);

  return (
    <>
      {alert && (
        <SwAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <Input
        label="ID"
        id="id"
        name="id"
        className="w-40"
        value={form.id}
        onChange={handleChange}
      />
      <Input
        label="Tên sản phẩm"
        id="name"
        name="name"
        className="w-60"
        value={form.name}
        onChange={handleChange}
      />
      <Select
        label="Chọn danh mục"
        name="category_id"
        options={[
          { value: '', label: 'Chọn danh mục' }, // <--- placeholder
          ...Categories.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          })),
        ]}
        selected={form.category_id}
        onChange={(value) => handleSelect('category_id', value)}
      />
      <Input
        label="Đơn vị"
        id="unit"
        name="unit"
        value={form.unit}
        onChange={handleChange}
        className="w-60"
      />
      <Input
        label="Giá"
        id="price"
        name="price"
        value={form.price}
        type="number"
        onChange={handleChange}
        className="w-60"
      />
      <Input
        label="Số lượng"
        id="stock_quantity"
        name="stock_quantity"
        className="w-60"
        value={form.stock_quantity}
        type="number"
        onChange={handleChange}
      />
      <Textarea
        label="Mô tả"
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <Button variant="default" onClick={handleAdd}>
        Thêm
      </Button>
      <Table columns={[
          {
            key: 'id',
            label: 'ID',
          },
          {
            key: 'name',
            label: 'Tên sản phẩm',
          },
          {
            key: 'category_id',
            label: 'Tên danh mục',
          },
                    {
            key: 'unit',
            label: 'Đơn vị',
          },
                    {
            key: 'price',
            label: 'Giá',
          },
                    {
            key: 'stock_quantity',
            label: 'Số lượng',
          },
                              {
            key: 'description',
            label: 'Mô tả',
          },
        ]} data={Product}/>
    </>
  );
}
