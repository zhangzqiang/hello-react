module.exports = {
  'POST /api/login': (req, res) => {
    const {password, userName} = req.body;
    if (userName === 'admin' && password === '123456') {
      return res.send ({
        resultCode: 10000,
        msg: 'success',
        result: {userName: 'wsh', password: '123456'},
      });
    } else {
      return res.send ({
        resultCode: 10002,
        msg: 'error',
        result: '用户名或密码错误',
      });
    }
  },
  'DELETE /api/user/:id': (req, res) => {
    res.send ({status: 'ok', message: '删除成功！'});
  },
};
