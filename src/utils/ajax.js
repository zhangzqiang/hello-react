import axios from 'axios';
import storage from './storage';
import {TIMEOUT, USERID, TOKEN} from '../constants/common';

//验证权限
const authorization = () => {
  let userId = storage.get (USERID);
  let token = storage.get (TOKEN);
  if (userId && token) {
    return `${userId}_${token}`;
  }
  return null;
};

const get = (url, params) => {
  axios
    .create ({
      headers: {
        authorization: authorization (),
      },
    })
    .get (url, {
      params,
    });
};

const remove = (url, params) => {
  axios
    .create ({
      headers: {
        authorization: authorization (),
      },
    })
    .delete (url, {
      params,
    });
};

//mockjs仅支持json，不支持form表单
const post = async (url, data) => {
  const result = await axios
    .create ({
      timeout: TIMEOUT,
      headers: {
        authorization: authorization (),
      },
    })
    .post (url, data);
  return result;
};

export default {get, post, remove};
