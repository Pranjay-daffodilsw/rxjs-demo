import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/state/router/custom-serializer";
import { getCurrentRoute } from "src/app/state/router/router.selector";
import { PostsState, POST_STATE_KEY } from "./posts.state";


const getPostsState = createFeatureSelector<PostsState>(POST_STATE_KEY);

export const getPosts = createSelector(getPostsState, state => {
  return state.posts
})

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return (posts?.find((post) => post.id === route.params['id'])) ?? null
  })
