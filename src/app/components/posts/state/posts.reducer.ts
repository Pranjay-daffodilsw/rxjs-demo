import { createReducer, on } from "@ngrx/store";
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostsSuccess,
  updatePostSuccess
} from "./posts.action";
import { initialState } from "./posts.state";


export const postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    }
  }),
  on(updatePostSuccess, (state, action) => {
    const posts = [...state.posts];
    posts[posts.findIndex((post) => { return post.id === action.post.id })] = action.post;
    return {
      ...state,
      posts
    }
  }),
  on(deletePostSuccess, (state, action) => {
    const posts = [...state.posts];
    const deletionOnIndex = posts.findIndex((post) => { return action.id === post.id })
    if (deletionOnIndex !== -1) {
      posts.splice(deletionOnIndex, 1);
    }
    return { ...state, posts };
  })
);