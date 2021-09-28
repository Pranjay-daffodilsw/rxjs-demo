import { Action, createReducer, on } from "@ngrx/store";
import { addPost, deletePost, loadPostsSuccess, updatePost } from "./posts.action";
import { initialState, PostsState } from "./posts.state";


export const postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = String(state.posts.length + 1);
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
  on(updatePost, (state, action) => {
    const posts = [...state.posts];
    posts[posts.findIndex((post) => { return post.id === action.post.id })] = action.post;
    return {
      ...state,
      posts
    }
  }),
  on(deletePost, (state, action) => {
    const posts = [...state.posts];
    const deletionOnIndex = posts.findIndex((post) => { return action.id === post.id })
    if (deletionOnIndex !== -1) {
      posts.splice(deletionOnIndex, 1);
    }
    return { ...state, posts };
  })
);