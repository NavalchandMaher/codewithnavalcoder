import { BloggerBlogArr } from "./blogger-blog-arr.model";

export class BloggerBlog {

    id?: string | number;
    email?: string | undefined;
    userid?: string | undefined;
    bloggerBlogArr: Array<BloggerBlogArr> = new Array();

}
