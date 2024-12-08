import { useRecoilValueLoadable } from "recoil";
import { singleBlogAtom } from "../atoms/singleBlogAtom";


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

    const blog : Blog = value.contents;

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold font-serif text-black">{blog.title}</h1>
            <p className="text-lg text-gray-400">{blog.description}</p>
            <p className="text-lg text-gray-400">{blog.content}</p>
            <p className="text-lg text-gray-400">{blog.author.name}</p>
            <p className="text-lg text-gray-400">{blog.publishedAt}</p>
        </div>
    )
}
