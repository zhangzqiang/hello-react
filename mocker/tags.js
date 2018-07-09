module.exports = {
  'GET /api/getTags': (req, res) => {
    res.send (
      require ('mockjs').mock ({
        'list|200': [{name: '@city', 'value|1-100': 150, 'type|0-2': 1}],
      })
    );
  },
  'GET /api/getTag': (req, res) => {
    res.send (
      'www.baidu.com'
    );
  },
};
