<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加APP类型</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="APP类型:" prop="appTypeName">
                        <Input v-model="formValidate.appTypeName" placeholder="请输入APP类型"></Input>
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
    export default {
        props:['importShow'],
        components:{
            
        },
        data () {
            return {
                ashow:false,
                formValidate: {
                    appTypeName:""
                },
                ruleValidate: {
                    appTypeName: [
                        { required: true, message: '请输入APP类型', trigger: 'blur' },
                        { type: 'string', min: 1, max:11, message: '账号长度1-11位', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            
        },
        mounted() {
            this.ashow = this.importShow
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
                      _this.ashow = false
                      _this.$emit('exportData',{show:false})
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
                   "appTypeName":this.formValidate.appTypeName
                }
                this.$api.post("/appType/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportData',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportData(e){
                this.formValidate.roleId=e.id
            }
        }
    }
</script>
