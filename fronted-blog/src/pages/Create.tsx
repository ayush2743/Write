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




function Create() {

    const token = localStorage.getItem('jwt');

    return (
        <div className="overflow-x-hidden min-h-screen  bg-loginPage  bg-contain bg-no-repeat bg-black">
            <Bubbles />
            <Navbar home={false} />
            <div className='flex justify-center'>
                {token ? <Contents token={token} /> :
                    <div className="flex flex-col items-center min-h-screen text-center justify-center">
                        <div className='drop-shadow-[2px_2px_4px_rgba(179,214,235,0.5)] text-white font-bold text-xl sm:text-4xl font-serif sm:p-5'>No authentication token found 😪</div>
                        <div className="items-center text-center text-white flex justify-center text-md font-serif">Please <a href='/signin' className="inline p-2 underline text-blue-300">Login</a> to create a blog 👍  </div>
                    </div>}
            </div>
            <Quote />
            <Footer />
        </div>);
}


function Contents({ token }: { token: string }) {

    const [postBody, setPostBody] = useState<PostBlogBody>({
        title: "",
        content: "",
        description: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit() {
        const BACKEND_URL = "https://backend-blog.saxenaayush27-work.workers.dev/api/v1";

        try {

            setLoading(true);

            if (postBody.title === '' || postBody.content === '' || postBody.description === '') {
                setError('All fields are required');
                setTimeout(() => setError(null), 4000);
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/blog/post`, postBody, {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.data.blog) {
                window.location.href = '/blogs';
            }
        } catch (e: any) {
            if (e.message === 'No authentication token found') {
                setError('Please login to create a blog');
                setTimeout(() => setError(null), 4000);
                return;
            }
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
                <Input placeholder="Write you title here.." onChange={(e) => {
                    setPostBody({ ...postBody, title: e.target.value })
                }} />
            </div>
            <div>
                <Heading text="Description" />
                <Input placeholder="Write you description here.." onChange={(e) => {
                    setPostBody({ ...postBody, description: e.target.value })
                }} />
            </div>
            <div>
                <Heading text="Content" />
                <BlogEditor postBody={postBody} setPostBody={setPostBody} />
            </div>
            <button className="mt-28 sm:mt-24  w-2/4 flex justify-between items-center text-gray-200  border-2  border-gray-200  px-4 py-2  rounded-lg font-serif hover:shadow-gray-100 hover:shadow-md"
                onClick={handleSubmit}>
                <span>{loading ? 'Processing...' : 'Create'}</span>
                {loading ? <LoaderCircle size={15} className="animate-spin" /> : <SendHorizontal size={15} />}
            </button>
            {error &&
                <button className="m-6 w-2/4 bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-md text-center font-normal">
                    {error}
                </button>}
        </div>
    )
}

export default Create;