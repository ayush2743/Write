
export default function Heading({ title }: { title: string }) {

    return (
        <h1 className="mb-8 text-5xl sm:text-6xl font-bold text-left font-serif">{title}</h1>
    );
}