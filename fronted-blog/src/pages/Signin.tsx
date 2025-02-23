import Heading from "../components/Authn/Heading";
import CheckReg from "../components/Authn/CheckReg";
import RegInput from "../components/Authn/RegInput";
import Button from "../components/Authn/Button";
import Bubles from "../components/Bubles";
import Error from "../components/Authn/Error";
import { useState , memo} from "react";
import { useNavigate } from "react-router-dom";
import { SignInBody } from "@ayush27/common-blog";
import axios from "axios";

function signin() {

    return (
        <div className="flex flex-col  bg-loginPage bg-contain sm:bg-cover bg-no-repeat bg-black  ">
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md p-10 text-white rounded-md z-10">
                    <Heading title="Sign In," />
                    <CheckReg question="Not a member?" link="Sign Up" />
                    <Inputs />
                </div>
                <Bubles />
            </div>
        </div>

    )
};

function Inputs() {

    const [signInInputs, setSignInInputs] = useState<SignInBody>({
        email: "",
        password: ""
    });
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function submit() {

        const BACKEND_URL = "https://backend-blog.saxenaayush27-work.workers.dev/api/v1";
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/user/signin`, signInInputs);
            console.log(response);
            localStorage.setItem("jwt", response.data.jwt);
            navigate("/blogs");
        } catch (e : any) {
            setError(e.response.data.error);
            setTimeout(() => setError(null), 4000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <RegInput label="Email" type="email" onChange={(e) => { 
                setSignInInputs({ ...signInInputs, email: e.target.value });
            }} placeholder="Ewan@gmail.com" color="focus:border-blue-300" />
            <RegInput label="Password" type="password" onChange={(e) => {
                setSignInInputs({ ...signInInputs, password: e.target.value });
             }} placeholder="123456" color="focus:border-purple-300" />
            {error && <Error text={error} />}
            <Button text="Continue." handleCLick={submit} loading={loading} />

        </>
    )
}

const Signin = memo(signin);
export default Signin;