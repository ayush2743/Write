import Navbar from '../components/Blogs/Navbar';
import Bubbles from '../components/Bubles';
import Quote from '../components/Blogs/Quote';
import Footer from '../components/Blogs/Footer';
import axios from 'axios';
import { useState } from 'react';
import { PostBlogBody } from '@ayush27/common-blog';
import Input from '../components/Create/Input';
import Heading from '../components/Create/Heading';
import { LoaderCircle, SendHorizontal } from 'lucide-react';
import BlogEditor from '../components/Create/BlogEditor';
import { BlogInterface } from './SingleBlog';
import { useRecoilValue } from 'recoil';
import { singleBlogAtom } from '../atoms/singleBlogAtom';
import { useParams } from 'react-router-dom';




function Update() {

    const value = useRecoilValue(singleBlogAtom);
    return (
        <div className="min-h-screen  bg-loginPage  bg-contain bg-no-repeat bg-black overflow-x-hidden">
            <Bubbles />
            <Navbar home={true} />
            <div className='flex justify-center mx-auto'>
                <Contents blog = {value} />
            </div>
            <Quote />
            <Footer />
        </div>);
}


function Contents({blog} : {blog: BlogInterface}) {

    
    const id = useParams().id;
    const [postBody, setPostBody] = useState<PostBlogBody>({
        title: blog.title,
        content: blog.content,
        description: blog.description,
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit() {
        const BACKEND_URL = "http://127.0.0.1:8787/api/v1";

        try {

            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found');
            }
            setLoading(true);

            if(postBody.title === '' || postBody.content === '' || postBody.description === '') {
                setError('All fields are required');
                setTimeout(() => setError(null), 4000);
                return;
            }

            const response = await axios.put(`${BACKEND_URL}/blog/post`, 
                {
                    id : id, 
                    title: postBody.title, 
                    description: postBody.description,
                    content: postBody.content
                }, {
                headers: {
                    Authorization: `${token}`
                }
            });

            if(response.data.blog) {
                window.location.href = '/myself';
            }
        } catch (e: any) {
            setError(e.response.data.error);
            setTimeout(() => setError(null), 4000);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex flex-col items-center my-24">
            <div>
                <Heading text="Title" />
                <Input placeholder="Write you title here.." postBody={postBody.title} onChange={(e) => {
                    setPostBody({ ...postBody, title: e.target.value })
                }} />
            </div>
            <div>
                <Heading text="Description" />
                <Input placeholder="Write you description here.." postBody={postBody.description} onChange={(e) => {
                    setPostBody({ ...postBody, description: e.target.value })
                }} />            </div>
            <div>
                <Heading text="Content" />  
                <BlogEditor postBody={postBody} setPostBody={setPostBody} />
            </div>
            <button className="mt-24  w-2/4 flex justify-between items-center text-gray-200  border-2  border-gray-200  px-4 py-2  rounded-lg font-serif hover:shadow-gray-100 hover:shadow-md"
                onClick={handleSubmit}>
                <span>{loading ? 'Processing...' : 'Update'}</span>
                {loading ? <LoaderCircle size={15} className="animate-spin" /> : <SendHorizontal size={15} />}
            </button>
            {error &&
                <button className="m-6 w-2/4 bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-md text-center font-normal">
                    {error}
                </button>}
        </div>
    )
}

export default Update;