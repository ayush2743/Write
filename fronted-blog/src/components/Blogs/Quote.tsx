import { QuoteIcon } from 'lucide-react';

export default function Quote() {
    return (
        <div className="  w-full mt-20 px-4 py-6 text-center text-white bg-quotebg bg-cover bg-center">
            <QuoteIcon className="mx-auto mb-4" size={32} />
            <blockquote className="max-w-xl mx-auto text-lg sm:text-2xl italic">
                "As we look ahead into the next century, leaders will be those who empower others."
            </blockquote>
            <p className="mt-4 text-sm sm:text-lg opacity-80">- Bill Gates</p>
        </div>
    );
}
