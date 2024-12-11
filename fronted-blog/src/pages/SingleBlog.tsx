import { useRecoilValueLoadable } from "recoil";
import { singleBlogAtom } from "../atoms/singleBlogAtom";
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Bubbles from "../components/Bubles";
import Navbar from "../components/Blogs/Navbar";
import Quote from "../components/Blogs/Quote";
import Footer from "../components/Blogs/Footer";
import formatDate from "../components/Blogs/Date";


export interface BlogInterface {
    id: string;
    title: string;
    description: string;
    content: string;
    published: boolean;
    authorId: string;
    publishedAt: string; 
    updatedAt: string; 
    author: {
        name: string;
    };
}


export default function SingleBlog() {


    const value = useRecoilValueLoadable(singleBlogAtom);
    const id = useParams().id;
    const [blog, setBlog] = useState<BlogInterface>({
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
                    throw new Error('Failed to fetch blog..');
                }
            }

            fetchBlog();
        }
    }, [value, id]);



    return (
        <div className="flex flex-col  bg-loginPage bg-contain bg-no-repeat bg-black overflow-x-hidden">

            <Bubbles />

            <div className=" overflow-x-hidden z-10">
                <Navbar home={true} />
                <div className="mx-auto mb-24 flex flex-col items-left w-4/5 justify-center text-center overflow-x-hidden">
                    <h1 className="text-6xl font-bold font-serif text-white mt-32 mb-8">{blog.title}</h1>
                    <p className="text-xl mb-16 font-serif text-gray-200">{blog.description}</p>
                    <div
                        className="custom-content mb-14 text-white pl-2 text-left"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog.content),
                        }}
                    />

                    <p className="text-lg text-right text-gray-400">- {blog.author.name}</p>


                    {blog.publishedAt === blog.updatedAt ? (
                        <p className="text-lg text-right text-gray-400">{formatDate(blog.publishedAt)}</p>
                    ) : (
                        <p className="text-lg text-right text-gray-400">Updated: {formatDate(blog.updatedAt)}</p>
                    )}                
                </div>
            </div>
            <Quote />
            <Footer />
        </div>
    )
}

