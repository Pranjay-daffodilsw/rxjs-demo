import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/state/router/custom-serializer";
import { getCurrentRoute } from "src/app/state/router/router.selector";
import { postsAdaptor, PostsState, POST_STATE_KEY } from "./posts.state";


const getPostsState = createFeatureSelector<PostsState>(POST_STATE_KEY);
export const postSelectors = postsAdaptor.getSelectors();

export const getPosts = createSelector(getPostsState, postSelectors.selectAll);

export const getPostEntities = createSelector(
  getPostsState,
  postSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null
  })
