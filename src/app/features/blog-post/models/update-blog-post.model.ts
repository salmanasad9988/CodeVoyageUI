export interface UpdateBlogPost {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedDate: Date;
    isPublic: boolean;
    categoryIds: string[];
}