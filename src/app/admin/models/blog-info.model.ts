import { BlogsInfoArr } from "./blogs-info-arr.model";

export class BlogInfo {

    id?: string | number;
    courseKeyword?: string | undefined;
    author?: any | undefined;
    blogInfoArr: Array<BlogsInfoArr> = new Array();
    
}
