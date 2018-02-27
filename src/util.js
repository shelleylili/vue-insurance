/* 返回路径最后一个路由值
* return string 路由最后一个hash的值
* */
function getLocationRouterLast () {
  let wlh = window.location.href
  return wlh.substr(wlh.lastIndexOf('/') + 1)
}

/*
* 检查是否手机号
* @param string val 手机号
* return boolean 是否通过
* */
function isPhoneNum (val) {
  let reg = /^1[3|4|5|7|8][0-9]{9}$/
  return reg.test(val)
}

/*
* 检查验证码
* @param string val 验证码
* return boolean 是否通过
* */
function isCheckCode (val) {
  let reg = /^[0-9]{6}$/
  return reg.test(val)
}

/*
* 共用异步post API
* @param params  object 前端传递参数
* @param context object 上下文
* @param successFun function 成功回调
* @param failFun function 失败回调
* */
function postAPI (options) {
  let {params, context, successFun, failFun} = options
  // let url = 'http://192.168.2.164:8406/wechat' // 开发

  // context.$http.post(url + params.lastUrl, params.data, {emulateJSON: true}).then(successFun, failFun)

  let url = 'http://localhost:9999'
  // context.$http.jsonp(url + params.lastUrl, params.data, {emulateJSON: true}).then(successFun, failFun)
  context.$http.jsonp(url + params.lastUrl, {params: params.data}).then(successFun, failFun)
}

/*
* toast提示
* @param context  object 上下文
* @param text  string 提示文字
* @param width string 框宽度 like default 7,6em
* */
function showToast (context, text, width) {
  context.$vux.toast.show({
    type: 'text',
    width: width || '7.6em',
    position: 'middle',
    time: 1500,
    text: text
  })
}

/*
* confirm确认提示框
* @param context  object 上下文
* @param options  object 配置信息
* */
function showConfirm (context, options) {
  context.$vux.confirm.show({
    title: options.title || '标题',
    content: options.content || '提示框内容',
    confirmText: options.confirmText || '确认',
    cancelText: options.cancelText || '取消',
    onShow () {
      options.showHandler && options.showHandler()
      console.log('plugin show')
    },
    onHide () {
      options.hideHandler && options.hideHandler()
      console.log('plugin hide')
    },
    onCancel () {
      options.cancelHandler && options.cancelHandler()
      console.log('plugin cancel')
    },
    onConfirm () {
      options.confirmHandler && options.confirmHandler()
      console.log('plugin confirm')
    }
  })
}
/*
* 成功回调处理
* @param result object 成功时获取的数据
* @param success function 成功
* @param noLogin function 登录失效
* @param fail function 失败或者其他错误处理
* */
function successDeal (result, success, noLogin, fail) {
  let backJson = result.body
  if (backJson.code === 200) {
    success && success()
  } else if (backJson.code === 501) {
    noLogin && noLogin()
  } else {
    fail && fail()
  }
}
/*
* 错误回调处理
* @param context object 上下文
* @param result object 错误时获取的数据
* */
function failDeal (context, result) {
  let backJson = result.body
  console.log(backJson.code + ':' + backJson.msg)
  showToast(context, backJson.msg, '10em')
}
module.exports = {
  getLocationRouterLast,
  isPhoneNum,
  isCheckCode,
  postAPI,
  showToast,
  showConfirm,
  failDeal,
  successDeal
}
