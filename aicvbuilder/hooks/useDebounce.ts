// save user inpuuts after x time from stop typing 
// to keep this hook reusable can can make it geeric <T> so we can pass anyvalue to it

// every time we change the value , we wanna return teh same values but after delay
import { useEffect, useState } from "react";

//250 ms is the default value for the delay
export default function useDebounce<T>(value: T, delay: number=250) {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    } , [value, delay]);

    return debounceValue;
}