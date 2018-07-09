import { combineReducers } from 'redux';
import signIn from './signIn';
import user from './user';

//combineReducers 接收一个对象
//可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，
//然后使用 import * as reducers 得到一个以它们名字作为 key 的 object
const entire = combineReducers ({
  signInReducer: signIn,
  userReducer: user,
});

export default entire;
