import axios from 'axios';
import {isEmpty} from 'lodash';
import {getStorage} from './storage';
import {USERID, TOKEN} from '../constants/common';

//验证权限
const authorization = () => {
  let userId = getStorage (USERID);
  let token = getStorage (TOKEN);
  if (userId && token) {
    return `${userId}_${token}`;
  }
  return null;
};

//处理数据
const postData = datas => {
  if (isEmpty (datas)) {
    return null;
  }

  const formData = new FormData ();
  const dataName = Object.keys (datas);

  dataName.map (name => {
    formData.append (name, datas[name]);
    return null;
  });

  return formData;
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
const post = (url, data) =>
  axios
    .create ({
      headers: {
        authorization: authorization (),
      },
    })
    .post (url, data)
    .then (res => {
      console.log (res);
    });

export default {get, post, remove};
