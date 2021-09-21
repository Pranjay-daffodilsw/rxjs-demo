import { Post } from "src/app/models/posts.model";

export interface PostsState {
  posts: Array<Post>
}


export const initialState: PostsState = {
  posts: [
    { id: 1, title: 'sample title 1', description: 'sample description 1' },
    { id: 1, title: 'sample title 1', description: 'sample description 1' },
  ]
}