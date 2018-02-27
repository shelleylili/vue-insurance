<template>
  <div class="mine">
    <!--登录入口-->
    <group class="non-mt login-hint">
      <cell :title="loginTitle" link="/login" inline-desc="登录后可享受更多特权"></cell>
    </group>
    <!--我的钱包-->
    <div class="card">
      <card>
        <div slot="content" class="card-demo-flex">
          <div :class="{'vux-1px-r': index != 2}" v-for="(item, index) in cardList" :key="index">
            <span>
              <img :src="item.icon"/>
            </span>
            <br/>
            {{ item.text }}
          </div>
        </div>
      </card>
    </div>
    <!--服务中心-->
    <group>
      <cell :title="serviceCenterTitle" link="/servicecenter"></cell>
    </group>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Card } from 'vux'

export default {
  name: 'mine',
  data () {
    return {
      loginTitle: '登录/注册',
      serviceCenterTitle: '服务中心',
      cardList: [
        {
          text: '我的余额',
          icon: '../../../static/icon.jpg'
        },
        {
          text: '我的红包',
          icon: '../../../static/icon.jpg'
        },
        {
          text: '我的金币',
          icon: '../../../static/icon.jpg'
        }
      ]
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../node_modules/vux/src/styles/1px.less';
  .non-mt{
    margin-top:-21px;
  }
  .login-hint .weui-cells{
    background:#30aff1;
    color:#ffffff;
    padding: 15px 0 15px 15px;
  }
  .login-hint .weui-cell_access .weui-cell__ft::after{
    border-color:#ffffff;
  }
  .login-hint .vux-label-desc{
    color:#ffffff;
  }
  .card-demo-flex {
    display: flex;
    img{
      width:40px;
      height:40px;
    }
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding:20px 0 15px 0;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
  .card .weui-panel{
    margin-top:0;
  }
</style>
