import { useEffect, useRef, useState } from "react";

export default function useComponentVisible(
    initial: boolean,
    onClose: () => void
) {
    const [visible, setVisible] = useState<boolean>(initial);
    const ref = useRef(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setVisible(false);
            onClose();
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisible(false);
            onClose();
        }
    };

    useEffect(() => {
        if (visible) {
            document.addEventListener("keydown", handleHideDropdown);
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("keydown", handleHideDropdown);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [visible]);

    return { ref, visible, setVisible };
}
