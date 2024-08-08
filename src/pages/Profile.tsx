import useCheckForSession from "../hooks/checkForSession";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../hooks/useCookies";
import Post from "../components/Post";
import PostType from "../types/Post";

export default function Profile() {
    const { user } = useCheckForSession();
    const token = getCookie("access_token");
    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (
            user &&
            typeof user !== null &&
            typeof page === "number" &&
            page > 0
        ) {
            axios
                .get(process.env.REACT_APP_API + "/posts", {
                    params: {
                        items: 12,
                        page: page,
                        author: user._id,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setPosts((prev) => [...prev, ...res.data.posts]);
                });
        }
    }, [user, page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 10 >=
            document.body.scrollHeight
        ) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return user ? (
        <main className="w-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center w-screen md:w-1/2">
                <UserHeader
                    avatarURL={user.avatarURL || "/images/default-avatar.png"}
                    bannerURL={user.bannerURL || "/images/default-banner.png"}
                    username={user.username}
                    displayname={user.displayName}
                    gender={user.gender}
                    age={user.age}
                />
                <div className="px-4">
                    <UserBio
                        className="w-full text-sm font-light text-stone-300 bg-black/20 p-2 rounded-lg mb-4 mt-4"
                        bio={user.bio?.replace(/\n/g, "<br />") || ""}
                    />
                    <h2 className="text-stone-500 text-xl">Publicaciones</h2>
                    {posts.map((post, index) => {
                        post.author = user.username;
                        return <Post key={index} {...post} />;
                    })}
                </div>
            </div>
        </main>
    ) : (
        <div className="flex flex-col items-center justify-center">
            <Spinner />
        </div>
    );
}

function UserBio({ bio, className }: { bio: string; className?: string }) {
    return (
        <div
            className={"flex flex-col justify-center" + className}
            dangerouslySetInnerHTML={{ __html: bio }}
        ></div>
    );
}

function UserHeader({
    avatarURL,
    bannerURL,
    username,
    displayname,
    gender,
    age,
}: {
    avatarURL: string;
    bannerURL: string;
    username: string;
    displayname: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    age: number;
}) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="overflow-hidden h-32 w-full bg-black border-none outline-none flex items-center justify-center">
                <img
                    src={
                        "https://i.pinimg.com/564x/f3/08/64/f3086411d4911da2a17e506ec2ea81d5.jpg"
                    }
                />
            </div>
            <div className="w-full px-4 flex flex-col justify-center relative -top-16 -mb-16 z-10">
                <Avatar src={avatarURL} size={128} className="rounded-full" />
                <div className="flex flex-col justify-center mt-2">
                    <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
                        {displayname}
                        {gender ? (
                            <Chip
                                className="h-4 font-medium text-[0.75rem] text-blue-400/90 bg-blue-700/20 px-1 rounded-full flex items-center justify-center"
                                label={
                                    <GenderIcon
                                        size={12}
                                        gender={gender}
                                        content={age ? age.toString() : "16"}
                                        className="gap-1"
                                    />
                                }
                            />
                        ) : (
                            ""
                        )}
                    </h1>
                    <p
                        className="text-sm font-mono font-light text-blue-400"
                        onClick={() => copyToClipboard(username)}
                    >
                        @{username}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Avatar({
    src,
    alt,
    className,
    size,
}: {
    src: string;
    alt?: string;
    className?: string;
    size?: number;
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            width={size}
            height={size}
        />
    );
}

function Chip({
    label,
    className,
}: {
    label: string | JSX.Element;
    className?: string;
}) {
    return <div className={className}>{label}</div>;
}

function GenderIcon({
    size = 24,
    gender,
    className,
    content,
}: {
    size?: number | string;
    className?: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    content?: JSX.Element | string;
}): JSX.Element {
    switch (gender) {
        case "MALE":
            return (
                <div
                    className={
                        "flex flex-row items-center justify-center " + className
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M442 48h-90a22 22 0 0 0 0 44h36.89l-60.39 60.39c-68.19-52.86-167-48-229.54 14.57C31.12 234.81 31.12 345.19 99 413a174.21 174.21 0 0 0 246 0c62.57-62.58 67.43-161.35 14.57-229.54L420 123.11V160a22 22 0 0 0 44 0V70a22 22 0 0 0-22-22M313.92 381.92a130.13 130.13 0 0 1-183.84 0c-50.69-50.68-50.69-133.16 0-183.84s133.16-50.69 183.84 0s50.69 133.16 0 183.84"
                        />
                    </svg>
                    <a className="">{content ? content : "Hombre"}</a>
                </div>
            );
            break;
        case "FEMALE":
            return (
                <div
                    className={
                        "flex flex-row items-center justify-center " + className
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M430 190c0-95.94-78.06-174-174-174S82 94.06 82 190c0 88.49 66.4 161.77 152 172.61V394h-36a22 22 0 0 0 0 44h36v36a22 22 0 0 0 44 0v-36h36a22 22 0 0 0 0-44h-36v-31.39c85.6-10.84 152-84.12 152-172.61m-304 0c0-71.68 58.32-130 130-130s130 58.32 130 130s-58.32 130-130 130s-130-58.32-130-130"
                        />
                    </svg>
                    <a className="text-xs">{content ? content : "Mujer"}</a>
                </div>
            );
            break;
        case "OTHER":
            return (
                <div
                    className={
                        "flex flex-row items-center justify-center " + className
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M13 3h-2v2.27L9.04 4.13l-1 1.74L10 7L8.04 8.13l1 1.74L11 8.73v3.37a5 5 0 1 0 2 0V8.73l1.96 1.14l1-1.74L14 7l1.96-1.13l-1-1.74L13 5.27zm-1 17c-1.65 0-3-1.35-3-3s1.35-3 3-3s3 1.35 3 3s-1.35 3-3 3"
                        />
                    </svg>
                    <a className="text-xs">{content ? content : "Otro"}</a>
                </div>
            );
            break;

        default:
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 32 32"
                >
                    <path
                        fill="currentColor"
                        d="M29.391 14.527L17.473 2.609C17.067 2.203 16.533 2 16 2s-1.067.203-1.473.609L2.609 14.527C2.203 14.933 2 15.466 2 16s.203 1.067.609 1.473L14.526 29.39c.407.407.941.61 1.474.61s1.067-.203 1.473-.609L29.39 17.474c.407-.407.61-.94.61-1.474s-.203-1.067-.609-1.473M21 18H11v-4h10z"
                    />
                    <path fill="none" d="M11 14h10v4H11z" />
                </svg>
            );
            break;
    }
}

const copyToClipboard = (text: string) => {
    let textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};
