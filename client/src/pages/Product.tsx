import Input from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import Table from '@/components/ui/table';
import { Button } from '@/components/ui/button';

function Product() {
  type ProductType = {
    id: number;
    name: string;
    category_name: string;
    img: string;
    unit: string;
    price: number;
    stock_quantity: number;
    description: string;
  };

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    category_id: '',
    img: '',
    unit: '',
    price: '',
    stock_quantity: '',
    description: '',
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetch('/api/category')
      .then((response) => response.json())
      .then((data) => {
        const formattedCategories = data.map(
          (category: { id: string; name: string }) => ({
            value: category.id,
            label: category.name,
          }),
        );
        setCategories(formattedCategories);
      });
  }, []);

  useEffect(() => {
    fetch('/api/product')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  const handleAdd = async () => {
    try {
      await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({
        id: '',
        name: '',
        category_id: '',
        img: '',
        unit: '',
        price: '',
        stock_quantity: '',
        description: '',
      });
    } catch (error) {
      alert(error + '');
    }
  };

  return (
    <>
      <Input className="w-20" label="ID" id="product-id" />
      <Input
        label="Tên sản phẩm"
        id="product-name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <Select
        label="Danh mục"
        options={categories}
        selected={form.category_id}
        onChange={(value: string) => setForm({ ...form, category_id: value })}
      />
      <Input
        label="Tên file ảnh"
        id="product-img"
        name="img"
        value={form.img}
        onChange={handleChange}
      />
      <Input
        label="Đơn vị"
        id="product-unit"
        name="unit"
        value={form.unit}
        onChange={handleChange}
      />
      <Input
        label="Giá"
        id="product-price"
        name="price"
        value={form.price}
        onChange={handleChange}
      />
      <Input
        label="Tồn kho"
        id="product-stock_quantity"
        name="stock_quantity"
        value={form.stock_quantity}
        onChange={handleChange}
      />
      <Textarea
        label="Mô tả"
        id="product-description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <Button onClick={handleAdd}>Thêm sản phẩm</Button>
      <img src="" alt="Ảnh sản phẩm" />
      <Table
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Tên sản phẩm' },
          { key: 'category_name', label: 'Danh mục' },
          { key: 'img', label: 'Hình ảnh' },
          { key: 'unit', label: 'Đơn vị' },
          { key: 'price', label: 'Giá' },
          { key: 'stock_quantity', label: 'Tồn kho' },
          { key: 'description', label: 'Mô tả' },
        ]}
        data={products.map((product: ProductType) => {
          const mappedProduct: Record<string, any> = {};
          Object.entries(product).forEach(([key, value]) => {
            if (key === 'img') {
              mappedProduct[key] =
                value && value !== null && value !== 'NULL' ? (
                  <img
                    src={`/images/${value as string}`}
                    alt="Ảnh sản phẩm"
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                ) : (
                  'NULL'
                );
            } else {
              mappedProduct[key] = value === null ? 'NULL' : value;
            }
          });
          return mappedProduct;
        })}
      />
    </>
  );
}

export default Product;
