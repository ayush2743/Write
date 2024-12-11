import { PostBlogBody } from "@ayush27/common-blog";
import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "../../quill.css"; // Import Quill styles

function BlogEditor({ postBody, setPostBody }: { postBody: PostBlogBody, setPostBody: React.Dispatch<React.SetStateAction<PostBlogBody>> }) {

    const quillRef = useRef<ReactQuill>(null);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
            ],
        },
    }), []);


    function handleChange(value: string) {
        setPostBody({ ...postBody, content: value });
    }

    

    return (
        <>
            <div className=' flex justify-center'>
                <ReactQuill
                    ref={quillRef}
                    value={postBody.content}
                    onChange={(e) => handleChange(e)}
                    modules={modules}
                    style={{ height: "500px", width: "700px" }}
                    placeholder="Write your blog content here..."
                />
            </div>
        </>
    );
}

export default BlogEditor;