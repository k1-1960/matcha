import { useEffect, useState } from "react";
import uploadMedia from "../hooks/uploadMedia";

export default function Debug() {
    const [url, setUrl] = useState<string | null>(null);
    const [category, setCategory] = useState<
        "profile_picture" | "profile_banner" | "post_media" | null
    >(null);

    const onChange = (event: any) => {
        setCategory(event.target.value);
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        let file = event.target.image.files[0];

        uploadMedia(file, category || "post_media").then((message) => {
            setUrl(
                message.attachments.map((attachment: any) => attachment.url)[0]
            );
        });
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-56">
            <input
                type="file"
                name="image"
                id="image"
                accept="image/jpeg, image/jpg,image/gif, image/png, image/apng, image/tiff"
            />

            {url && <p>URL: {url}</p>}
            {url && <img src={url} alt="banner" />}

            <select name="category" id="category" onChange={onChange}>
                <option value="profile_picture">Profile Picture</option>
                <option value="profile_banner">Profile Banner</option>
                <option value="post_media">Post Media</option>
            </select>
            <button type="submit">Enviar</button>
        </form>
    );
}
