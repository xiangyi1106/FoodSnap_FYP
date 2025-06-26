import { useEffect } from "react";

export default function useClickOutside(ref, excludeRefs, fun) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target) || isDescendantOfProfileLink(e.target, excludeRefs)) {
                // If the clicked element is inside the ref element or the profile link, return early without calling the provided callback (fun).
                return;
            }

            fun();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, excludeRefs]);
}

//If the element is found to be a descendant of any element in excludeRefs, it returns true; otherwise, it returns false
function isDescendantOfProfileLink(element, excludeRefs) {
    for (const excludeRef of excludeRefs) {
        if (excludeRef.current && excludeRef.current.contains(element)) {
            return true;
        }
    }
    return false;
}