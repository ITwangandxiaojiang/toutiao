<template>
  <div class="login-container">
    <van-nav-bar title="黑马头条 - 登录" fixed />
    <!-- 登录的表单 -->
    <van-form @submit="login">
      <van-field v-model="form.mobile" type="tel" label="手机号码" placeholder="请输入手机号码" required :rules="rules.mobile">
      </van-field>
      <van-field v-model="form.code" type="password" label="登录密码" placeholder="请输入登录密码" required :rules="rules.code">
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/userAPI'
// 1. 按需导入辅助方法
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        // 用户的手机号
        mobile: '',
        //登录密码
        code: ''
      },
      rules: {
        mobile: [{ required: true, message: '请填写你的手机号', trigger: 'onBlur' },
        { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'onBlur' }],
        code: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }],
      }
    }
  },
  methods:{
    // 2. 映射 mutations 中的方法
    ...mapMutations(['updateTokenInfo']),
    async login(){
      const {data : res} = await loginAPI({mobile:this.form.mobile,code:this.form.code});
      if(res.message === 'OK'){
        this.updateTokenInfo(res.data)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 46px;
}
</style>