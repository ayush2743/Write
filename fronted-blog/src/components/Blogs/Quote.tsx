import { QuoteIcon } from 'lucide-react';
export default function Quote() {
    return (
        <div className="w-full mt-20 px-4 py-4 text-center text-white  bg-quotebg bg-cover bg-center overflow-hidden">
                <QuoteIcon className="mx-auto m-4" size={30} />
                <blockquote className="max-w-xl mx-auto text-2xl italic">
                    "As we look ahead into the next century, leaders will be those who empower others."
                </blockquote>
                <p className="m-4 text-lg opacity-80">- Bill Gates</p>
            </div>
    )
}