import { useRecoilValueLoadable } from "recoil";
import { singleBlogAtom } from "../atoms/singleBlogAtom";
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


interface Blog {
    id: string;
    title: string;
    description: string;
    content: string;
    published: boolean;
    authorId: string;
    publishedAt: string; // Use Date if handling as Date
    updatedAt: string; // Use Date if handling as Date
    author: {
        name: string;
    };
}


export default function SingleBlog() {


    const value = useRecoilValueLoadable(singleBlogAtom);
    const id = useParams().id;
    const [blog, setBlog] = useState<Blog>({
        id: '',
        title: '',
        description: '',
        content: '',
        published: false,
        authorId: '',
        publishedAt: '',
        updatedAt: '',
        author: {
            name: ''
        }
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (value.state === 'hasValue' && value.contents.id !== '') {
            setBlog(value.contents);
        } else {
            async function fetchBlog() {
                const BACKEND_URL = "http://127.0.0.1:8787/api/v1"

                try {
                    const res = await axios.get(`${BACKEND_URL}/blog/${id}`);
                    setBlog(res.data.blog);
                } catch (error: any) {
                    setError(error.response.data.error);
                    throw new Error('Failed to fetch blog..');
                }
            }

            fetchBlog();
        }
    }, [value, id]);
    


    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold font-serif text-black">{blog.title}</h1>
            <p className="text-lg text-gray-400">{blog.description}</p>
            <div className="mb-14"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content),
                }}
            />
            <p className="text-lg text-gray-400">{blog.content}</p>
            <p className="text-lg text-gray-400">{blog.author.name}</p>
            {blog.publishedAt && <p className="text-lg text-gray-400">{new Date(blog.publishedAt).toLocaleDateString()}</p>}
            
            {error && <div>{error}</div>}
        </div>
    )
}

