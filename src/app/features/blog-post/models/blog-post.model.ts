export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedDate: Date;
    isPublic: boolean;
}