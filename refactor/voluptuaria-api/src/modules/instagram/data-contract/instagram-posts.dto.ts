/**
 * Instagram extracted post data contract
 */
export class InstagramPostsDto{
    url: string
    caption: string
    hashtags: string[]
    location: string
    timestamp: string
    likes: string
    comments: number
    type: "video" | "image"
}
