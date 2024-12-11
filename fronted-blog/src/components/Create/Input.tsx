
interface InputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    postBody?: string;
}


export default function Input({ onChange, placeholder, postBody } : InputProps) {
    return (
        <>
            <div className="w-full max-w-3xl mb-14">
                <div className="relative">
                    <input
                        value={postBody}
                        type="text"
                        placeholder = {placeholder}
                        onChange={onChange}
                        className="w-[700px] p-3 pl-4 text-white  bg-white shadow-md rounded-lg bg-opacity-20 border  border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200"
                    />
                </div>
            </div>
        </>
    );
}