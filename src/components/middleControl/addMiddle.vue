<template>
    <div>
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>添加单个中控信息</span>
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
                    <FormItem label="备注" prop="remark">
                        <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" />
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
                    middleControlNo:'',
                    blueToothName:'',
                    simNo:'',
                    remark:''
                },
              ruleValidate: {
                    blueToothName: [
                      { required: true, message: '蓝牙名称', trigger: 'blur' }
                    ],
                    middleControlNo:[
                        { required: true, message: '中控编号没有填写', trigger: 'blur' },
                        {type: 'string', min: 16, max:16, message: '请输入16位中控编号', trigger: 'blur'}
                    ],
                    simNo:[
                        { required: true, message: 'sim卡号',trigger: 'blur'}
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
                    blueToothName: this.formValidate.blueToothName,
                    middleControlNo: this.formValidate.middleControlNo,
                    simNo: this.formValidate.simNo
                }
                if(this.formValidate.remark){
                    this.data.remark=this.formValidate.remark
                }
                this.$api.post("/middle/add", data, reset => {
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
