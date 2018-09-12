<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span></span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="还车时间:" prop="branchName">
                        <sel-date @exportDate="exportDate"></sel-date>
                    </FormItem>
                    <!-- <FormItem label="电话:" prop="telephone">
                        <Input v-model="formValidate.telephone" placeholder="请输入电话"></Input>
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
    import selDate from "./../pub/selDate" 
    export default {
        props:['exportData'],
        components:{
            selDate
        },
        data () {
            return {
                departmentvalue:"",
                ashow:false,
                formValidate: {
                    bool:false,
                    address:'',
                    branchName:'',
                    telephone:"",
                },
                ruleValidate: {
                    branchName: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){

        },
        mounted() {
            this.ashow = this.exportData
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
                      _this.show = false
                      _this.$emit('addBranchShow',{ashow:false})
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
                  address:this.formValidate.address,
                  name:this.formValidate.branchName,
                  telephone:this.formValidate.telephone,
                    parentId: 1,
                }
              this.$api.post("/company/add", data, reset => {
                if (reset.code === 0) {
                    _this.$Message.success('添加成功');
                    _this.$emit('addBranchShow',{ashow:false})
                }else {
                   _this.$netcode.getApiCode(reset)
                }
              })
            },
            exportDate(e){
                console.log(e);
            }
        }
    }
</script>
