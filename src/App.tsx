import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

interface Product {
  id: number;
  name?: string;
  description?: string;
  checked: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);
  const { reset, register, handleSubmit, formState: { }, } = useForm();

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



  const onEdit = async (data: any) => {
    try {
      fetch(`http://localhost:3000/products/${currentProduct.id}`, {
        method: 'PATCH',
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

  const onAdd = (data: any) => {
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
        reset();
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
          <form className="mt-3" onSubmit={handleSubmit(onAdd)}>
            <div className="mb-5">
              <input placeholder='Name' className="border p-1 rounded-sm" {...register('name')} /> <br />
            </div>
            <div className="mb-5">
              <input placeholder='Description' className="border p-1 rounded-sm" {...register('description')} /> <br />
            </div>
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
        <h1 className="container my-3 text-3xl text-center">List Product</h1>
        {products.map((item, index) => (
          <div key={item.id} className="flex justify-center container mx-auto">
            {(item.id === currentProduct.id && currentProduct.checked === false) ? (
              <form className="flex items-center" onSubmit={handleSubmit(onEdit)}>
                <input className="border p-1 rounded-sm" type="text" {...register('name2')} />
                <input className="border p-1 rounded-sm" type="text" {...register('description2')} />
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                  type="submit"
                >
                  OK
                </button>
                <button
                  onClick={() => setCurrentProduct({} as Product)}
                  className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 ml-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                  type="submit"
                >
                  X
                </button>
              </form>
            ) : (
              <div className="flex items-center">
                <input className="mr-2" type="checkbox" onClick={() => { handleChangeChecked(item) }} />
                <p onClick={() => {
                  setCurrentProduct(item)
                  reset({
                    name2: item.name,
                    description2: item.description
                  })
                }}
                  className={item.checked ? 'text-lg line-through w-96' : 'text-lg w-96 hover:cursor-pointer'}>
                  {index + 1} - {item.name} - {item.description}
                </p>
                <button
                  className={'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'}
                  onClick={() => handleDelete(item.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </>
  );
}

export default App;
