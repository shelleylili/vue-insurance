
/*
* 获取商家列表
* param: context 上下文(调用该方法的vue实例)
* param: sellers 上下文中的data属性承接异步返回的数据
* param: page 向下拉动加载更多 类似分页原理
* param: searchKey 搜索的关键字
* */
function getsellers (context, sellers, page, searchKey) {
  context.$http.jsonp('http://localhost:9999/getsellers?page=' + page + '&searchKey=' + searchKey, {credentials: true}).then(function (data) {
    console.log(data.body.list)
    context[sellers] = data.body.list
  })
}
/*
* 获取手机验证码
* param: context 上下文(调用该方法的vue实例)
* param: getCheckCode 是否获取到验证码
* param: phoneNum 手机号
* */
function getCheckCode (context, getCheckCode, phoneNum) {
  context.$http.post('', {'phoneNum': phoneNum}, {}).then(function (data) {
    context[getCheckCode] = data
  }, function (data) {
    context[getCheckCode] = data
    console.log('错误码:' + data.msg)
  })
}
/*
* 登录
* param: context 上下文(调用该方法的vue实例)
* param: phoneNum 手机号
* param: checkCode 验证码
* */
function loginIn (context, phoneNum, checkCode, successLogin) {
  context.$http.post('', {'phoneNum': phoneNum, 'checkCode': checkCode}, {}).then(function (data) {
    context[successLogin] = data
  }, function (data) {
    context[getCheckCode] = data
    console.log('错误码:' + data.msg)
  })
}

module.exports = {
  getsellers,
  getCheckCode,
  loginIn
}
