

export default function Footer() {
    return (
        <footer className="py-12 text-gray-100 bg-black overflow-y-hidden">
            <div className="grid max-w-6xl grid-cols-4 gap-8 px-4 mx-auto">
                <div>
                    <h4 className="mb-4 font-bold">About Write</h4>
                    <p className="text-gray-400">
                        A platform for sharing stories, insights, and knowledge.
                    </p>
                </div>
                <div>
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
                <div>
                    <h4 className="mb-4 font-bold">Connect</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Twitter
                            </a>
                        </li>
                        <li></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Legal</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-400">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pt-6 mt-8 text-center border-t border-gray-700">
                <p>&copy; Created by Ayush Saxena 💛</p>
            </div>
        </footer>
    )
}