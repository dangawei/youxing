<template>
  <div class="warpbox">
      <div class="loginbox" >
         <div class="loginbox-hd">
         </div>
         <div class="loginbox-bd">
            <div class="login-item">
              <Input v-model="mobile" placeholder="用户名" size="large" style="margin-bottom:10px"></Input>
            </div>
            <div class="login-item">
              <div class="" v-if="passwordshow">
                  <Input type="password" v-model="password" placeholder="请输入密码"  size="large" icon="eye-disabled"  @on-click="password01()"></Input>
              </div>
              <div class="" v-else>
                  <Input v-model="password" placeholder="请输入密码" icon="eye"  size="large" @on-click="password01()"></Input>
              </div>
                <!-- <Input v-model="password" type="password" placeholder="admin/password" size="large" style="margin-bottom:10px"></Input> -->
            </div>
            <!-- <div>
              <Form ref="datas" :model="datas" :label-width="80">
                <FormItem label="登录IP:" prop="password">
                  <Select v-model="datas.IP" @on-change="change(datas.IP)">
                      <Option :value="1">17</Option>
                      <Option :value="2">129</Option>
                      <Option :value="3">111</Option>
                  </Select>
                </FormItem>
              </Form>
            </div> -->
            <div class="" @click="login()" @keyup="show($event)">
              <Button type="primary" size="large" :disabled='this.mobile=="" || this.password==""' long>登录</Button>
            </div>
         </div>
      </div>
      <div class='showbikeinfo'>
     </div>
  </div>
</template>

<script>
let axios= require('axios');
import webapi from '../api/webapi'
export default {
  name: 'login',
  data () {
    return {
      passwordshow:true,
      mobile: "",
      password: "",
      // datas:{
      //   IP:1
      // }
      
    }
  },
  mounted(){
    this.$webapi.save('usertype',1)
  },
  methods: {
    show (e) {
      alert(e)
    },
    password01 () {
      this.passwordshow = !this.passwordshow
    },
    login () {
      let data={
          "account": this.mobile,
          "password": this.password
      }
      let _this = this
      this.$api.post("/account/login", data, reset => {
        if (reset.code === 0) {            
            _this.$webapi.save('token',reset.data.token)
            _this.$webapi.save('companyId',reset.data.companyId)
            _this.$webapi.save('companyName',reset.data.companyName)
            _this.$webapi.save('flag',reset.data.flag)
            _this.$webapi.save('account',this.mobile)
            axios.defaults.headers.common['token'] = webapi.get("token");
            _this.$router.push("/home")
            
        }else {
          _this.$netcode.getApiCode(reset)
       }
      })
    },
    change(e){
      this.$webapi.save('usertype',e)
      this.$api.userType();
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .warpbox{
      width: 100%;
      height: 100vh;
      background: url("../assets/bg.jpg") center center;
      background-size: 100% 100%;
      display: flex;
      flex: 1;
      justify-content:center;
      align-items: center;
    }
    .loginbox{
       border-radius:2px;
       width: 300px;
      .loginbox-hd{
        padding: 10px;
        text-align: left;
        h2{
          font-size: 20px;
          font-weight: normal;
        }
      }
      .loginbox-bd{
        padding: 10px;
        .login-item{
          margin-bottom: 20px;
        }
      }
    }
</style>
