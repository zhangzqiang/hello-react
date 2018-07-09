import {SIGIN, SIGIN_LOADING} from '../constants/actionTypes';

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

const signIn = user => {
  let result = false;
  if (user.name === 'admin' && user.password == '123qwe') {
    result = true;
  }
  return dispatch => {
    dispatch (signInResult (result));
  };
};

export default {signIn, signInLoading};
