import Bubbles from "../components/Bubles";

export default function Error() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-loginPage bg-contain sm:bg-cover bg-no-repeat bg-black overflow-hidden">
            <Bubbles />
            <h1 className="mb-8  mx-9  text-6xl sm:text-7xl font-bold font-serif text-white">
                Error 404
            </h1>
            <p className="mb-10 text-xl text-gray-400 font-serif">
                Page not found 🥲
            </p>
        </div>

    )
}