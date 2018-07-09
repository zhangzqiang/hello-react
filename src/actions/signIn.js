import {SIGIN, SIGIN_LOADING, AUTH_ERROR} from '../constants/actionTypes';
import {ERRORMESSAGE} from '../constants/common';
import {URL_SIGNIN} from '../constants/service';
// import {setStorage, removeStorage} from '../utils/storage';
import ajax from '../utils/ajax';

/*
{
	"description": "加载登陆进度条",
	"parameters": {
		"state": "是否显示进度条"
	},
	"result": {
		"loading": {
			"true": "显示进度条",
			"false": "隐藏进度条"
		}
	}
}
*/
const signInLoading = state => ({
  type: SIGIN_LOADING,
  loading: state,
});

/*
{
	"description": "用户登录",
	"parameters": {
    "user": "用户信息",
	},
	"result": {
    "success": {
			"true": "登陆成功",
			"false": "登录失败"
		},
		"loading": {
			"true": "显示进度条",
			"false": "隐藏进度条"
		}
	}
}
*/
let signInResult = result => ({
  type: SIGIN,
  success: result,
  loading: false,
});


const signIn =  user => {
  let result = false;

  return async dispatch => {
    try {
      const res = await ajax.post(URL_SIGNIN, user);
      console.log (res);
      if (res.status === 200 && res.data.code === 100) {
        console.log (res);
        return dispatch (signInResult (result));
      }
    } catch (err) {
      let errorMessage = ERRORMESSAGE;
      console.log (err);
      if (err.response.status === 404 && err.response.data.code === -1001) {
        errorMessage = err.response.data.message;
      }
			
      return {
        type: AUTH_ERROR,
        payload: errorMessage,
      };
    }
  };
};

export default {signIn, signInLoading};
