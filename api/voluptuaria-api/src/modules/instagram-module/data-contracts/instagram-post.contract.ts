export interface InstagramPostContract {
    url: string;
    caption: string;
    hashtags: string[];
    location: string;
    timestamp: string;
    likes: string;
    comments: number;
    type: 'video' | 'image';
}

export interface InstagramProfileContract {
    username: string;
    totalPosts: number;
    analyzedPosts: number;
}

export interface InstagramScrapingResult {
    profile: InstagramProfileContract;
    posts: InstagramPostContract[];
} 