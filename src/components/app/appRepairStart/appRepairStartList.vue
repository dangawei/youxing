<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>APP管理</BreadcrumbItem>
                <BreadcrumbItem>维修APP启动页</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>维修APP启动页列表</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">

                </div>
                <!--操作按钮-->
                <div class="tableListOperator">
                    <Button type="primary" size="large" @click="add()">添加</Button>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div class="">
                            <Table border :columns="columns1" :data="data"></Table>
                            
                        </div>
                        <div class="mt20">
                            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
    import Pages from '@/components/pub/page.vue'
    export default {
        components:{
            Paging:Pages
        },
        data () {
            return {
                pageshow:false,
                subfrom:{
                    title:"",
                    startTime:"",
                    endTime:"",
                    startExpire:"",
                    endExpire:"",
                    status:''
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
                columns1: [
                    {
                        title: '标题',
                        key: 'remark'
                    },
                    {
                        title: '图片地址',
                        key: 'startPhoto',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.startPhoto
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '状态显示',
                        key: 'locationId',
                        render: (h, params) => {
                          var str = ""
                          if(params.row.status == -1){
                             str = "无效"
                          }else {
                            str = "有效"
                          }
                          return h('div', [
                              h('span',str)
                        ])
                     }
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:"",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'default'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                           
                                //         }
                                //     }
                                // }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'default'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        mounted () {
            this.list()
        },
        methods: {
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            list () {
                let _this = this
                var data = {
                    "pageNum":_this.pageData.pageCurrent,
                    "pageSize":_this.pageData.pagesize,
                }
                this.$api.post("/repairAppStartPage/page", data, reset => {
                    if (reset.code === 0) {
                        _this.data = reset.data.data
                        _this.pageData.pageCount = reset.data.totalPage
                        _this.pageData.pagesize = reset.data.pageSize
                        _this.pageData.totalCount = reset.data.totalCount
                        _this.pageshow=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【'+params.remark+'】吗?</p>',
                    onOk: () => {
                        this.itemdel(params)
                    },
                    onCancel: () => {

                    }
                });

            },
            itemdel (params) {
                let _this = this;
                let data={
                    id:params.id
                }
                this.$api.post("/repairAppStartPage/delete", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success("删除成功!")
                        this.list()
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            add () {
                this.$router.push({path:"/apk/repair/add"})
            }
        }
    }
</script>
