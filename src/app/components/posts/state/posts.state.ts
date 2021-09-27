import { Post } from "src/app/models/posts.model";

export const POST_STATE_KEY = 'posts';

export interface PostsState {
  posts: Array<Post>
}


export const initialState: PostsState = {
  posts: []
}