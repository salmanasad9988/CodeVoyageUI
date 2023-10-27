export interface AddBlogPost {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedDate: Date;
    isPublic: boolean;
    urlHandle: string;
    categoryIds: string[];
}