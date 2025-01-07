import { blogAtomFamily } from '../../atoms/blogAtom';
import { singleBlogAtom } from '../../atoms/singleBlogAtom';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { useState, useRef } from 'react';
import Content from './Content';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';
import PageNumber from './PageNumber';
import { BlogInterface } from '../../pages/SingleBlog';


export default function BlogPagination({ user }: { user: boolean }) {
    const [page, setPage] = useState<number>(1);

    const totalBlogs = useRef<number>(12);
    const navigate = useNavigate();

    const blogsLoadable = useRecoilValueLoadable(blogAtomFamily({ page, isUser: user }));
    const [singleBlog, setSingleBlog] = useRecoilState(singleBlogAtom);


    if (blogsLoadable.state === 'loading') {
        return (
            <>
                <Skeleton user={user} />
                <PageNumber totalBlogs={totalBlogs.current} setPage={setPage} page={page} />
            </>
        )
    }

    if (blogsLoadable.state === 'hasError') {

        console.log(blogsLoadable.contents.message);

        if (blogsLoadable.contents.message === 'No authentication token found') {
            navigate('/signin');
        } else if (blogsLoadable.contents.message === 'Network Error') {
            navigate('/error');
        }
        else if (blogsLoadable.contents.response.data.error === 'Error while authorization') {
            navigate('/signin');
        }

        return (
            <>
                <div className='text-white text-center font-bold text-xl sm:text-4xl font-serif sm:p-5'>{blogsLoadable.contents.message}🥲</div>
                <div className="items-center text-center text-white flex justify-center text-md font-serif">Please <a href='/signin' className="inline p-2 underline text-blue-300">Login</a> to view your blogs 👍</div>
            </>
        );
    }

    const blogs = blogsLoadable.contents.blogs;
    totalBlogs.current = blogsLoadable.contents.totalBlogs;


    function handleOnClick(blog: BlogInterface) {
        setSingleBlog(blog);
        if (singleBlog) {
            navigate(`/blog/${blog.id}`);
        }
    }

    return (
        <div className="flex flex-col">
            {blogs.length > 0 ?
                <>
                    <div className="grid max-w-5xl w-full  grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-16 mx-auto">
                        {blogs.map((blog: any, index: number) => (
                            <Content key={blog.id} index={index} blog={blog} user={user} onClick={() => handleOnClick(blog)} />
                        ))}
                    </div>
                    <PageNumber totalBlogs={totalBlogs.current} setPage={setPage} page={page} />
                </>

                : <div className="flex flex-col items-center text-center min-h-screen justify-center">
                    <div className='drop-shadow-[2px_2px_4px_rgba(179,214,235,0.5)] text-white font-bold text-2xl sm:text-4xl font-serif sm:p-5'>No blogs found!</div>
                    <div className="items-center text-center text-white flex justify-center text-md font-serif"><a href='/create' className="inline p-2 underline text-blue-300">Create</a> your first blog👍</div>
                </div>
            }

        </div>
    );
}
