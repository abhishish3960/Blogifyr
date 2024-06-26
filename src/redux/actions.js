// actions.js

import { CREATE_POST, DELETE_POST, EDIT_POST, TOGGLE_THEME } from './actionTypes';

export const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

export const editPost = (updatedPost) => ({
  type: EDIT_POST,
  payload: updatedPost,
});

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});
