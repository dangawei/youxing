<template>
    <div>
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>添加单个车辆</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="96" label-position="left">
                    <FormItem label="车辆编号" prop="vehicleNo">
                        <Input v-model="formValidate.vehicleNo" placeholder="车辆编号" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="中控编号" prop="middleControlNo">
                        <Input v-model="formValidate.middleControlNo" placeholder="中控编号" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem label="车辆类型(轮)" prop="vehicleModelId">
                        <Select v-model="formValidate.vehicleModelId" clearable>
                            <Option :value="2">2</Option>
                            <Option :value="3">3</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
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
        props: ['importShow'],
        created(){
          this.ashow=this.importShow
        },
        data () {
            return {
                title:"添加新角色",
                formValidate:{
                    vehicleNo: '',
                    middleControlNo:'',
                    vehicleModelId:2,
                },
              ruleValidate: {
                    vehicleNo: [
                      { required: true, message: '车辆编号没有填写', trigger: 'blur' },
                      {type: 'string', min: 8, max:8, message: '请输入8位编号', trigger: 'blur'}
                    ],
                    middleControlNo:[
                        { required: true, message: '中控编号没有填写', trigger: 'blur' },
                        {type: 'string', min: 16, max:16, message: '请输入16位中控编号', trigger: 'blur'}
                    ],
                    vehicleModelId:[
                        { required: true, message: '没有选择类型'}
                    ],
             },
             ashow:false
            }
        },
        methods: {
            cancel () {
                this.$emit('exportShow',{show:false})
                //this.remove()
            },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('exportShow',{show:false})
                  },
                  onCancel: () => {
                     this.ashow = true
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
              // this.$emit('rolecomponentdata',{addroleshow:false})
            },
            post () {
                let _this = this;
                var data = {
                    "vehicleNo": this.formValidate.vehicleNo,
                    "middleControlNo": this.formValidate.middleControlNo,
                    "vehicleModelId": this.formValidate.vehicleModelId
                }
                this.$api.post("/vehicle/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportShow',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
