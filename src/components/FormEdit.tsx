import { useForm } from 'react-hook-form'

const FormEdit = ({ resetCurrentProduct, currentProduct, onEdit }: any) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name2: currentProduct.name,
            description2: currentProduct.description
        }

    })
    const onSubmit = (data: any) => {
        onEdit(data)
        resetCurrentProduct()
        console.log(data)
    }
    return (
        <>
            <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
                <input className="border p-1 rounded-sm" type="text" {...register('name2')} />
                <input className="border p-1 rounded-sm" type="text" {...register('description2')} />
                <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    type="submit"
                >
                    OK
                </button>
                <button
                    onClick={() => resetCurrentProduct()}
                    className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 ml-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    type="submit"
                >
                    X
                </button>
            </form>
        </>
    )
}

export default FormEdit