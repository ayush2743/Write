export default function Footer() {
    return (
        <footer className="py-12 text-gray-100 bg-black overflow-y-hidden">
            <div className="max-w-6xl flex flex-col md:flex-row justify-between gap-8 px-10 mx-auto">
                <div className="mb-8 md:mb-0">
                    <h4 className="mb-4 font-bold">About Write</h4>
                    <p className="text-gray-400">
                        A platform for sharing stories, insights, and knowledge.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row justify-center">
                    <div className="mb-8 md:mb-0 md:ml-20">
                        <h4 className="mb-4 font-bold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    Create Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="md:ml-20">
                        <h4 className="mb-4 font-bold">Connect</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-400">
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="pt-6 mt-8 text-center border-t border-gray-700">
                <p>&copy; Created by Ayush Saxena 💛</p>
            </div>
        </footer>
    );
}