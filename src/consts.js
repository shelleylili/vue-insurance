/* 静态页面数据 */
module.exports = {
  SWIPER_IMG_LIST: [ // 滚屏
    '../../../static/images/banner-1.jpg',
    '../../../static/images/banner-2.jpg',
    '../../../static/images/banner-3.jpg'
  ],
  TABBAR_LIST: [ // tabbar
    {
      link: '/home',
      src: '../../../static/images/tab-icon-1.png',
      onSrc: '../../../static/images/tab-icon-on-1.png',
      label: '首页'
    },
    {
      link: '', // '/bxy',
      src: '../../../static/images/tab-icon-2.png',
      onSrc: '../../../static/images/tab-icon-on-2.png',
      label: '保信优'
    },
    {
      link: '/mine',
      src: '../../../static/images/tab-icon-3.png',
      onSrc: '../../../static/images/tab-icon-on-3.png',
      label: '我的'
    }
  ],
  HOME_FLOW_SRC: '../../../static/images/flow.jpg',
  HOME_FLOW_LINK: '/flowShow',
  HOME_FLOW_SHOW_SRC: '../../../static/images/flow.jpg',
  REALCHECK_SRC: '../../../static/images/rc-top.jpg'
}
