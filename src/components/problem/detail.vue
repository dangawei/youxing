<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem to="/problem/list">常见问题管理列表</BreadcrumbItem>
              <BreadcrumbItem>常见问题详情</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>【{{this.formValidate.title}}】详情</h2>
              </div>
          </div>
        </div>

        <div class="page-component-view">
            <div class="page-component-bd">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                  <FormItem label="分类:" prop="title">
                       <problem-component @problecomponent="problecomponent" :problemName="formValidate.classifyId" v-if="show" :booldis="true"></problem-component>
                  </FormItem>
                  <FormItem label="标题:" prop="title">
                      <Input v-model="formValidate.title" placeholder="请输入标题" disabled></Input>
                  </FormItem>
                  <FormItem label="内容:" prop="content">
                      <ue @UE_data="uedata" :UE_editdata="formValidate.content" v-if="UE_show"></ue>
                  </FormItem>
                  <FormItem class="btns">
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
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
        created() {
          this.formValidate.title =  this.$route.params.title
          this.formValidate.id =  this.$route.params.id
          this.formValidate.classifyId = this.$route.params.classifyId
          console.log(this.formValidate.classifyId)
          this.list()
        },
        data () {
            return {
              title:"",
              show:false,
              UE_show:false,
              formValidate:{
                  id:'',
                  title:'',
                  content: '',
                  classifyId:""
              },
              newitem:{

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
          
        },
        methods: {
          list () {
            let _this = this;
            var url = "/common_problem/detail?token=" + this.$webapi.get('token') + "&commonProblemId=" + this.$route.params.id
            this.$api.get(url, null, reset => {
              if (reset.codeId === 1) {
                  _this.formValidate.content = reset.resData.content
                  _this.show=true
                  _this.UE_show = true
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          },
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
                  commonProblemId:this.$route.params.id,
                  title:this.newitem.title,
                  content:this.formValidate.content,
                  classifyId:this.formValidate.classifyId
              }
              var url = "/common_problem/update?"+this.$QS.stringify(data)
              this.$api.post(url, null, reset => {
                if (reset.codeId === 1) {
                   this.$Message.success('修改成功')
                   this.$router.push({path:"/problem/list"})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            // 获取编辑器的内容
            uedata(datas){
                return this.formValidate.content=datas;
            },
            problecomponent(e){
              // console.log(e);
              this.formValidate.classifyId=e.id;
            }
        },
        watch:{
            "formValidate.title" : {
                handler: function (val, oldVal) {
                    if(val != oldVal&& oldVal!=""){
                      this.newitem.title = val
                    }
                 },
                deep: true
           }
        }
    }
</script>
<style scoped>
    .btns{
        margin-top: 100px;
    }
</style>
