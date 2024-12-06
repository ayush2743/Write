import { SearchIcon } from 'lucide-react';

export default function SearchElement({ onChange } : { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <>
            <div className="w-full max-w-2xl px-5">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        onChange={onChange}
                        className="w-full p-3 pl-4 pr-12 text-white  bg-white shadow-md rounded-lg bg-opacity-20 border  border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200"
                    />
                    <button className="absolute top-0 right-0 p-2 mt-2 mr-2 text-white">
                        <SearchIcon size={20} />
                    </button>
                </div>
            </div>
        </>
    );
}