import { useEffect, useState } from "react";

export default function useDebounce(value : string) {

    const [debounceValue, setDebounceValue] = useState<string>(value)

    useEffect(() => {

        const time = setTimeout(() => {
            setDebounceValue(value);
        }, 600);

        return () => {
            clearTimeout(time);
        }

    }, [value])

    return debounceValue;

}