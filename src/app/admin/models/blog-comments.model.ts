import { Comment } from "./comment.model";

export class BlogComments {
    id?: string | number;
    courseKeyword?: string | undefined;
    button_name?: string | undefined;
    likes?: string | number;
    sheres?: string | number;
    comments: Array<Comment> = new Array();
}
