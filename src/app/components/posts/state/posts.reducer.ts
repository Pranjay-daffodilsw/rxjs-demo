import { createReducer, on } from "@ngrx/store";
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostsSuccess,
  updatePostSuccess
} from "./posts.action";
import { initialState, postsAdaptor } from "./posts.state";


export const postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdaptor.addOne(action.post, {
      ...state,
      count: state.count + 1
    });
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdaptor.addMany(action.posts, {
      ...state,
      count: action.posts.length
    });
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdaptor.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, action) => {
    return postsAdaptor.removeOne(action.id, {
      ...state,
      count: state.count - 1
    });
  })
);