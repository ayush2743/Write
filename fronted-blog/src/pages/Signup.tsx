
import Bubles from '../components/Bubles';
import Heading from "../components/Authn/Heading";
import CheckReg from "../components/Authn/CheckReg";
import RegInput from "../components/Authn/RegInput";
import Button from "../components/Authn/Button";
import Error from '../components/Authn/Error';
import { useNavigate } from 'react-router-dom';
import { SignUpBody } from '@ayush27/common-blog';
import { useState, memo } from 'react';
import axios from 'axios';



function Signup() {


    return (
        <div className="relative h-screen overflow-hidden bg-center bg-cover bg-loginPage">

            <div className="z-10 flex items-center justify-center h-screen">
                <div className="w-full max-w-md p-10 text-white rounded-md z-10">
                    <Heading title="Sign Up," />
                    <CheckReg question="Already a member?" link="Sign In" />
                    <Inputs />
                </div>
                <Bubles />
            </div>
        </div>
    );
}


function Inputs() {
    const [signUpInputs, setSignUpInputs] = useState<SignUpBody>({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    async function submit() {
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8787/api/v1/user/signup", signUpInputs);
            localStorage.setItem("jwt", response.data.jwt);
            navigate("/blogs");
            
        } catch (e : any) {
            console.log(e);
            setError(e.response.data.error);
            setTimeout(() => setError(null), 4000); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <RegInput label="Username" type="text" onChange={(e) => {
                setSignUpInputs({ ...signUpInputs, name: e.target.value });
            }} placeholder="Enter your username" color="focus:border-yellow-100" />
            <RegInput label="Email" type="email" onChange={(e) => {
                setSignUpInputs({ ...signUpInputs, email: e.target.value });
            }} placeholder="Enter your email" color="focus:border-purple-300" />
            <RegInput label="Password" type="password" onChange={(e) => {
                setSignUpInputs({ ...signUpInputs, password: e.target.value });
            }} placeholder="Enter your password" color="focus:border-blue-300" />
            {error && <Error text={error} />}
            <Button text="Continue." handleCLick={submit} loading={loading} />
        </>
    )
}

const MemoSignup = memo(Signup);
export default MemoSignup;