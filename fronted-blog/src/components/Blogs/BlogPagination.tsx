import { blogAtomFamily } from '../../atoms/blogAtom';
import { singleBlogAtom } from '../../atoms/singleBlogAtom';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { useState, useRef } from 'react';
import Content from './Content';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';
import PageNumber from './PageNumber';


export default function BlogPagination({edit}: {edit: boolean}) {
    const [page, setPage] = useState<number>(1);

    const totalBlogs = useRef<number>(3);
    const navigate = useNavigate();

    const blogsLoadable = useRecoilValueLoadable(blogAtomFamily({page, isUser: edit}));
    const [ singleBlog , setSingleBlog] = useRecoilState(singleBlogAtom);


    if (blogsLoadable.state === 'loading') {
        return (
            <>
                <Skeleton edit={edit}/>
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

    function handleDeleteBlog() {
        window.location.reload();
    }


    const blogs = blogsLoadable.contents.blogs;
    totalBlogs.current = blogsLoadable.contents.totalBlogs;


    function handleOnClick(blog : any) {
        setSingleBlog(blog);
        if(singleBlog) {
            navigate(`/blog`);
        }
    }


    return (
        <div className="flex flex-col">
            <div className="grid max-w-5xl grid-cols-2 gap-x-14 gap-y-16 mx-auto">
                {blogs.map((blog: any, index: number) => (
                    <Content key={blog.id} index={index} blogs={blog} edit={edit} onDelete={() => handleDeleteBlog()} onClick={() => handleOnClick(blog)}/>
                ))}
            </div>
        
            <PageNumber totalBlogs={totalBlogs.current} setPage={setPage} page={page} />
        </div>
    );
}
