import { SearchIcon, LoaderCircle } from 'lucide-react';
import useDebounce from '../Hooks/useDebounce';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { singleBlogAtom } from '../../atoms/singleBlogAtom';
import { useRecoilState } from 'recoil';


export default function SearchElement() {
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noResults, setNoResults] = useState<boolean | null>(null);

    const debounce = useDebounce(search);
    const Navigate = useNavigate();
    const [singleBlog, setSingleBlog] = useRecoilState(singleBlogAtom);

    useEffect(() => {

        async function fetchResults() {
            if (debounce) {
                const BACKEND_URL = "https://backend-blog.saxenaayush27-work.workers.dev/api/v1";
                try {
                    setLoading(true);
                    const response = await axios.post(`${BACKEND_URL}/blog/search`, {
                        search: debounce,
                    });
                    setResults(response.data.blogs);
                    if (response.data.blogs.length === 0) {
                        setNoResults(true);
                        setTimeout(() => setNoResults(false), 3000);
                    }
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }

        fetchResults();
    }, [debounce]);

    function handleClick(blog: any) {
        setSingleBlog(blog);
        if (singleBlog) {
            Navigate(`/blog/${blog.id}`);
        }

    }

    return (

        <div className="w-full max-w-2xl px-5">
            <div className="relative bg-white bg-opacity-20 text-white shadow-md rounded-lg border border-gray-200 p-3">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent text-inherit focus:outline-none placeholder-gray-400"
                />
                <button className="absolute top-0 right-0 p-2 mt-2 mr-2">
                    {loading ? (
                        <LoaderCircle size={20} className="animate-spin" />
                    ) : (
                        <SearchIcon size={20} />
                    )}
                </button>
                {results.length > 0 && (
                    <div className="mt-4 mx-1 max-h-56 overflow-y-auto">
                        {results.map((blog) => (
                            <div
                                key={blog.id}
                                className="p-3 border-t border-gray-200 cursor-pointer"
                                onClick={() => handleClick(blog)}
                            >
                                <h3 className="text-md font-semibold">{blog.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
                {noResults && (
                    <div className="text-gray-500 mt-2">No results found.</div>
                )}
            </div>
        </div>

    );
}