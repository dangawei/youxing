<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加经销商帐号</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="账号:" prop="username">
                        <Input v-model="formValidate.username" placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="密码:" prop="password">
                        <div class="" v-if="passwordshow">
                           <Input type="password" v-model="formValidate.password" placeholder="请输入密码" icon="eye-disabled"  @on-click="password01()"></Input>
                        </div>
                        <div class="" v-else>
                           <Input v-model="formValidate.password" placeholder="请输入密码" icon="eye" @on-click="password01()"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="角色:" prop="roleId">
                        <get-role @exportData="exportData"></get-role>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >添加</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
             </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import GetRole from "@/components/pub/getRole"
    export default {
        props:['addshow','dealerId'],
        components:{
            GetRole
        },
        data () {
            return {
                departmentvalue:"",
                ashow:false,
                passwordshow:true,
                formValidate: {
                    bool:false,
                    password:'',
                    username:'',
                    trueName:"",
                    roleId:"",
                    dealerId:''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { type: 'string', min: 2, max:20, message: '账号长度5-20位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '密码长度5-20位', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.formValidate.dealerId=this.dealerId;
        },
        mounted() {
            this.ashow = this.addshow
        },
        methods: {
            password01 () {
               this.passwordshow = !this.passwordshow
            },
            cancel () {
               this.remove()
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.show = false
                      _this.$emit('addShowComponent',{ashow:false})
                    },
                    onCancel: () => {
                       _this.show = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    }
                })
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
              let _this = this;
                // var url = "?token=" + this.$webapi.get('token')
                var data = {
                    "account": this.formValidate.username,
                    "companyId": this.formValidate.dealerId,
                    "createId": 0,
                    "password": this.formValidate.password,
                    "roleId": this.formValidate.roleId
                }
              this.$api.post("/account/create", data, reset => {
                if (reset.code === 0) {
                    _this.$Message.success('添加成功');
                    _this.$emit('addShowComponent',{ashow:false})
                }else {
                   _this.$netcode.getApiCode(reset)
                }
              })
            },
            exportData(e){
               this.formValidate.roleId=e.id; 
            }
        }
    }
</script>
