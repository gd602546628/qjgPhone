<template>
  <div class="login">
    <div class="form-content">
      <mt-field label="账号" placeholder="请输入账号" v-model="formData.username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" v-model="formData.password"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" v-model="formData.picCode">
        <img :src="base64" @click.stop="getCode">
      </mt-field>
    </div>
    <div class="btn-wrap">
      <mt-button type="primary" class="btn" @click="login">登录</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import pcApi from '../api/pcApi'
  import {code} from '../config/config'
  import {Message} from 'mint-ui'

  export default {
    components: {},
    computed: {
      ...mapGetters(['isLogin'])
    },
    data() {
      return {
        formData: {
          username: '',
          password: '',
          picCode: ''
        },
        sessionId: '',
        base64: '',
      }
    },
    created() {
      this.getCode()
    },
    methods: {
      ...mapMutations(['saveUserInfo']),
      async login() {
        let data = await pcApi.login(this.formData, this.sessionId)
        if (data.code === code.SUCCESS) {
          if (this.$route.params.resolve) {
            this.$route.params.resolve(data.data)
            this.$route.params.fn()
          } else {
            this.saveUserInfo(data.data)
            this.$router.push({
              name: 'useCoupon'
            })
          }
        } else {
          Message.alert(data.mesg)
        }
      },
      async getCode() {
        let data = await pcApi.getValidateCode()
        this.sessionId = data.split(';')[1]
        this.base64 = 'data:image/jpeg;base64,' + data.split(';')[0]
      }
    }
  }
</script>

<style lang='scss' type="text/scss" rel='stylesheet/scss' scoped>
  .login {
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
