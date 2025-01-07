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
    user: boolean;
    onClick: () => void;
}


export default function Content({ index, blog, user, onClick }: MyContentProps) {
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

            const BACKEND_URL = "https://backend-blog.saxenaayush27-work.workers.dev/api/v1";
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
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            throw new Error('Failed to delete blog..');
        }
    }

    return (
        <div>
            <div className={`bg-gray-900/10 border-2  border-gray-200/20  rounded-lg overflow-hidden transform transition hover:bg-zinc-900 cursor-pointer`}
                onClick={onClick}>
                <div className={`h-1 w-full bg-gradient-to-r ${gradients[index]}`}></div>
                <div className="p-7 sm:p-9">
                    <h3 className="mb-5 text-xl sm:text-2xl sm:min-h-[64px] font-bold text-white line-clamp-2 font-serif">
                        {blog.title}
                    </h3>
                    <div>
                        <p className="mb-[52px] sm:mb-[62px] sm:min-h-[72px] text-white line-clamp-4 sm:line-clamp-3 font-serif">
                            {blog.description}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row text-end justify-between text-sm text-white font-head">
                        <span className='pb-2 sm:pb-0'>{blog.author.name}</span>
                        <span>{blog.publishedAt === blog.updatedAt ? (
                            <p>{formatDate(blog.publishedAt)}</p>
                        ) : (
                            <p className='inline'>Updated: <p className='inline'>{formatDate(blog.updatedAt)}</p></p>
                        )}</span>
                    </div>
                </div>
            </div>
            {user &&
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