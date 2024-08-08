import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { SolidButton } from "../components/Buttons";

export default function MainNoLogged() {
    const [form, setForm] = useState<"register" | "login" | null>(null);
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <div className="flex flex-col items-center h-auto min-h-[30rem] transition-transform w-11/12 md:w-1/3 bg-slate-200 py-12 rounded-xl text-stone-900 justify-center">
                <div className="flex flex-col items-center justify-center mb-12 h-16">
                    <img
                        src="/images/icon-nobg.png"
                        className="size-32 mx-auto rounded-full"
                        alt="icon"
                    />
                </div>
                {form === null ? (
                    <div className="flex flex-col justify-center items-center backdrop-blur-md w-10/12">
                        <SolidButton
                            onClick={() => setForm("register")}
                            className="w-full"
                        >
                            Registrarse
                        </SolidButton>
                        <div className="flex flex-row items-center gap-2 my-2">
                            <div className="border border-1 border-blue-300 w-28"></div>
                            <div className="text-blue-500">o</div>
                            <div className="border border-1 border-blue-300 w-28"></div>
                        </div>
                        <SolidButton
                            onClick={() => setForm("login")}
                            className="w-full"
                        >
                            Iniciar sesión
                        </SolidButton>
                    </div>
                ) : form === "register" ? (
                    <RegisterForm onBack={() => setForm(null)} />
                ) : (
                    <LoginForm onBack={() => setForm(null)} />
                )}
            </div>
        </div>
    );
}
