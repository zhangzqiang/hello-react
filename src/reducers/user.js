import {USER_AUTHENTICATE} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
};

function userReducer (state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case USER_AUTHENTICATE:
      newState = Object.assign ({}, state, {
        isAuthenticated: action.authenticate,
      });
      break;
    default:
      break;
  }
  return newState;
}

export default userReducer;
