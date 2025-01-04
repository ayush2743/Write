import { LogIn, LogOut } from "lucide-react";
import icon from "../../../src/assets/icon.png";
import { useNavigate } from "react-router-dom";



export default function Navbar({ home }: { home: boolean }) {

    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    function handleLogout() {
        //add reload to clear the cache
        window.location.reload();
        localStorage.removeItem('jwt');
        sessionStorage.clear();
        navigate('/signin', { replace: true });
    }

    function handleLogin() {
        navigate('/signin');
    }

    function handleCreate() {
        navigate('/create');
    }

    function handleMyself() {
        navigate('/myself');
    }


    return (
        <nav className="  flex items-center justify-between w-11/12 sm:w-4/5 px-4 sm:px-6 py-4 mx-auto mt-4 bg-white shadow-md rounded-lg bg-opacity-20">
            <a className="flex items-center" href="/">
                <img src={icon} alt="Write Icon" className="w-6 h-6 mr-2 sm:w-8 sm:h-8" />
                <h1 className="text-xl sm:text-2xl text-white font-extrabold font-body">
                    Write
                </h1>
            </a>
            <div className="flex space-x-4 pt-1 font-bold font-serif text-sm sm:text-md sm:space-x-7">
                <div className="flex items-center text-white cursor-pointer hover:underline">
                    <span onClick={handleCreate}>Create</span>
                </div>
                {home ? (
                    <div className="flex items-center text-white cursor-pointer hover:underline">
                        <span onClick={() => navigate('/blogs')}>Home</span>
                    </div>
                ) : <div className="flex items-center text-white cursor-pointer hover:underline">
                    <span onClick={handleMyself}>Myself</span>
                </div>
                }
                <div className="flex items-center text-white cursor-pointer hover:underline">
                    { token ? 
                        <><LogIn size={15} className="mr-2 mb-0.5 text-white" />
                        <span className="hidden sm:block" onClick={handleLogout}>Logout</span></> :

                        <><LogOut size={15} className="mr-2 mb-0.5 text-white" />
                        <span className="hidden sm:block" onClick={handleLogin}>Login</span></>
                    }
                </div>
            </div>
        </nav>
    )
}