<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>选择车辆操作类型</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="操作类型:">
                        <action @exportData="actionType"></action>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >确定</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
             </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import Action from "@/components/pub/action"
    export default {
        props:['importShow','importData'],
        components:{
            Action
        },
        data () {
            return {
                departmentvalue:"",
                ashow:false,
                passwordshow:true,
                formValidate: {},
                ruleValidate: {},
                actionNo:0
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
                        _this.$emit('exportShow',{show:false})
                    },
                    onCancel: () => {
                       _this.ashow = true
                    }
                });
            },
            handleSubmit (name) {
                this.post(name)
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
                let _this = this;
                var data = {
                    "actionNo": this.actionNo,
                    "middleControlNo": this.importData
                }
                this.$api.post("/vehicle/operation/action", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportShow',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            actionType(e){
               this.actionNo=e
            }
        }
    }
</script>
