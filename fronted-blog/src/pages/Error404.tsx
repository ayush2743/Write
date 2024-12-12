import Bubbles from "../components/Bubles";

export default function MySelf() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-loginPage bg-cover bg-no-repeat bg-black overflow-x-hidden">
            <Bubbles />
            <h1 className="mb-8  mx-9 text-6xl font-bold font-serif text-white">
                Error 404
            </h1>
            <p className="mb-10 text-xl text-gray-400 font-serif">
                Page not found 🥲
            </p>
        </div>

    )
}