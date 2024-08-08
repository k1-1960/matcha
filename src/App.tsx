import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/main.css";
import Feed from "./pages/Feed";
import Main from "./pages/Main";
import Debug from "./pages/Debug";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <div className="w-screen h-full min-h-screen bg-zinc-900 text-white">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/debug" element={<Debug />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
