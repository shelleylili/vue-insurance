<template>
  <div class="menu">
    <flexbox>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="scanPay">
              <img slot="icon" src="../../../static/images/menu-ico-1.png">
              <span slot="label">扫码支付</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="insuranceAccount">
              <img slot="icon" src="../../../static/images/menu-ico-2.png">
              <span slot="label">保险账户</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="lipyRecord">
              <img slot="icon" src="../../../static/images/menu-ico-3.png">
              <span slot="label">理赔记录</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="aroundSeller">
              <img slot="icon" src="../../../static/images/menu-ico-4.png">
              <span slot="label">周边商户</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>

      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="fastPy">
              <img slot="icon" src="../../../static/images/menu-ico-5.png">
              <span slot="label">极速理赔</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="insuranceCredit">
              <img slot="icon" src="../../../static/images/menu-ico-6.png">
              <span slot="label">保险信用</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="coastDetail">
              <img slot="icon" src="../../../static/images/menu-ico-7.png">
              <span slot="label">消费明细</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-item f14">
          <tabbar>
            <tabbar-item @on-item-click="onlineShop">
              <img slot="icon" src="../../../static/images/menu-ico-8.png">
              <span slot="label">在线购药</span>
            </tabbar-item>
          </tabbar>
        </div>
      </flexbox-item>
    </flexbox>
    </div>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell, Flexbox, FlexboxItem, Confirm } from 'vux'
  import { showConfirm } from '../../util'
  import bus from '../../bus'

  export default {
    name: 'Menu',
    data () {
      return {}
    },
    methods: {
      // 扫码支付
      scanPay: function () {
        this.isLoginOrRealCheck(1, '')
      },
      // 保险账户
      insuranceAccount: function () {
        this.isLoginOrRealCheck(2, '/insuranceaccount')
      },
      // 理赔记录
      lipyRecord: function () {
        this.isLoginOrRealCheck(2, '/lipyrecord')
      },
      // 周边商户
      aroundSeller: function () {
        this.isLoginOrRealCheck(1, '/aroundseller')
      },
      // 极速理赔
      fastPy: function () {
        this.isLoginOrRealCheck(2, '/fastpy')
      },
      // 保险信用
      insuranceCredit: function () {
        this.isLoginOrRealCheck(1, '/insurancecredit')
      },
      // 消费明细
      coastDetail: function () {
        this.isLoginOrRealCheck(2, '/coastdetail')
      },
      // 在线购药
      onlineShop: function () {
        this.isLoginOrRealCheck(2, '/onlineshop')
      },
      // 判断是否登录实名 type: 1 登录 2 实名 router:跳转路由
      isLoginOrRealCheck: function (type, router) {
        let user = JSON.parse(localStorage.getItem('user'))
        bus.$on('realChecked', (rcedUser) => {
          user = rcedUser
        })
        if (type === 1) {
          // 已登录
          if (user) {
            this.$router.push(router)
          } else {
            // 未登录
            this.$router.push('/login')
          }
        } else { // type 为2（需要验证实名的功能项）
          // 登录未失效
          if (user) {
            // 登录了+未实名认证
            if (!user.isRealChecked) {
              // 提示实名验证弹框
              let that = this
              let confirmOpts = {
                title: '去实名验证',
                content: '需要实名验证才能查看以下模块',
                confirmText: '去验证',
                cancelText: '再看看',
                showHandler: function () {},
                hideHandler: function () {},
                cancelHandler: function () {},
                confirmHandler: function () {
                  that.$router.push('/realcheck')
                }
              }
              // 实名认证提示框
              showConfirm(this, confirmOpts)
            } else {
              // 登录了+已实名认证
              this.$router.push(router)
            }
          } else {
            // 未登录
            this.$router.push('/login')
          }
        }
      }
    },
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      Confirm
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .menu {
    .vux-flexbox-item{
      margin-left:11px;
      .flex-item {
        margin-top: 10px;
        border: 1px solid #dddddd;
        border-radius: 10px;
        color:#666666;
        .weui-tabbar {
          position: static;
          background:#ffffff;
          border-radius: 10px;
          line-height:1;
          .weui-tabbar__item{
            padding:15px 0;
          }
        }
        .weui-tabbar__label {
          padding-top:3px;
        }
      }
    }

    /* reset components */
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
      color:#999999
    }
  }
</style>
