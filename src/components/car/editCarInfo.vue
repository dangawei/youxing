<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>修改{{this.formValidate.vehicleNo}}信息</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="中控编号" prop="middleControlNo">
                    <Input v-model="formValidate.middleControlNo" placeholder="请输入中控编号" onkeydown="if(event.keyCode==32) return false"></Input>
                </FormItem>
                <FormItem label="车辆类型" prop="vehicleModelId">
                    <Select v-model="formValidate.vehicleModelId" clearable>
                        <Option :value="2">2</Option>
                        <Option :value="3">3</Option>
                    </Select>
                </FormItem>
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
            this.eshow=this.importEditShow
            // console.log(this.importEditData)
            this.infoData=JSON.parse(JSON.stringify(this.importEditData))
            this.formValidate.middleControlNo = this.importEditData.middleControlNo
            this.formValidate.id = this.importEditData.vehicleInfoId
            this.formValidate.vehicleModelId = this.importEditData.vehicleModelId
            this.formValidate.vehicleNo = this.importEditData.vehicleNo
        },
        data () {
            return {
                title:"修改内容",
                formValidate:{
                    id:"",
                    middleControlNo: '',
                    vehicleNo:"",
                    vehicleModelId:''
                },
                infoData:'',
                ruleValidate: {
                    middleControlNo: [
                        { required: true, message: '没有填写中控编号', trigger: 'blur' },
                        { 
                            type: 'string',
                            min:16,
                            max: 16, 
                            message: '输入16位字符',
                            trigger: 'blur'
                        }
                    ],
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
                    vehicleInfoId:this.formValidate.id
                }
                if(this.infoData.middleControlNo!=this.formValidate.middleControlNo){
                    data.middleControlNo=this.formValidate.middleControlNo
                }
                if(this.infoData.vehicleModelId!=this.formValidate.vehicleModelId){
                    data.vehicleModelId=this.formValidate.vehicleModelId
                }
                this.$api.post("/vehicle/update", data, reset => {
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
