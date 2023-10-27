import { Category } from "../../category/models/category.model";

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedDate: Date;
    isPublic: boolean;
    urlHandle: string;
    categories: Category[];
}