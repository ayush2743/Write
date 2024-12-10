
export default function Input({ onChange, placeholder } : { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) {
    return (
        <>
            <div className="w-full max-w-3xl mb-14">
                <div className="relative">
                    <input
                        type="text"
                        placeholder = {placeholder}
                        onChange={onChange}
                        className="w-[700px] p-3 pl-4 pr-12 text-white  bg-white shadow-md rounded-lg bg-opacity-20 border  border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200"
                    />
                </div>
            </div>
        </>
    );
}