import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState, POST_STATE_KEY } from "./posts.state";


const getPostsState = createFeatureSelector<PostsState>(POST_STATE_KEY);

export const getPosts = createSelector(getPostsState, state => {
  return state.posts
})

export const getPostById = (id: string) => (createSelector(
  getPostsState,
  (state) => {
    return state.posts.find((post) => post.id === id)
  })
)