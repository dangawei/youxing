<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>基础信息</BreadcrumbItem>
              <BreadcrumbItem>常见问题管理</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>{{title}}</h2>
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
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
              </FormItem>
            </Form>
          </div>
        </div>
    </div>
</template>
<script>
    import Ue from '@/components/pub/UE.vue'
    export default {
        // props:['editquestionshow','editquestiondata'],
        created() {
            this.formValidate.content = this.$route.params.content
            this.formValidate.id = this.$route.params.id;
            this.formValidate.title = this.$route.params.title;
            this.title="修改"+this.$route.params.title;
        },
        data () {
            return {
              title:"",
              formValidate:{
                  id:'',
                  title:'',
                  content: ''
              },
              ruleValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ]
             }
            }
        },
        components:{
          Ue:Ue
        },
        methods: {
          cancel () {
            this.$emit('editquestioncomponentdata',{editquestionshow:false})
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            post () {
              let _this = this;
              var url = "/common_problem/update?token=" + this.$webapi.get('token') + "&commonProblemId=" + this.formValidate.id + "&title="+this.formValidate.title+ "&content="+this.formValidate.content;
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