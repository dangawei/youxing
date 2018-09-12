<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加故障类型</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="故障类型:" prop="faultTypeName">
                        <Input v-model="formValidate.faultTypeName" placeholder="请输入故障类型"></Input>
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
                    faultTypeName:""
                },
                ruleValidate: {
                    faultTypeName: [
                        { required: true, message: '请输入故障类型', trigger: 'blur' },
                        { type: 'string', min: 1, max:11, message: '故障类型名称长度为1-11位', trigger: 'blur' }
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
                // var url = "?token=" + this.$webapi.get('token')
                var data = {
                   "faultTypeName":this.formValidate.faultTypeName
                }
              this.$api.post("/fault/type/add", data, reset => {
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
