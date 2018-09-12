<template>
    <div class="">
        <Modal v-model="importShow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>完善基本信息</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="名字:" prop="customerName">
                        <p>{{formValidate.customerName}}</p>
                    </FormItem>
                    <FormItem label="性别:" prop="password">
                        <Select v-model="formValidate.gender" @on-change="change(formValidate.gender)">
                            <Option :value="1">男</Option>
                            <Option :value="2">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="身份证号:" prop="identityCardNo">
                        <Input v-model="formValidate.identityCardNo" placeholder="请输入身份证号"></Input>
                    </FormItem>
                    <FormItem label="手机号码:" prop="mobilePhone">
                        <Input v-model="formValidate.mobilePhone" placeholder="请输入手机号码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >保存</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
             </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
    var mb= /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    export default {
        props:['exportData','exportShow'],
        components:{
            
        },
        data () {
            return {
                importShow:false,
                importDate:'',
                formValidate: {},
                ruleValidate: {
                    identityCardNo:[{
                        type: 'string', min: 18, max:18, message: '身份证位数错误', trigger: 'blur'
                    }],
                    mobilePhone:[{
                        type: 'string', min: 11, max:11, message: '请输入11手机号', trigger: 'blur'
                    }],
                }
            }
        },
        created(){
            this.formValidate=this.exportData
            if (this.formValidate.gender=="男") {
                this.formValidate.gender=1
            }else{
                this.formValidate.gender=2
            }
        },
        mounted() {
            this.importShow = this.exportShow
        },
        methods: {
            cancel () {
               this.remove()
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.importShow = false
                      _this.$emit('importShow',false)
                    },
                    onCancel: () => {
                       _this.importShow = true
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
                // if (!ph.test(this.formValidate.mobilePhone)&&!mb.test(this.formValidate.mobilePhone)) {
                //     this.$Message.error('请输入正确的手机号或带区号的固定电话');
                // }
                let _this = this;
                var data = {
                    "customerId": this.formValidate.customerId,
                    "customerInfoId": this.formValidate.customerInfoId,
                    "gender": this.formValidate.gender,
                    "identityCardType":1
                }
                if (this.formValidate.mobilePhone) {
                    data.mobilePhone=this.formValidate.mobilePhone
                }
                if (this.formValidate.identityCardNo) {
                    data.identityCardNo=this.formValidate.identityCardNo
                }
                this.$api.post("/customer/info/update", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('编辑成功');
                        _this.$emit('importShow',false)
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            change(e){
                this.formValidate.gender=e;
            }
        }
    }
</script>
