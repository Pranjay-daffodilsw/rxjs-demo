import { Action, createReducer, on } from "@ngrx/store";
import { addPost } from "./posts.action";
import { initialState, PostsState } from "./posts.state";


export const postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1);
    return {
      ...state,
      posts: [...state.posts, post]
    }
  })
);