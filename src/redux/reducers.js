import { CREATE_POST, DELETE_POST, TOGGLE_THEME, EDIT_POST } from './actionTypes';

const initialState = {
  posts: [],
  theme: 'light', // default theme
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, { ...action.payload, history: [] }],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
      case EDIT_POST:
      const updatedPosts = state.posts.map(post => {
        if (post.id === action.payload.id) {
          // Save current state to history before updating
          return {
            ...action.payload,
            history: [
              ...post.history,
              {
                title: post.title,
                description: post.description,
                content: post.content,
              },
            ],
          };
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default rootReducer;
