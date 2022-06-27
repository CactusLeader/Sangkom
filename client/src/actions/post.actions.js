import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

export const getPosts = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_API_URL}posts`).then((res) => {
      dispatch({ type: GET_POSTS, payload: res.data });
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}posts/like-post/${postId}`, {
        id: userId,
      })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      });
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = (postId, userId) => async (dispatch) => {
  try {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}posts/unlike-post/${postId}`, {
        id: userId,
      })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}posts/${postId}`)
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (postId, message) => async (dispatch) => {
  try {
    await axios
      .put(`${process.env.REACT_APP_API_URL}posts/${postId}`, {
        message: message,
      })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      });
  } catch (err) {
    console.log(err);
  }
};
