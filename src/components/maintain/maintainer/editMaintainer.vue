<template>
    <div>
        <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改维护人员</span>
            </p>
            <div style="text-align:center">
                <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
                    <FormItem label="工号" prop="workerNo">
                      <Input v-model="adddatas.workerNo" placeholder="请填写工号" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                      <Input v-model="adddatas.name" placeholder="请填写姓名" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="身份证号码" prop="idCard">
                        <Input v-model="adddatas.idCard" placeholder="请填写身份证号码" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="手机号码" prop="phone">
                      <Input v-model="adddatas.phone" placeholder="手机号码" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSave('adddatas')" size="large">保存</Button>
                      <Button type="error" @click="handleCancel('adddatas')" size="large">取消</Button>
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
        props:['editImportShow','editImportData'],
        data () {
            return {
              adddatas:{
                idCard:'',
                name:'',
                phone:'',
                workerNo:''
              },
              ashow:false,
              ruleValidate: {
                workerNo:[{
                  required: true,
                  message: '工号没有填写',
                  trigger: 'blur'
                },{
                  type: 'string', min: 2, max:11, message: '请填写2-11位的工号', trigger: 'change'
                }],
                name:[{
                  required: true,
                  message: '姓名没有填写',
                  trigger: 'blur'
                },{
                  type: 'string', min: 2, max:11, message: '请填写2-11位的名字', trigger: 'blur'
                }],
                
                idCard:[{
                  required: true,
                  message: '身份证号没有填写',
                  trigger: 'blur'
                },{
                  type: 'string', min: 18, max:18, message: '身份证位数错误', trigger: 'blur'
                }],
                phone:[{
                  required: true,
                  message: '手机号没有填写',
                  trigger: 'blur'
                },{
                  type: 'string', min: 11, max:11, message: '请输入11手机号', trigger: 'blur'
                }],
              }
            }
        },
        created(){
            this.ashow=this.editImportShow
        },
        mounted(){
            this.adddatas=this.editImportData
        },
        methods: {
            cancel () {
                this.remove("adddatas");
            },
            handleSave(name) {
                let _this = this
                this.$refs[name].validate((valid) => {
                    if(valid){
                        _this.post();
                    }else{
                        _this.$Message.error('失败!')
                    }
                })
            },
            remove (item) {
                var _this=this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                        _this.$emit('editExportShow',{"show":false})
                    },
                    onCancel: () => {
                        _this.ashow = true
                    }
                });
            },
            handleCancel(name){
                this.remove(name);
            },
            post () {
                let _this = this;
                var data={
                    "id":this.adddatas.id,
                    "idCard":this.adddatas.idCard,
                    "name": this.adddatas.name,
                    "phone":this.adddatas.phone,
                    "workerNo":this.adddatas.workerNo
                }
                this.$api.post("/repairWorker/update", data, reset => {
                    if (reset.code === 0) {
                        _this.$emit('editExportShow',{"show":false})
                        _this.$Message.success("修改成功!")
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
