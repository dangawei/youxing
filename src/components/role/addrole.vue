<template>
    <div>
      <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称" prop="name">
                  <Input v-model="formValidate.name" placeholder="角色名称" onkeydown="if(event.keyCode==32) return false"></Input>
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
        props: ['addroleshow'],
        created(){
          this.ashow=this.addroleshow
        },
        data () {
            return {
              title:"添加新角色",
              formValidate:{
                  name: ''
              },
              ruleValidate: {
                  name: [
                      { required: true, message: '新角色名称没有填写', trigger: 'blur' },
                      {type: 'string', min: 2, max:11, message: '请输入2-11位字符', trigger: 'blur'}
                  ],
             },
             ashow:false
            }
        },
        methods: {
          cancel () {
            this.$emit('rolecomponentdata',{addroleshow:false})
             //this.remove()
          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('rolecomponentdata',{addroleshow:false})
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
                    "accessPath": "",
                    "accessUrl": "",
                    "roleName": this.formValidate.name
                }
                this.$api.post("/role/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$emit('rolecomponentdata',{addroleshow:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
