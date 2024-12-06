import { LogOut, LogIn } from "lucide-react";
import icon from "../../../src/assets/icon.png";
import { useNavigate } from "react-router-dom";



export default function Navbar({ home }: { home: boolean }) {

    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    function handleLogout() {
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
        <nav className="flex items-center justify-between w-4/5 px-6 py-4 mx-auto mt-4 bg-white shadow-md rounded-lg bg-opacity-20">
            <div className="flex items-center">
                <img src={icon} alt="Write Icon" className="w-8 h-8 mr-2" />
                <h1 className="text-2xl text-white font-extrabold font-body">
                    Write
                </h1>
            </div>
            <div className="flex space-x-7 font-bold font-serif text-md">
                <div className="flex items-center text-white cursor-pointer hover:underline">
                    <span>Create</span>
                </div>
                { home ? (
                    <div className="flex items-center text-white cursor-pointer hover:underline">
                        <span onClick={() => navigate('/blogs')}>Home</span>
                    </div>
                ) : <div className="flex items-center text-white cursor-pointer hover:underline">
                        <span onClick={handleMyself}>Myself</span>
                    </div>
                }
                <div className="flex items-center text-white cursor-pointer hover:underline">
                    {token ? (
                        <>
                            <LogIn size={15} className="mr-2 mb-0.5 text-white" />
                            <span onClick={handleLogout}>Logout</span>
                        </>) : (
                        <>
                            <LogOut size={15} className="mr-2 mb-0.5 text-white" />
                            <span onClick={handleLogin}>Login</span>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}