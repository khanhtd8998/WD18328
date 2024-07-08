import { useForm } from 'react-hook-form'
import { Product } from '../types/Product'
import FormEdit from './FormEdit'

const List = ({ item, index, currentProduct, setCurrentProduct, onEdit, handleChangeChecked, onDelete }: any) => {
    const { reset } = useForm()
    return (
        <>
            <div key={item.id} className="flex justify-center container mx-auto">
                {(item.id === currentProduct.id && currentProduct.checked === false) ? (
                    <FormEdit
                        resetCurrentProduct={() => setCurrentProduct({} as Product)}
                        currentProduct={currentProduct}
                        onEdit={onEdit}
                    />
                ) : (
                    <div className="flex items-center">
                        <input className="mr-2" defaultChecked={item.checked} type="checkbox" onClick={() => { handleChangeChecked(item) }} />
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
                            className={item.checked ? 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' : 'hidden'}
                            onClick={() => onDelete(item.id)}
                            type="button"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default List