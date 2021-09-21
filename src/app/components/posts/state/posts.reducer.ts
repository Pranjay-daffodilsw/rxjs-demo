import { Action, createReducer } from "@ngrx/store";
import { initialState, PostsState } from "./posts.state";


export const postsReducer = createReducer(initialState);