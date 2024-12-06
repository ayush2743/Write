import { Navigate } from "react-router-dom"
import Bubbles from "../components/Bubles"
import Navbar from "../components/Blogs/Navbar"
import Headings from "../components/MyBlogs/Headings"
import SearchElement from "../components/Blogs/Search"
import Quote from "../components/Blogs/Quote"
import Footer from "../components/Blogs/Footer"
import BlogPagination from "../components/Blogs/BlogPagination"


export default function MySelf() {

    if (localStorage.getItem('jwt') === null) {
        return <Navigate to="/signin" />
    }

    return (
        <div className="flex flex-col  bg-loginPage bg-contain bg-no-repeat bg-black overflow-y-hidden">
            <Bubbles />

            {/* Navbar */}
            <div className=" overflow-y-hidden">
                <Navbar home={true}/>
                <div className="mx-auto flex flex-col items-left w-4/5 justify-center text-center overflow-y-hidden">
                    <Headings />
                    <div className="m-7 flex justify-center">
                        <SearchElement onChange={() => { }} />
                    </div>
                </div>
                <div className="min-h-screen px-10 py-16 content-center overflow-y-hidden">
                    <BlogPagination edit={true}/>
                </div>
            </div>
            <Quote />
            <Footer />
        </div>

    )
}