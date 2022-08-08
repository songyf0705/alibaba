<template>
  <div class="loginBg">
    <div class="loginBox">
      <div class="loginTitleBox">
        <div class="loginTitle">
          <img src="/static/images/logo.png" alt="">
          <p>阿里巴巴</p>
        </div>
      </div>
      <div class="loginForm">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" label-width="80px">
          <el-form-item prop="username" class="item-input">
            <img src="/static/images/user.png" alt="" class="fl input-icon">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" class="fl" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password" class="item-input">
            <img src="/static/images/password.png" alt="" class="fl input-icon">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
                      @keyup.enter.native="submitForm('loginForm')" class="fl" autocomplete="off"></el-input>
          </el-form-item>

          <!-- <el-form-item>
             <el-checkbox v-model="loginForm.rememberState"  @change="rememberPswdChange" @keyup.enter.native="submitForm('loginForm')">记住用户名</el-checkbox>
           </el-form-item>-->

          <el-form-item class="center" style="margin-bottom: 0;">
            <el-button type="primary" class="loginBtn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import {isEmpty} from '@/util/tool'

  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          rememberState: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]

        }
      }
    },
    mounted() {
      this.loginForm.username = isEmpty(localStorage.rememberUserName) === false ? localStorage.rememberUserName : "";
      this.loginForm.rememberState = isEmpty(localStorage.rememberState) === false ? true : false;
    },
    methods: {
      rememberPswdChange() {
        if (this.loginForm.rememberState === false) {
          localStorage.removeItem('rememberUserName')
          localStorage.removeItem('rememberState')
        }
      },
      submitForm(formName) {
        var _this = this;
        _this.$refs[formName].validate(valid => {
          if (valid) {
            _this.$post(`${global.server}/userLogin/login`,
              {
                username: _this.loginForm.username,
                password: _this.loginForm.password
              })
              .then((res) => {
                if (_this.loginForm.rememberState) { // 记住用户名
                  localStorage.rememberUserName = _this.loginForm.username;
                  localStorage.rememberState = true
                } else {
                  this.rememberPswdChange()
                }
                sessionStorage.username = _this.loginForm.username
                sessionStorage.tk = res.data.token
                _this.$router.push('/BillManageTab')
              })
              // eslint-disable-next-line handle-callback-err
              .catch(function (error) {
                _this.$message({
                  showClose: true,
                  message: '错误的用户名或密码',
                  type: 'error'
                })
              })
            _this.$router.push('/BillManageTab')
          }
        })
      }
    }
  }
</script>
