module.exports = {
  'POST /api/login/account': (req, res) => {
    const {password, name} = req.body;
    if (name === 'admin' && password === '888888') {
      return res.send ({
        status: 'ok',
        code: 200,
        token: 'sdfsdfsdfdsf',
        data: {id: 1, name: 'kenny', sex: 6},
      });
    } else {
      return res.send ({
        status: 'error',
        code: 403,
      });
    }
  },
  'DELETE /api/user/:id': (req, res) => {
    res.send ({status: 'ok', message: '删除成功！'});
  },
};
