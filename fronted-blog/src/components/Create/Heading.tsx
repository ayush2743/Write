export default function Headings({text} : {text: string}) {
    return (
        <>
            <h1 className=" text-left pl-1 pb-3 text-3xl font-bold font-serif text-white">
            {text}
            </h1>
        </>
    );
}
