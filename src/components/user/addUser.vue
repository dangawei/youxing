<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加用户帐号</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="left">
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
                    <FormItem label="真实姓名:" prop="customerName">
                        <Input v-model="formValidate.customerName" placeholder="请输入真实姓名"></Input>
                    </FormItem>
                    <FormItem label="预租车时间:" prop="rentTime">
                        <start-date @exportDate="startDate"></start-date>
                    </FormItem>
                    <FormItem label="预还车时间:" prop="returnTime">
                        <end-date @exportDate="endDate"></end-date>
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
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
    export default {
        props:['addshow','dealerId'],
        components:{
            GetRole,
            startDate,
            endDate
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
                    customerName:'',
                    rentTime:'',
                    returnTime:''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '请输入11位手机号', trigger: 'blur' },
                        { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/,message:'请输入11位手机号', trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '密码长度为5-20位', trigger: 'blur' }
                    ],
                    customerName: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                        { type: 'string', min: 2, max:10, message: '输入长度为2-10位', trigger: 'blur' }
                    ],
                    rentTime:[
                        { required: true, message: '请选择时间'}
                    ],
                    returnTime:[
                        { required: true, message: '请选择时间'}
                    ],
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
                var data = {
                    "loginName": this.formValidate.username,
                    "password": this.formValidate.password,
                    "customerName": this.formValidate.customerName,
                    "rentTime": this.formValidate.rentTime+" 00:00:00",
                    "returnTime": this.formValidate.returnTime+" 00:00:00"
                }
              this.$api.post("/customer/add", data, reset => {
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
            },
            startDate(e){
                this.formValidate.rentTime=e
            },
            endDate(e){
                this.formValidate.returnTime=e
            }
        }
    }
</script>
