export interface ProfileData {
    username: string;
    pfp: string;
    dates: string[];
}

export type ProfileHistory = Record<string, ProfileData[]>;
