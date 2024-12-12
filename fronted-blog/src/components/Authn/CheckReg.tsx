interface CheckRegProps {
    question: string;
    link: string;
}

export default function CheckReg({ question, link }: CheckRegProps) {
    return (
        <div className="flex flex-col mb-8 ml-1">
        <p className="text-gray-200 text-md">
            {question}{"  "} 
            <a
                href={link === "Sign In" ? "/signin" : "/signup"}
                className="ml-1 font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-blue-300 font-head hover:underline"
            >
                {link}
            </a>
        </p>
    </div>
)};