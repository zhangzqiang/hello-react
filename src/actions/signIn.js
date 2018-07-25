import {
  SIGIN_SUCCESS,
  SIGIN_LOADING,
  AUTH_ERROR,
} from '../constants/actionTypes';
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

const signIn = user => {
  const result = async dispatch => {
    try {
      const res = await ajax.post (URL_SIGNIN, user);
      
      if (res.status === 200) {
        if (res.data.resultCode === 10000) {
          debugger;
          return dispatch ({
            type: SIGIN_SUCCESS,
            success: true,
            loading: false,
          });
        } else {
          debugger;
          return dispatch ({
            type: SIGIN_SUCCESS,
            success: false,
            loading: false,
            message: res.data.result,
          });
        }
      }
    } catch (err) {
      let errorMessage = ERRORMESSAGE;
      if (
        err.response.status === 404 &&
        err.response.data.resultCode != 10000
      ) {
        errorMessage = err.response.data.message;
      }

      return dispatch ({
        type: AUTH_ERROR,
        payload: errorMessage,
      });
    }
  };
  return result;
};

export default {signIn, signInLoading};
