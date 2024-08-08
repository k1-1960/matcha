import axios from "axios";
import { eraseCookie, getCookie } from "./useCookies";
import { useEffect, useState } from "react";
import User from "../types/User";

export default function useCheckForSession() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        let token = getCookie("access_token");
        if (token) {
            axios
                .get(process.env.REACT_APP_API + "/users/@me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    eraseCookie("access_token");
                    window.location.href = "/";
                });
        } else {
            window.location.href = "/";
        }
    }, []);

    return { user };
}
