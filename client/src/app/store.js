import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/user.reducer";
import usersReducer from "../reducers/users.reducer";
import postsReducer from "../reducers/post.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
