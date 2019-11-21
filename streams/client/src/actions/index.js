import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // Programmatic navigation
  history.push("/"); //"/ "is the root route - navigate the user
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

// The purpose of this action is to update the JSON API server with the form input from the user and then make sure our Redux store gets updated with the response data from that request.

// formValues are passed into the action here:

// onSubmit = formValues => {
//     this.props.onSubmit(formValues);
// };

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
