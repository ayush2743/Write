import Bubbles from "../components/Bubles"
import Navbar from "../components/Blogs/Navbar"
import Headings from "../components/MyBlogs/Headings"
import Quote from "../components/Blogs/Quote"
import Footer from "../components/Blogs/Footer"
import BlogPagination from "../components/Blogs/BlogPagination"


export default function MySelf() {

    const token = localStorage.getItem('jwt');

    return (
        <div className="flex flex-col  bg-loginPage bg-contain bg-no-repeat bg-black  ">
            <Bubbles />

            {/* Navbar */}
            <div className="z-10">
                <Navbar home={true} />
                {token ? <>

                    <div className="mx-auto flex flex-col items-left w-4/5 justify-center text-center  ">
                        <Headings />
                    </div>
                    <div className="min-h-screen px-7 sm:px-10 py-16 content-center">
                        <BlogPagination user={true} /> :
                    </div>
                </> :
                    <div className="flex flex-col items-center text-center min-h-screen justify-center">
                        <div className='drop-shadow-[2px_2px_4px_rgba(179,214,235,0.5)] text-white font-bold text-xl sm:text-4xl font-serif sm:p-5'>No authentication token found 😪</div>
                        <div className="items-center text-center text-white flex justify-center text-md font-serif">Please <a href='/signin' className="inline p-2 underline text-blue-300">Login</a> to view your blogs 👍</div>
                    </div>

                }
            </div>
            <Quote />
            <Footer />
        </div>

    )
}