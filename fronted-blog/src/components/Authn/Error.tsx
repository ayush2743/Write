export default function Error({text} : {text : string}) {
    return (
        <button className="mb-4 mt-3 w-full bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-md text-center font-normal">
            {text} 
        </button>
    )
};