var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
// 发送验证码
router.get('/getCheckCode', function (req, res, next) {
  console.log(req.params)
  res.jsonp({
    code: 200,
    msg: '发送成功',
    data: {
      text: 'send'
    }
  })
})
// loginIn
router.get('/loginIn', function (req, res, next) {
  console.log(req.params)
  res.jsonp({
    code: 200,
    msg: 'loginIn',
    data: {
      text: 'loginIn'
    }
  })
})
// idupload
router.get('/idupload', function (req, res, next) {
  let type = req.query.type
  if (type === '1') {
    res.jsonp({
      code: 200,
      msg: '正面',
      data: {
        name: 'sssssss',
        code: '123344444444'
      }
    })
  } else {
    res.jsonp({
      code: 200,
      msg: '反面',
      data: {
        orgnazation: '******',
        start: '20170901',
        end: '20170901'
      }
    })
  }
})
module.exports = router
