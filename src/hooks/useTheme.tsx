import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    const toggleTheme = () => {
        if (theme === "light") {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    };

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    return {
        theme,
        toggleTheme,
    };
};
