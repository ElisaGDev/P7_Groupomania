import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./posts.reducer";
import errorReducer from "./error.reducer";
import allPostsReducer from "./allPosts.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
  allPostsReducer,
});
