<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
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
        props:['editroleshow','editroledta'],
        created() {
          this.eshow=this.editroleshow
          this.formValidate.name = this.editroledta.roleName
          this.formValidate.id = this.editroledta.id
        },
        data () {
            return {
              title:"修改内容",
              formValidate:{
                  id:"",
                  name: '',
                  remark:"",
                  status:1
              },
              ruleValidate: {
                  name: [
                      { required: true, message: '新角色名称没有填写', trigger: 'blur' }
                  ],
             },
             eshow:false
            }
        },
        mounted(){

        },
        methods: {
          cancel () {
            this.$emit('editrolecomponentdata',{editroleshow:false})
            //this.remove();
          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('editrolecomponentdata',{editroleshow:false})
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
                "accessPath": "string",
                "accessUrl": "string",
                "id": this.formValidate.id,
                "roleName": this.formValidate.name
              }
              this.$api.post("/role/update", data, reset => {
                if (reset.code === 0) {
                  _this.$Message.success('修改成功');
                   _this.$emit('editrolecomponentdata',{editroleshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
