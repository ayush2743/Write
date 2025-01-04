
export default function Heading({ title }: { title: string }) {

    return (
        <h1 className="drop-shadow-[2px_2px_4px_rgba(179,214,235,0.5)] mb-8 text-5xl sm:text-6xl font-bold text-left font-serif">{title}</h1>
    );
}