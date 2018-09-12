<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>修改{{this.formValidate.middleControlNo}}信息</span>
         </p>
         <div style="text-align:center">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="96" label-position="left">
                <FormItem label="中控编号" prop="middleControlNo">
                    <Input v-model="formValidate.middleControlNo" placeholder="中控编号" onkeydown="if(event.keyCode==32) return false"></Input>
                </FormItem>
                <FormItem label="蓝牙名称" prop="blueToothName">
                    <Input v-model="formValidate.blueToothName" placeholder="蓝牙名称" onkeydown="if(event.keyCode==32) return false"></Input>
                </FormItem>
                <FormItem label="sim卡号" prop="simNo">
                    <Input v-model="formValidate.simNo" placeholder="sim卡号" onkeydown="if(event.keyCode==32) return false"></Input>
                </FormItem>
                <FormItem label="是否绑定车辆" prop="isBindingVehicle">
                    <Select v-model="formValidate.isBindingVehicle" clearable>
                        <Option :value="1">是</Option>
                        <Option :value="-1">否</Option>
                    </Select>
                </FormItem>
                <!-- <FormItem label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" />
                </FormItem> -->
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
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
        props:['importEditShow','importEditData'],
        created() {
            this.infoData=JSON.parse(JSON.stringify(this.importEditData))
            this.formValidate = this.importEditData
            this.eshow=this.importEditShow
        },
        data () {
            return {
                title:"修改内容",
                formValidate:{
                    id:"",
                    middleControlNo: '',
                    blueToothName:"",
                    isBindingVehicle:'',
                    simNo:'',
                },
                infoData:'',
                ruleValidate: {
                    // middleControlNo: [
                    //     { required: true, message: '没有填写中控编号', trigger: 'blur' }
                    // ],
                },
                eshow:false
            }
        },
        mounted(){
            // console.log(this.formValidate.id)
        },
        methods: {
          cancel () {
            this.$emit('exportEditData',{show:false})
            //this.remove();
          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('exportEditData',{show:false})
                  },
                  onCancel: () => {
                     this.eshow = true
                  }
              });
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
               this.remove()

            },
            post () {
                let _this = this;
                var data = {
                    id:this.formValidate.id
                }
                if(this.infoData.middleControlNo!=this.formValidate.middleControlNo){
                    data.middleControlNo=this.formValidate.middleControlNo
                }
                if(this.infoData.blueToothName!=this.formValidate.blueToothName){
                    data.blueToothName=this.formValidate.blueToothName
                }
                if(this.infoData.isBindingVehicle!=this.formValidate.isBindingVehicle){
                    data.isBindingVehicle=this.formValidate.isBindingVehicle
                }
                if(this.infoData.simNo!=this.formValidate.simNo){
                    data.simNo=this.formValidate.simNo
                }
                this.$api.post("/middle/update", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('修改成功');
                        _this.$emit('exportEditData',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
