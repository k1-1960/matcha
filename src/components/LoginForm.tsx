import { useState } from "react";
import axios from "axios";
import { AtSign, Eye, EyeOff } from "react-feather";
import { setCookie } from "../hooks/useCookies";
import { LightButton, OutlineButton, SolidButton } from "./Buttons";

const LoginForm = (params?: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                process.env.REACT_APP_API + "/auth/login",
                {
                    username,
                    password,
                }
            );
            const { token, expires_in } = response.data;
            setCookie("access_token", token, expires_in);
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-11/12 md:w-3/4 bg-slate-400/30 dark:bg-black/20 backdrop-blur-md px-3 pt-8 pb-12 rounded-xl border border-1 border-stone-200 dark:border-white/50"
        >
            <h1 className="text-2xl font-bold text-center text-white mt-4">
                Bienvenido de nuevo a Matcha!
            </h1>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                    <AtSign size={20} strokeWidth={3} />
                </span>
                <input
                    autoComplete="username"
                    className="rounded-full border border-1 border-stone-200 dark:border-white p-2 w-full focus:outline-none focus:border-cyan-500 pl-9 font-bold text-blue-500"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    placeholder="Nombre de usuario"
                    required
                />
            </div>
            <div className="relative">
                <input
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    className="rounded-full border border-1 border-stone-200 dark:border-white p-2 w-full focus:outline-none focus:border-cyan-500 pr-10 font-mono"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                    {showPassword ? (
                        <EyeOff
                            className="text-blue-400"
                            size={20}
                            strokeWidth={3}
                        />
                    ) : (
                        <Eye
                            className="text-blue-400"
                            size={20}
                            strokeWidth={3}
                        />
                    )}
                </button>
            </div>
            <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full px-4 py-2 font-bold mt-8"
            >
                Iniciar sesión
            </button>
            <LightButton onClick={() => params.onBack()}>Volver</LightButton>
        </form>
    );
};

export default LoginForm;
