export default function Headings({ text }: { text: string }) {
    return (
        <h1 className="drop-shadow-[2px_2px_4px_rgba(179,214,235,0.5)] text-left pl-1 pb-3 text-2xl sm:text-3xl font-bold font-serif text-white">
            {text}
        </h1>
    );
}
