import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState('');
  const [datas, setDatas] = useState<{ text: string, checked: boolean }[]>([]);
  const handleAdd = () => {
    setDatas([...datas, { text: data, checked: false }]);
    setData('');
  }
  console.log(datas);
  const handleDelete = (index: number) => {
    const newDatas = datas.filter((_, i) => i !== index);
    // const newDatas = [...datas];
    // newDatas.splice(index, 1);
    setDatas(newDatas);
  }
  const handleCheck = (index: number) => {
    const newDatas = datas.map((item, i) => {
      if (i === index) {
        return { ...item, checked: !item.checked };
      }
      return item
    });
    setDatas(newDatas);
  }
  return (
    <>
      <div className="mt-32">
        <div className="px-4 sm:px-8 max-w-5xl m-auto">
          <h1 className="text-center font-semibold text-xl">Todo List</h1>
          <input type="text" value={data} onChange={e => setData(e.target.value)} className="w-full border border-gray-200 rounded px-4 py-2" />
          <button onClick={handleAdd} type="button" className="focus:outline-none mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
          <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
            {
              datas.map((item, index) => <li key={index} className="py-2 px-4">
                <div className='flex justify-between'>
                  <div className="flex items-center">
                    <input className='mr-2' type="checkbox" checked={item.checked} onChange={() => handleCheck(index)} />
                    <p className={item.checked ? 'line-through text-lg' : 'text-lg'}>{index + 1}-{item.text}</p>
                  </div>
                  {item.checked && (
                    <button
                      onClick={() => handleDelete(index)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      X
                    </button>
                  )}
                </div>
              </li>)
            }
          </ul>
        </div>
      </div>
    </>
  )

}

export default App
