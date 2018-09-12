<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>常见问题管理</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>常见问题新增</h2>
              </div>
          </div>
        </div>
        
        <div class="page-component-view">
            <div class="page-component-bd">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="标题:" prop="title">
                        <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                    </FormItem>
                    <FormItem label="内容:" prop="content">
                        <ue @UE_data="uedata"></ue>
                    </FormItem>
                    <FormItem class="btns">
                       <Button type="ghost" @click="handleReset('formValidate')" size="large">取消</Button>
                       <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
                   </FormItem>

                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    import Ue from '../../pub/UE.vue'
    import {vm} from '../../../js/infobase/vm.js'
    export default {
        data () {
            return {
                
                formValidate: {
                    bool:false,
                    title:'',
                    content:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    
                }
            }
        },
        components:{
            Ue:Ue
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.$emit("addmodal",this.formValidate.bool);
                        
                        this.post();
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('内容填写不完整!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                vm.$emit("addmodal",this.formValidate.bool)
            },
            post () {
              let _this = this;
              var url = "/common_problem/add?token=" + this.$webapi.get('token') + "&title=" + this.formValidate.title + "&content="+this.formValidate.content;
              this.$api.post(url, null, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('Success!');
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            // 获取编辑器的内容
            uedata(datas){
                return this.formValidate.content=datas;
            }
        }
    }
</script>
<style scoped>
    .btns{
        margin-top: 100px;
    }
</style>