import {SIGIN_SUCCESS, SIGIN_LOADING} from '../constants/actionTypes';

const initialState = {
  isSuccess: false,
  isRemenber: true,
  showLoading: false,
  message: '',
};

function signInReducer (state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case SIGIN_SUCCESS:
      newState = Object.assign ({}, state, {
        showLoading: action.loading,
        isSuccess: action.success,
        message: action.message,
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
