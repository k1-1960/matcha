type Gender = "MALE" | "FEMALE" | "OTHER";
type AccountVisibility = "PUBLIC" | "PRIVATE";

interface User {
    username: string;
    displayName: string;
    email: string;
    passwordHash: string;
    gender: Gender;
    age: number;
    avatarURL?: string;
    bannerURL?: string;
    accountVisibility: AccountVisibility;
    posts: string[];
    bio?: string;
    _id: string;
}

export default User;
export type { Gender, AccountVisibility };
