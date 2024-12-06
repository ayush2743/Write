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

function Signin() {

    return (

        <div className="relative h-screen overflow-hidden bg-center bg-cover bg-loginPage">
            <div className="z-50 flex items-center justify-center h-screen">
                <div className="w-full max-w-md p-10 text-white rounded-md ">
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
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8787/api/v1/user/signin", signInInputs);
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
            }} placeholder="Enter your email" color="focus:border-blue-300" />
            <RegInput label="Password" type="password" onChange={(e) => {
                setSignInInputs({ ...signInInputs, password: e.target.value });
             }} placeholder="Enter your password" color="focus:border-purple-300" />
            {error && <Error text={error} />}
            <Button text="Continue." handleCLick={submit} loading={loading} />

        </>
    )
}

const MemoSignin = memo(Signin);
export default MemoSignin;