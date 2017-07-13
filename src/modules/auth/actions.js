import axios from 'axios';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
} from './actionTypes';

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
  return function(dispatch) {

    // Submit email/password to the server
      axios.post(`${ROOT_URL}/signin`, { email, password })
          .then(response => {
              // If request is good..
              // - Update the state to indicate user is authenticated
              dispatch({ type: AUTH_USER })
              // - Save the JWT token
              localStorage.setItem('token', response.data.token);
              // - redirect to the route /feature
              history.push('/feature');
          })
          .catch(() => {
              // If request is bad..
              // - Show error to the user
                dispatch(authError('Bad Login Info'));
          });
  }
}

export function signupUser({username, email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { username, email, password })
            .then(response => {
                // If request is good..
                // - Update the state to indicate user is authenticated
                dispatch({ type: AUTH_USER })
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
            })
            .catch(error => {
                const response = error.response;
                dispatch(authError(response.data.error));
            });
    }
}
