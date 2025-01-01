import { useEffect } from "react";

// we will use this hook in case the user refresh teh page befor the changes are saved ( defor the delay mentioned in the useDebounce hook 250 ms)
export default function useUnloadWarning(condition = true) {
    useEffect(() => {
        if(!condition) return;

        const listener = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        }

        // activate the listener
        window.addEventListener("beforeunload", listener);

        return () => window.removeEventListener("beforeunload", listener);
    }, [condition]);
}