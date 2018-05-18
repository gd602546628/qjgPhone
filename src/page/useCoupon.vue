<template>
  <div class="use-coupon">
    <div class="form-content">
      <mt-field label="券码" placeholder="请输入券码" v-model="formData.code"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" v-model="formData.password"></mt-field>
    </div>
    <div class="btn-wrap">
      <mt-button type="primary" class="btn" @click="getCard">获取卡券</mt-button>
    </div>

    <div class="card-detail" style="margin-top: 20px;" v-if="card">
      <mt-cell title="名称" :value="card.name"></mt-cell>
      <mt-cell title="券码" :value="card.code"></mt-cell>
      <mt-cell title="密码" :value="card.password"></mt-cell>
      <mt-cell title="金额" :value="card.money"></mt-cell>
      <div class="btn-wrap">
        <mt-button type="primary" class="btn" @click="useCard">核销卡券</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import pcApi from '../api/pcApi'
  import {MessageBox} from 'mint-ui'
  import {code} from '../config/config'

  export default {
    components: {},
    computed: {
      ...mapGetters(['isLogin']),
    },
    data() {
      return {
        formData: {
          code: '',
          password: ''
        },
        card: null
      }
    },
    created() {
      if (!this.isLogin) {
        this.loginAction({routeName: 'useCoupon'})
      }
    },
    methods: {
      ...mapActions(['loginAction']),
      async getCard() {
        let data = await pcApi.getCard(this.formData)
        if (data.data.length === 0) {
          MessageBox.alert('该卡券不存在或已被核销，请核查券码和密码')
        } else {
          this.card = data.data[0]
        }
      },
      async useCard() {
        let data = await pcApi.useCard({id: this.card.id})
        if (data.code === code.SUCCESS) {
          this.card = null
          MessageBox.alert('卡券核销成功')
        } else {
          MessageBox.alert(data.mesg)
        }
      }
    }
  }
</script>

<style lang='scss' type="text/scss" rel='stylesheet/scss' scoped>
  .use-coupon {
    .btn-wrap {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        width: 300px;
      }
    }
  }
</style>
