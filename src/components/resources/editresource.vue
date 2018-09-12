<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称:" prop="menuName">
                    <Input v-model="formValidate.menuName" placeholder="请输入名称"></Input>
                </FormItem>
                <FormItem label="页面路径:" prop="path">
                    <Input v-model="formValidate.path" placeholder="请输入部门名称"></Input>
                </FormItem>
                <FormItem label="接口地址:" prop="url">
                    <Input v-model="formValidate.url" placeholder="请输入接口地址"></Input>
                </FormItem>
              <!-- <FormItem label="菜单层级:" prop="icon">
                  <Select v-model="formValidate.menuStatus">
                     <Option :value="1" key="1">1</Option>
                     <Option :value="2" key="2">2</Option>
                     <Option :value="3" key="3">3</Option>
                  </Select>
              </FormItem> -->
                <!-- <FormItem label="排序字段:" prop="sortValue">
                    <Select v-model="formValidate.sortValue">
                        <Option :value="1" key="1">1</Option>
                        <Option :value="2" key="2">2</Option>
                        <Option :value="3" key="3">3</Option>
                    </Select>
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
        props:['editresourceshow','editresourcedata'],
        created() {
            this.eshow=this.editresourceshow
            this.formValidate.id = this.editresourcedata.id;
            this.formValidate.menuName = this.editresourcedata.menuName;
            this.formValidate.path = this.editresourcedata.path;
            this.formValidate.parentId = this.editresourcedata.parentId;
            this.formValidate.url = this.editresourcedata.url;
            this.formValidate.sortValue = this.editresourcedata.sortValue;
            this.formValidate.menuStatus = this.editresourcedata.menuStatus;
            this.title="修改"+this.editresourcedata.menuName+"内容";
        },
        data () {
            return {
              title:"",
              formValidate:{
                id:'',
                menuName:'',
                path:'',
                parentId:'',
                url:'',
                icon:'',
                sortValue:'',
                menuStatus:"",
              },
              ruleValidate: {
                menuName: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 14, min:2,message: '请填写2-14个字符', trigger: 'blur'}
                    ],
              },
             eshow:false
            }
        },
        methods: {
            cancel () {
                this.remove();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // vm.$emit("addmodal",this.formValidate.bool);
                        this.post()
                    } else {
                        this.$Message.error('内容填写有误!')
                        // this.focusBool=true;
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                this.remove();
            },
            remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('editresourcecomponentdata',{editresourceshow:false,start:null})
                  },
                  onCancel: () => {
                     this.eshow = true
                  }
              });
            },
            post () {
                let _this = this;               
                var data = {
                    id:this.formValidate.id,
                    parentId:this.formValidate.parentId
                }
                if (this.formValidate.menuName!=this.editresourcedata.menuName) {
                    data.menuName=this.formValidate.menuName
                }
                if (this.formValidate.sortValue!=this.editresourcedata.sortValue) {
                    data.sortValue=this.formValidate.sortValue
                }
                if (this.formValidate.path!=this.editresourcedata.path) {
                    data.path=this.formValidate.path
                }
                if (this.formValidate.url!=this.editresourcedata.url) {
                    data.url=this.formValidate.url
                }
                var req=JSON.stringify(data);
                this.$api.post("/menu/update", req, reset => {
                    if (reset.code === 0) {
                        this.$Message.success('修改成功');
                        _this.$emit('editresourcecomponentdata',{editresourceshow:false,start:_this.editresourcedata})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
