import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/models/posts.model";

export const POST_STATE_KEY = 'posts';

export interface PostsState extends EntityState<Post> { }

export const postsAdaptor = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdaptor.getInitialState()