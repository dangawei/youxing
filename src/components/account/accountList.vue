<template>
    <div id="account">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem>总账号管理</BreadcrumbItem>
                    <BreadcrumbItem>总账号列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>总账号列表</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form :model="formCustom" :label-width="100">
                        <Row>
                            <Col :xs="24" :sm="24" :md="8" :lg="6">
                                <FormItem label="账号" prop="account">
                                    <Input type="text" v-model="formCustom.account"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="6">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                 <!--操作按钮-->
                <div class="tableListOperator">
                    <div class="tableListForm">
                    <Button type="primary" @click="add()"> <Icon type="android-add"></Icon> 添加</Button>
                </div>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div>
                            <i-table border :columns="columns7" :data="objArr"></i-table>
                        </div>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </Col>
               </Row>
            </div>
        </div>
        <add-account :addshow="addShow" @addShowComponent="importShow" v-if="addShow"></add-account>
        <reset-password :importPasswordShow="importPasswordShow" :importPasswordData="importPasswordData" @exportPasswordShow="exportPasswordShow" v-if="importPasswordShow"></reset-password>
    </div>
</template>
<script>
    import addAccount from './addAccount.vue'
    import resetPassword from './resetPassword.vue'
    import paging from "@/components/pub/page"
    export default {
        components:{
            addAccount,
            resetPassword,
            paging
        },
        data () {
            return {
                pageshow:false,
                addShow:false,
                importPasswordShow:false,
                importPasswordData:'',
                formCustom: {
                    account: '',
                }, 
                ruleCustom: {
                    
                },
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[5,10,15,20],
                    //分页大小
                    pagesize:15,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:10
                },
                columns7: [
                    {
                        title: '账号',
                        key: 'account',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.account)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            var str="启用"
                            if (params.row.state==1) {
                                str="启用"
                            }else{
                                str="注销"
                            }
                            return h('div', [
                                h('span', str)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '创建时间',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.createAt)
                            ])
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:280,
                        render: (h, params)=> {
                            var restart="none"
                            var logout="inline-block"
                            var psw="inline-block"
                            if (params.row.state==-1) {
                                restart="inline-block"
                                logout="none"
                                psw="none"
                            }
                            if (params.row.account==this.$webapi.get("account")) {
                                logout="none"
                                psw="inline-block"
                            }
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:logout
                                    },
                                    on: {
                                        click: () => {
                                         this.remove(params.row);
                                        }
                                    }
                                }, '注销'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:restart
                                    },
                                    on: {
                                        click: () => {
                                         this.restart(params.row);
                                        }
                                    }
                                }, '启用'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:psw
                                    },
                                    on: {
                                        click: () => {
                                         this.rePassword(params.row);
                                        }
                                    }
                                }, '修改密码'),
                            ]);
                        }
                    }
                ],
                objArr:[],
            }
        },
        mounted(){
            this.list();
        },
        created(){
           
        },
        methods: {
            cancel () {
                this.removes()
            },
            add () {
                this.addShow = true
            },
            list () {
                let _this = this
                let data={
                    companyId:this.$webapi.get("companyId"),
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                }
                if(this.formCustom.account){
                    data.account=this.formCustom.account
                }
                this.$api.post('/account/page',data,reset => {
                    if (reset.code === 0) {
                        _this.objArr = reset.data.data;
                        _this.pageData.pageCount = reset.data.totalPage
                        _this.pageData.pagesize = reset.data.pageSize
                        _this.pageData.totalCount = reset.data.totalCount
                        _this.pageData.pageCurrent = reset.data.currentPage
                        _this.pageshow =  true
                    }else{
                        _this.$netcode.getApiCode(reset)
                    }
                })
                // this.$api.post('/account/list/head',null,reset => {
                //     if (reset.code === 0) {
                //         _this.objArr=reset.data
                //     }else{
                //         _this.$netcode.getApiCode(reset)
                //     }
                // })
            },
            removes () {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.addmodal=false
                  },
                  onCancel: () => {
                     this.addmodal=true
                  }
              })
            },
            importShow(e){
                this.addShow=e.ashow
                this.list();
            },
            remove (e) {
                var _this=this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要注销'+e.account+'吗?</p>',
                    onOk: () => {
                        _this.logout(e);   
                    },
                    onCancel: () => {

                    }
                });
            },
            restart(params){
                let _this=this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要启用【'+params.account+'】吗?</p>',
                    onOk: () => {
                        _this.restartInfo(params)
                    },
                    onCancel: () => {

                    }
                });
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()           
            },
            restartInfo(e){
                let _this = this;
                var data = {
                    id:e.accountId,
                    status:1
                }
                this.$api.post("/account/update",data,reset => {
                    if (reset.code === 0) {
                        _this.$Message.info('启用成功')
                        _this.list()
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            logout(e){
                let _this = this;
                var data = {
                    id:e.accountId,
                    status:-1
                }
                this.$api.post("/account/update",data,reset => {
                    if (reset.code === 0) {
                        _this.$Message.info('注销成功')
                        _this.list()
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            rePassword(e){
                this.importPasswordShow=true;
                this.importPasswordData=e.account
            },
            exportPasswordShow(e){
                this.importPasswordShow=e.show;
            },
            handleSubmit (name) {
                this.pageshow = false
                this.pageData.pageCurrent = 1
                this.list()
            },
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
    .ivu-form-item-content{
        text-align: left;
    }
</style>
