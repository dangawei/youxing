<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加{{branchName}}分公司帐号</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="96" label-position="left">
                    <FormItem label="账号:" prop="username">
                        <Input v-model="formValidate.username" placeholder="请输入11位手机号"></Input>
                    </FormItem>
                    <FormItem label="密码:" prop="password">
                        <div class="" v-if="passwordshow">
                           <Input type="password" v-model="formValidate.password" placeholder="请输入密码" icon="eye-disabled"  @on-click="password01()"></Input>
                        </div>
                        <div class="" v-else>
                           <Input v-model="formValidate.password" placeholder="请输入密码" icon="eye" @on-click="password01()"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="再次输入密码" prop="copyPassword">
                        <div class="" v-if="passwordshow2">
                            <Input type="password" v-model="formValidate.copyPassword" placeholder="再次输入密码" size="large" icon="eye-disabled"  @on-click="password02()"></Input>
                        </div>
                        <div class="" v-else>
                            <Input v-model="formValidate.copyPassword" placeholder="再次输入密码" icon="eye"  size="large" @on-click="password02()"></Input>
                        </div>
                    </FormItem>
                    <!-- <FormItem label="角色:" prop="roleId">
                        <get-branch-role @exportData="exportData"></get-branch-role>
                    </FormItem> -->
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
    import getBranchRole from "@/components/pub/getBranchRole"
    export default {
        props:['addshow','branchId','branchName'],
        components:{
            getBranchRole
        },
        data () {
            return {
                departmentvalue:"",
                ashow:false,
                passwordshow:true,
                passwordshow2:true,
                formValidate: {
                    bool:false,
                    password:'',
                    username:'',
                    trueName:"",
                    id:"",
                    roleId:'',
                    branchName:'',
                    copyPassword:''
                },
                ruleValidate: {
                    username: [
                        // { required: true, message: '请输入账号', trigger: 'blur' },
                        // { type: 'string', min: 2, max:20, message: '账号长度2-20位', trigger: 'blur' }
                        { required: true, message: '请输入11位手机号', trigger: 'blur' },
                        { pattern: /^[1][3,4,5,7,8][0-9]{9}$/,message:'请输入11位手机号', trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, max:16, message: '密码长度6-16位', trigger: 'blur' }
                    ],
                    copyPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, max:16, message: '密码长度6-16位', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.formValidate.id=this.branchId;
            this.formValidate.branchName=this.branchName;
        },
        mounted() {
            this.ashow = this.addshow
            this.list();
        },
        methods: {
            list () {
                let _this = this;
                let data = {
                    "pageNum": 1,
                    "pageSize": 1,
                    "roleName": "分公司admin"
                }
                this.$api.post('/role/page',data,reset => {
                    if (reset.code === 0){
                        _this.formValidate.roleId=reset.data.data[0].id
                    }
                })
            },
            password01 () {
               this.passwordshow = !this.passwordshow
            },
            password02 () {
               this.passwordshow2 = !this.passwordshow2
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
                      _this.ashow = false
                      _this.$emit('addShowComponent',{ashow:false})
                    },
                    onCancel: () => {
                       _this.ashow = true
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
                if (this.formValidate.password!=this.formValidate.copyPassword) {
                    this.$Message.error('两次输入密码不同!')
                }else{
                    var data = {
                        "account": this.formValidate.username,
                        "companyId": this.formValidate.id,
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
                }
            },
            exportData(e){
               this.formValidate.roleId=e.id; 
            }
        }
    }
</script>
