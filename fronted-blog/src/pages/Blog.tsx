
import Bubbles from "../components/Bubles";
import Navbar from "../components/Blogs/Navbar";
import Headings from "../components/Blogs/Headings";
import SearchElement from "../components/Blogs/Search";
import Quote from "../components/Blogs/Quote";
import Footer from "../components/Blogs/Footer";
import BlogPagination from "../components/Blogs/BlogPagination";
import { Navigate } from "react-router-dom";

const BlogPage = () => {

    if(localStorage.getItem('jwt') === null) {
        return <Navigate to="/signin" />
    }

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-y-hidden">
            <Bubbles />
            <div className="bg-loginPage bg-cover bg-center overflow-y-hidden">
                <Navbar home={false}/>
                <div className="flex flex-col items-center justify-center h-screen text-center overflow-y-hidden">
                    <Headings />
                    <SearchElement onChange={() => { }} />
                </div>
            </div>
            <div className="min-h-screen px-10 py-16 content-center overflow-y-hidden">
                <BlogPagination edit={false} />
            </div>
            <Quote />
            <Footer />
        </div>
    );
};


export default BlogPage;
