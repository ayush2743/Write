import { EditIcon, Trash2Icon } from "lucide-react";

export default function Skeleton({ edit }: { edit: boolean }) {

    const gradients = [
        "from-blue-200 to-purple-300",
        "from-green-200 to-teal-300",
        "from-indigo-200 to-blue-300",
        "from-pink-200 to-orange-300",
        // "from-yellow-200 to-red-300",
        // "from-purple-200 to-pink-300",
        // "from-gray-200 to-slate-300",
        // "from-cyan-200 to-lime-300",
    ];

    return (

            <div className="grid max-w-5xl grid-cols-2 gap-x-14 gap-y-16 mx-auto">
                {gradients.map((gradient, index) => (
                    <div>
                        <div
                            key={index}
                            className={`h-64 bg-gray-900/30 shadow-sm shadow-gray-500 border border-white rounded-lg overflow-hidden transform transition hover:scale-y-105 hover:shadow-xl cursor-pointer`}
                        >
                            <div className={`h-2 w-full bg-gradient-to-r ${gradient}`}></div>
                            <div className="p-9 animate-pulse">
                                <p className="h-8 bg-gray-200 rounded-full dark:bg-neutral-700 w-40"></p>

                                <ul className="mt-5 space-y-3">
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                                    <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>

                                </ul>
                            </div>
                        </div>
                        {edit &&
                            <div className="flex justify-between mt-4 text-sm">
                                <button className="mr-2 w-1/2 flex justify-between items-center text-gray-200  border-2  border-gray-200/20  px-4 py-2  rounded-lg font-serif hover:shadow-sm hover:shadow-gray-100">
                                    <span>Edit</span>
                                    <EditIcon size={15} />
                                </button>
                                <button className="w-1/2 flex justify-between items-center text-gray-200  border-2  border-gray-200/20  px-4 py-2  rounded-lg font-serif hover:shadow-sm hover:shadow-gray-100">
                                    <span>Delete</span>
                                    <Trash2Icon size={15} />
                                </button>
                            </div>}
                    </div>
                ))}
            </div>
    );
}