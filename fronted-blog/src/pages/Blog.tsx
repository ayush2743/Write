
import Bubbles from "../components/Bubles";
import Navbar from "../components/Blogs/Navbar";
import Headings from "../components/Blogs/Headings";
import SearchElement from "../components/Blogs/Search";
import Quote from "../components/Blogs/Quote";
import Footer from "../components/Blogs/Footer";
import BlogPagination from "../components/Blogs/BlogPagination";

const BlogPage = () => {
    
    return (
        <div className="flex flex-col  bg-loginPage bg-contain bg-no-repeat bg-black overflow-y-hidden">
            <Bubbles />

            {/* Navbar */}
            <div className="overflow-y-hidden">
                <Navbar home={false}/>
                <div className="mx-auto mb-20 flex flex-col items-left w-4/5 justify-center text-center overflow-y-hidden">
                    <Headings />
                    <div className="m-7 flex justify-center">
                        <SearchElement/>
                    </div>
                </div>
                <div className="min-h-screen px-10 py-16 content-center overflow-y-hidden">
                    <BlogPagination edit={false}/>
                </div>
            </div>
            <Quote />
            <Footer />
        </div>
    );
};


export default BlogPage;
