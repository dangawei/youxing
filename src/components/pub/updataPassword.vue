<template>
    <div>
      <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closaable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>修改密码</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="输入旧密码" prop="oldPassword">
                    <div class="" v-if="oldPasswordShow">
                        <Input type="password" v-model="formValidate.oldPassword" placeholder="输入旧密码"  size="large" icon="eye-disabled"  @on-click="password00()"></Input>
                    </div>
                    <div class="" v-else>
                        <Input v-model="formValidate.oldPassword" placeholder="输入旧密码" icon="eye"  size="large" @on-click="password00()"></Input>
                    </div>
                    <!-- <Input v-model="formValidate.oldPassword" placeholder="请输入旧密码" onkeydown="if(event.keyCode==32) return false"></Input> -->
                </FormItem>
                <FormItem label="输入新密码" prop="newPassword">
                    <div class="" v-if="passwordshow">
                        <Input type="password" v-model="formValidate.newPassword" placeholder="输入新密码"  size="large" icon="eye-disabled"  @on-click="password01()"></Input>
                    </div>
                    <div class="" v-else>
                        <Input v-model="formValidate.newPassword" placeholder="输入新密码" icon="eye"  size="large" @on-click="password01()"></Input>
                    </div>
                </FormItem>
                <FormItem label="再次输入新密码" prop="copyPassword">
                    <div class="" v-if="passwordshow2">
                        <Input type="password" v-model="formValidate.copyPassword" placeholder="再次输入新密码" size="large" icon="eye-disabled"  @on-click="password02()"></Input>
                    </div>
                    <div class="" v-else>
                        <Input v-model="formValidate.copyPassword" placeholder="再次输入新密码" icon="eye"  size="large" @on-click="password02()"></Input>
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                    <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props:["importShow"],
        data () {
            return {
                passwordshow:true,
                passwordshow2:true,
                oldPasswordShow:true,
                title:"修改内容",
                password:'',
                formValidate:{
                  oldPassword: '',
                  newPassword:"",
                  copyPassword:""
                },
                ruleValidate: {
                    oldPassword: [
                        { required: true, message: '旧密码没有填写', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '新密码没有填写', trigger: 'blur' }
                    ],
                    copyPassword: [
                        { required: true, message: '再次填写新密码', trigger: 'blur' }
                    ],
                },
                eshow:false
            }
        },
        created() {
            this.show=this.importShow
        },
        mounted(){

        },
        methods: {
            password00 () {
                this.oldPasswordShow = !this.oldPasswordShow
            },
            password01 () {
                this.passwordshow = !this.passwordshow
            },
            password02 () {
                this.passwordshow2 = !this.passwordshow2
            },
            cancel () {
                this.$emit('exportShow',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
               this.$emit('exportShow',{show:false})
            },
            post () {
                let _this = this;
                if (this.formValidate.newPassword!=this.formValidate.copyPassword) {
                    this.$Message.error('两次输入密码不同!')
                }else{
                    var data = {
                        account:this.$webapi.get("account"),
                        newPassword:this.formValidate.newPassword,
                        password:this.formValidate.oldPassword
                    }
                    this.$api.post("/account/update/password", data, reset => {
                        if (reset.code === 0) {
                            _this.$Message.success('修改成功,请重新登录!');
                            _this.$emit('exportShow',{show:false})
                            _this.$router.push("/login")
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                }
              
              
            }
        }
    }
</script>
