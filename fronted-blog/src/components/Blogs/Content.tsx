import { EditIcon, Trash2Icon } from 'lucide-react';
import axios from 'axios';
import { singleBlogAtom } from '../../atoms/singleBlogAtom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { BlogInterface } from '../../pages/SingleBlog';
import formatDate from './Date';

interface MyContentProps {
    index: number;
    blog: BlogInterface;
    edit: boolean;
    onDelete: () => void;
    onClick: () => void;
}


export default function Content({ index, blog, edit, onDelete, onClick }: MyContentProps) {
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

    const [singleBlog, setSingleBlog] = useRecoilState(singleBlogAtom);
    const navigate = useNavigate();

    function handleUpdate() {
        setSingleBlog(blog);
        if (singleBlog) {
            navigate(`/update/${blog.id}`);
        }
    }


    async function handleDelete() {

        try {

            const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found');
            }
            await axios.delete(`${BACKEND_URL}/blog/post`, {
                headers: {
                    Authorization: `${token}`
                },
                data: {
                    id: blog.id
                }
            });
            onDelete();
        } catch (error: any) {
            console.log(error);
            if (error.message === 'No authentication token found') {
                throw error;
            }
            if (error.response.data.error === 'Error while authorization') {
                throw error;
            }
            throw new Error('Failed to delete blog..');
        }
    }

    return (
        <div>
            <div className={`h-64 bg-gray-900/10 border-2  border-gray-200/20  rounded-lg overflow-hidden transform transition hover:bg-zinc-900 cursor-pointer`}
                onClick={onClick}
            >
                <div className={`h-1 w-full bg-gradient-to-r ${gradients[index]}`}></div>
                <div className="p-9">
                    <h3 className="mb-5 text-2xl font-bold text-white truncate font-serif">
                        {blog.title}
                    </h3>
                    <div className=''>
                        <p className="mb-20 text-white line-clamp-2 font-serif">
                            {blog.description}
                        </p>
                    </div>
                    <div className="mb-2 absolute bottom-5 left-9 right-9 flex items-center justify-between text-sm text-white font-head">
                        <span>{blog.author.name}</span>
                        <span>{blog.publishedAt === blog.updatedAt ? (
                            <p>{formatDate(blog.publishedAt)}</p>
                        ) : (
                            <p>Updated: {formatDate(blog.updatedAt)}</p>
                        )}</span>
                    </div>
                </div>
            </div>
            {edit &&
                <div className="flex justify-between mt-4 text-sm">
                    <button className="mr-2 w-1/2 flex justify-between items-center text-gray-200  border-2  border-gray-200/20  px-4 py-2  rounded-lg font-serif hover:shadow-sm hover:shadow-gray-100" onClick={handleUpdate}>
                        <span>Edit</span>
                        <EditIcon size={15} />
                    </button>
                    <button className="w-1/2 flex justify-between items-center text-gray-200  border-2  border-gray-200/20  px-4 py-2  rounded-lg font-serif hover:shadow-sm hover:shadow-gray-100" onClick={handleDelete}>
                        <span>Delete</span>
                        <Trash2Icon size={15} />
                    </button>
                </div>}
        </div>
    );
}