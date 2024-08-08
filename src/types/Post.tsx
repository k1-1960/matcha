interface MediaItem {
    source: string;
    nsfw: boolean;
}

interface Post {
    media: MediaItem[];
    content: string;
    likes: string[];
    comments: string[];
    author: string;
    visibility: "PUBLIC" | "PRIVATE";
    createdAt: Date;
    updatedAt: Date;
}

export default Post;
export type { MediaItem };
