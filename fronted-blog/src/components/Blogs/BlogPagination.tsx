import { blogAtomFamily } from '../../atoms/blogAtom';
import { useRecoilValueLoadable } from 'recoil';
import { useState, useRef } from 'react';
import Content from './Content';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';
import PageNumber from './PageNumber';


export default function BlogPagination({edit}: {edit: boolean}) {
    const [page, setPage] = useState<number>(1);
    const totalBlogs = useRef<number>(3);
    const navigate = useNavigate();

    const blogsLoadable = useRecoilValueLoadable(blogAtomFamily(page));

    if (blogsLoadable.state === 'loading') {
        return (
            <>
                <Skeleton />
                <PageNumber totalBlogs={totalBlogs.current} setPage={setPage} page={page} />
            </>
        )
    }

    if (blogsLoadable.state === 'hasError') {

        console.log(blogsLoadable.contents.response.data.error);

        if (blogsLoadable.contents.message === 'No authentication token found') {
            navigate('/signin');
        } else if (blogsLoadable.contents.response.data.error === 'Error while authorization') {
            console.log('Error while authorization');
            navigate('/signin');
        }

        window.location.reload();

        return (
            <>
                <div className='text-white flex justify-center text-4xl font-serif'>{blogsLoadable.contents.message}🥲</div>
                <div className='m-4 text-white flex justify-center text-1xl font-serif'>Please reload the page 🔄️</div>
            </>
        );
    }

    const blogsData = blogsLoadable.contents;

    const blogs = blogsData.blogs;
    totalBlogs.current = blogsData.totalBlogs;

    return (
        <div className="flex flex-col">
            <div className="grid max-w-5xl grid-cols-2 gap-x-14 gap-y-16 mx-auto">
                {blogs.map((blog: any, index: number) => (
                    <Content key={blog.id} index={index} blogs={blog} edit={edit}/>
                ))}
            </div>
        
            <PageNumber totalBlogs={totalBlogs.current} setPage={setPage} page={page} />
        </div>
    );
}
