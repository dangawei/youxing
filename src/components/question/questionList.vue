<template>
    <div id="question" style="width:100%">
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
                 <h2>常见问题管理</h2>
              </div>
          </div>
        </div>

        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <Row>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="标题" prop="title">
                                    <Input type="text" v-model="formCustom.title"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6" style="text-align:left">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                 <!--操作按钮-->
                <div class="tableListOperator">
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div >
                                <Button type="primary" @click="addmodal"> <Icon type="ios-plus-empty"></Icon> 添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <modals :modalbool="modals"></modals>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div>
                            <i-table border :columns="columns7" :data="objArr"></i-table>
                        </div>
                    </Col>
                </Row>
                <Row style="text-align:center">
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
    import Pages from '@/components/pub/page.vue'
    import QuestionComponentAdd from './addquestion.vue'
    import QuestionComponentEdit from './editquestion.vue'
    export default {
        data () {
            return {
                pageshow:false,
                editquestionshow:false,
                editquestiondata:{},
                typename:'Question',
                idchange:'',
                namechange:'',
                formCustom: {
                    title:'',
                },
                ruleCustom: {
                    title: [
                        {trigger: 'blur' }
                    ],
                },
                // 分页
                pageData:{
                    totalCount:1,
                    //
                    pageCurrent:1,

                    pagesize:20,
                },
                modals:{
                    modalBool: false,
                    successText:""
                },
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.title)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '内容',
                        key: 'centent',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.centent)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params)=> {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        // size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#fff'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleRender(params.row)

                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        // size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#fff'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)

                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                objArr:[],
            }
        },
        components:{
            Paging:Pages,
            QuestionComponentAdd:QuestionComponentAdd,
            QuestionComponentEdit:QuestionComponentEdit
        },
        mounted(){
            this.list();
        },
        created(){
            
        },
        methods: {
            addmodal(){
                this.$router.push("/question/addquestion")
            },
            handleRender (val) {
                this.$router.push({
                    name:'Editquestion',
                    params:val
                })

            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editquestioncomponentdata(e){
                console.log(e);
                this.editquestionshow = e.editquestionshow;
                this.list();
            },
            list () {
                let _this = this;
                let data = {
                    token:this.$webapi.get('token'),
                    pageNo:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                };
                console.log(data.token);
                this.$api.get('/common_problem/page',data,reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData;
                        _this.objArr = data.list;
                        _this.pageData.totalCount = data.totalCount;
                        _this.pageshow =  true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (e) {

                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除'+e.title+'吗?</p>',
                    onOk: () => {
                        let _this = this;
                        let url="/common_problem/delete?token=" + this.$webapi.get('token') + "&commonProblemId=" + e.id;
                        this.$api.post(url,null,reset => {
                            if (reset.codeId === 1) {
                                _this.list();
                                _this.$Message.info('删除成功');
                                _this.pageshow =  true;
                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (this.formCustom.id!='') {
                        let _this = this;
                        let data = {
                            token:this.$webapi.get('token'),
                            title:this.formCustom.title,
                            pageNo:_this.pageData.pageCurrent,
                            pageSize:_this.pageData.pagesize,
                        };
                        this.$api.get('/common_problem/page',data,reset => {
                            if (reset.codeId === 1) {
                                let data = reset.resData;
                                _this.objArr = data.list;
                                _this.pageData.totalCount = data.totalCount;
                                _this.pageshow =  true;
                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    }else{
                        this.list();
                    }

                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style scoped>
   .base-info{
        font-size: 18px;
        text-align: left;
        padding-top: 15px;
        margin-bottom: 26px;
        padding-left: 30px;
        padding-bottom: 15px;
        background-color: #fff;
   }
   .base-color{
        color: #8c8c8c;
   }
    h3{
        font-size: 26px;
        text-align: left;
    }
    .dep-updata{
        text-align: left;
        padding-left: 30px;
        margin-bottom: 15px;
    }
    .content-bottom{
        width: 100%;
    }
</style>
