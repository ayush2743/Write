import { QuoteIcon } from 'lucide-react';
export default function Quote() {
    return (
        <div className="w-full mt-20 px-4 py-4 text-center text-white  bg-quotebg bg-cover overflow-hidden opa">
                <QuoteIcon className="mx-auto m-4" size={28} />
                <blockquote className="max-w-xl mx-auto text-2xl  italic">
                    "As we look ahead into the next century, leaders will be those who empower others."
                </blockquote>
                <p className="m-4 text-md opacity-80">- Bill Gates</p>
            </div>
    )
}