<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem to="/problem/list">常见问题管理列表</BreadcrumbItem>
              <BreadcrumbItem>添加常见问题</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>添加常见问题</h2>
              </div>
          </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                  <FormItem label="分类:" prop="title">
                       <problem-component @problecomponent="problecomponent" v-if="show" :booldis="false"></problem-component>
                  </FormItem>
                  <FormItem label="标题:" prop="title">
                      <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                  </FormItem>
                  <FormItem label="内容:" prop="content">
                      <ue @UE_data="uedata" v-if="show"></ue>
                  </FormItem>
                  <FormItem class="btns">
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
              </Form>
          </div>
        </div>
    </div>
</template>
<script>
    import Ue from '../../pub/UE.vue'
    import problemComponent from './problemcommon.vue'
    export default {
        // props:['editaboutusshow','editaboutusdta'],
        data () {
            return {
              title:"",
              show:false,
              formValidate:{
                  id:'',
                  title:'',
                  content: '',
                  classifyId:''
              },
              ruleValidate: {
                title: [
                    { required: true, message: '标题没有填写', trigger: 'blur' }
                ]
             }
            }
        },
        components:{
            Ue:Ue,
            problemComponent
        },
        mounted(){
          this.show = true
        },
        methods: {
          cancel () {
            this.$emit('editaboutuscomponentdata',{editaboutusshow:false})
          },
          handleSubmit (name) {
                var _this = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      _this.post()
                    }
                })
            },
            handleReset (name) {
                this.$router.back(-1);
            },
            post () {
              let _this = this
              var data = {
                token:this.$webapi.get('token'),
                classifyId:this.formValidate.classifyId,
                title:this.formValidate.title,
                content:this.formValidate.content
              }
              this.$api.post("/common_problem/add", data, reset => { 
                if (reset.codeId === 1) {
                   this.$Message.success('保存成功')
                   this.$router.push({path:"/problem/list"})
                }else {
                   _this.$netcode.getApiCode(reset)
               }
              })
            },
            problecomponent (e) {
              this.formValidate.classifyId = e.id
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
