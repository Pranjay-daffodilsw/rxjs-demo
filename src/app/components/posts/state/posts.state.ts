import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/models/posts.model";

export const POST_STATE_KEY = 'posts';

export interface PostsState extends EntityState<Post> {
  count: number;
}

export function sortByName(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}

export const postsAdaptor = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: sortByName
});

export const initialState: PostsState = postsAdaptor.getInitialState({
  count: 0,
})