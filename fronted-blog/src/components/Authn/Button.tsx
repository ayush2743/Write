import { LoaderCircle, LoaderIcon } from "lucide-react";

interface ButtonProps {
    text: string;
    handleCLick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;  
}

export default function Button({ text, handleCLick, loading }: ButtonProps) {
    return (
        <button
            onClick={handleCLick}
            className="w-full flex justify-center p-3 mt-3 font-serif font-medium border-2 border-gray-100 rounded-md bg-white/40 backdrop-blur-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:transition-color hover:duration-300"
        >
            {loading && (
            <LoaderCircle className="mr-2 animate-spin" /> 
          )}
          {loading ? 'Processing.' : text}
        </button>

    )
}