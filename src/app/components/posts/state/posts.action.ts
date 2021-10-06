import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";

const LOAD_POST_START = '[posts page] load post start';
const LOAD_POST_SUCCESS = '[posts page] load post success';
const ADD_POST_ACTION = '[posts page] add post action';
const ADD_POST_SUCCESS = '[posts page] add post success';
const UPDATE_POST_ACTION = '[posts page] update post action';
const UPDATE_POST_SUCCESS = '[posts page] update post success'
const DELETE_POST_ACTION = '[posts page] delete post action';
const DELETE_POST_SUCCESS = '[posts page] delete post success';

export const loadPosts = createAction(LOAD_POST_START);
export const loadPostsSuccess = createAction(LOAD_POST_SUCCESS, props<{ posts: Array<Post> }>());
export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: Update<Post> }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());
