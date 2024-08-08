import { getCookie } from "../hooks/useCookies";
import { useEffect, useState } from "react";
import MainLogged from "./Main.Logged";
import MainNoLogged from "./Main.NoLogged";

export default function Main() {
    const [logged, setLogged] = useState<boolean | null>(null);

    useEffect(() => {
        setLogged(getCookie("access_token") !== null);
    }, []);

    return (
        <>
            {logged !== null ? (
                logged ? (
                    <MainLogged />
                ) : (
                    <MainNoLogged />
                )
            ) : (
                <div></div>
            )}
        </>
    );
}
