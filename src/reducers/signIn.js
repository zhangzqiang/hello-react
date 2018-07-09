import {SIGIN, SIGIN_LOADING} from '../constants/actionTypes';

const initialState = {
    isSuccess: false,
    isRemenber: true,
    showLoading: false,
  };

function signInReducer (state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case SIGIN:
      newState = Object.assign ({}, state, {
        showLoading: false,
        isSuccess: action.success,
      });
      break;
    case SIGIN_LOADING:
      newState = Object.assign ({}, state, {
        showLoading: action.loading,
      });
      break;
    default:
      break;
  }
  return newState;
}

export default signInReducer;
