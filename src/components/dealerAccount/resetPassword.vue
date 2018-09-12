<template>
    <div>
      <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closaable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>修改{{this.formValidate.account}}密码</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="108" label-position="left">
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
        props:["importPasswordShow","importPasswordData"],
        data () {
            return {
                passwordshow:true,
                passwordshow2:true,
                password:'',
                formValidate:{
                  newPassword:"",
                  account:'',
                  copyPassword:''
                },
                ruleValidate: {
                    newPassword: [
                        { required: true, message: '新密码没有填写', trigger: 'blur' },
                        { type: 'string', min: 6, max:16, message: '密码长度6-16位', trigger: 'blur' }
                    ],
                    copyPassword: [
                        { required: true, message: '再次填写新密码', trigger: 'blur' },
                        { type: 'string', min: 6, max:16, message: '密码长度6-16位', trigger: 'blur' }
                    ],
                },
                eshow:false
            }
        },
        created() {
            this.show=this.importPasswordShow
            this.formValidate.account=this.importPasswordData
        },
        mounted(){

        },
        methods: {
            password01 () {
                this.passwordshow = !this.passwordshow
            },
            password02 () {
                this.passwordshow2 = !this.passwordshow2
            },
            cancel () {
                this.$emit('exportPasswordShow',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
               this.$emit('exportPasswordShow',{show:false})
            },
            post () {
                let _this = this;
                if (this.formValidate.newPassword!=this.formValidate.copyPassword) {
                    this.$Message.error('两次输入密码不同!')
                }else{
                    var data = {
                        account:this.formValidate.account,
                        password:this.formValidate.newPassword
                    }
                    this.$api.post("/account/password", data, reset => {
                        if (reset.code === 0) {
                            _this.$Message.success('修改成功!');
                            _this.$emit('exportPasswordShow',{show:false})
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                }
              
              
            }
        }
    }
</script>
