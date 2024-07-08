import { useForm } from 'react-hook-form'

const FormAdd = ({ onAdd }: any) => {
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = (data: any) => {
        onAdd(data)
        reset();
    }
    return (
        <>
            <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
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
        </>
    )
}

export default FormAdd