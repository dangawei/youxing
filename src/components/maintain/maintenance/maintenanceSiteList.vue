<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>维修管理</BreadcrumbItem>
          <BreadcrumbItem to="/maintenance/list">维修站点列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>维修站点列表</h2>
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
                            <FormItem label="站点名称" prop="siteName">
                                <Input type="text" v-model="formCustom.siteName"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label=" 站点编号" prop="siteNo">
                                <Input type="text" v-model="formCustom.siteNo"></Input>
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
            <Button type="primary"  @click="add()">添加</Button>
        </div>
        <Row>
           <Col :xs="24" :sm="24" :md="24" :lg="24">
               <div class="">
                    <Table border :columns="columnsdata" :data="data"></Table>
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
      <add-maintenance v-if="addshow" :addshow="addshow" @addshow="addshows"></add-maintenance>
      <edit-maintenance v-if="editshow" :editshow="editshow" :editdata="editdata" @editshow="editshows"></edit-maintenance>

  </div>
</template>
<script>
  import Pages from '@/components/pub/page.vue'
  import addMaintenance from './addMaintenance.vue'
  import editMaintenance from './editMaintenance.vue'
  // import citycommon from "../pub/citycommon.vue"
  export default {
    components: {
        Paging:Pages,
        addMaintenance,
        editMaintenance
        // citycommon
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            editdata:'',
            pageshow:false,
            formCustom:{
              siteName:"",
              siteNo:""
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
            columnsdata: [
                {
                    title: '站点编号',
                    key: 'siteNo',
                    width:100
                },
                {
                    title: '站点名称',
                    key: 'siteName',
                    width:150
                },
                {
                    title: '联系人姓名',
                    key: 'name',
                    width:100
                },
                {
                    title: '联系人电话',
                    key: 'phone',
                    width:150
                },
                {
                    title: '地址',
                    key: 'address',
                    width:200
                },
                {
                    title: '经度',
                    key: 'longitude',
                    width:120
                },
                {
                    title: '纬度',
                    key: 'latitude',
                    width:120
                },
                {
                    title: '状态',
                    key: 'status',
                    width:100,
                    render: (h, params) => {
                        let str="正常"
                        if (params.row.status==-1) {
                            str="注销"
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                {
                    title: '创建时间',
                    key: 'createAt',
                    width:120,
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.createAt)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:350,
                    fixed: 'right',
                    render: (h, params) => {
                        var str="inline-block"
                        var restart="none"
                        if (params.row.status==-1) {
                            str="none"
                            restart="inline-block"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                      this.revamp(params.row);
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                      this.remove(params.row);
                                    }
                                }
                            }, '注销'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
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
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                      this.$router.push({
                                        path:"/allocation/maintainer/"+params.row.id,
                                        query:{
                                          siteNo:params.row.siteName
                                        }
                                      })
                                    }
                                }
                            }, '分配维修人员'),
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px',
                            //         display:str
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.$router.push({
                            //                 path:"/relate/dealer/"+params.row.id,
                            //                 query:{
                            //                   siteNo:params.row.siteName
                            //                 }
                            //             })
                            //         }
                            //     }
                            // }, '关联经销商'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:"/maintenance/detail/"+params.row.id,
                                            query:{
                                                siteId:params.row.id,
                                                siteName:params.row.siteName
                                            }
                                        })
                                    }
                                }
                            }, '详情'),
                        ]);
                    }
                }
            ],
            data: []
        }
    },
    mounted() {
      this.list()
    },
    methods: {
        list () {
            var listdata = {
                pageNum: this.pageData.pageCurrent,
                pageSize: this.pageData.pagesize
            }
            if (this.formCustom.siteName) {
                listdata.siteName=this.formCustom.siteName
            }
            if (this.formCustom.siteNo) {
                listdata.siteNo=this.formCustom.siteNo
            }
            var _this =  this
            this.$api.post('/repairSite/page',listdata,reset => {
                if (reset.code === 0) {
                    _this.data=reset.data.data
                    _this.pageData.pageCount = reset.data.totalPage
                    _this.pageData.pagesize = reset.data.pageSize
                    _this.pageData.totalCount = reset.data.totalCount
                    _this.pageData.pageCurrent = reset.data.currentPage
                    _this.pageshow=true
                } else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        add () {
            this.$router.push("/maintenance/add")
        },
        addshows(e){
            this.addshow=e
            this.list();
        },
        revamp(e){
          this.$router.push("/maintenance/edit/"+e.id)
        },
      editshows(e){
        this.editshow=e
        this.list();
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要删除【'+params.siteName+'】吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
        itemdel (params) {
            let _this = this
            var data={
                id:params.id
            }
            this.$api.post("/repairSite/delete", data, reset => {
            if (reset.code === 0) {
                _this.$Message.success("删除成功!")
                _this.list();
             }else {
                _this.$netcode.getApiCode(reset)
            }
            })
        },
        restart(e){
            let _this = this
            var data={
                id:e.id,
                status: 1
            }
            this.$api.post("/repairSite/update", data, reset => {
            if (reset.code === 0) {
                _this.$Message.success("启用成功!")
                _this.list();
             }else {
                _this.$netcode.getApiCode(reset)
            }
            })
        },
      handleSubmit (name) {
        this.pageshow = false
        this.pageData.pageCurrent = 1
        this.list()
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
    }
    
  }
</script>
