import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import FormAdd from './components/FormAdd';
import { Product } from './types/Product';
import List from './components/List';



function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);
  const { reset, register, handleSubmit } = useForm();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => setProducts(products.filter((p) => p.id !== id)));
    }
  };



  const handleEdit = async (data: any) => {
    try {
      fetch(`http://localhost:3000/products/${currentProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...currentProduct, name: data.name2, description: data.description2 }),
      })
        .then(res => res.json())
        .then(updatedProduct => {
          setProducts(products.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)));
          setCurrentProduct({} as Product);
          reset();
        })
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (data: any) => {
    //Nếu nhập dữ liệu xong chưa ấn thêm và ấn sửa sp nào đó, xong tiếp đó mới ấn thêm mới
    const { name2, description2, ...newData } = data
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newData, checked: false }),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        setProducts([...products, newProduct]);
      });
  }

  const handleChangeChecked = async (data: Product) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, checked: !data.checked }),
      })
      if (res.status != 200) return alert('Cập nhật checked thất bại')
      const result = await res.json()
      setProducts(products.map((item) => (item.id === result.id ? result : item)));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='container'>
        <div className='flex justify-center'>
          <FormAdd onAdd={handleAdd} />
        </div>
        <h1 className="container my-3 text-3xl text-center">List Product</h1>
        {products.map((item, index) => (
          <List
            item={item}
            index={index}
            currentProduct={currentProduct}
            handleChangeChecked={handleChangeChecked}
            setCurrentProduct={setCurrentProduct}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

    </>
  );
}

export default App;
