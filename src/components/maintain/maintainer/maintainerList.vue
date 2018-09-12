<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>维修管理</BreadcrumbItem>
          <BreadcrumbItem to="/maintainer/list">维修人员列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>维修人员列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
      <div class="page-component-bd">
        <!--查询条件-->
        <div class="tableListForm">
          <Form :model="formCustom" :label-width="100">
            <!-- <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <FormItem label="维护人员名称" prop="name">
                  <Input type="text" v-model="formCustom.name"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <FormItem label="手机号" prop="phone">
                  <Input type="text" v-model="formCustom.phone"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <div class="">
                  <FormItem style="margin-left: -70px;text-align:left">
                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                  </FormItem>
                </div>
              </Col>
            </Row> -->
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
      <add-maintainer-component v-if="importShow" :importShow="importShow" @exportShow="exportShow"></add-maintainer-component>
      <edit-maintainer-component v-if="editImportShow" :editImportShow="editImportShow" :editImportData="editImportData" @editExportShow="editExportShow"></edit-maintainer-component>
    <add-maintainer-account v-if="addshow" :addshow="addshow" :id="id" :name="name" @exportShow="exportShow" @addShowComponent="ashow"></add-maintainer-account>
  </div>
</template>
<script>
  import Pages from '@/components/pub/page.vue'
  import AddMaintainerComponent from './addMaintainer.vue'
  import addMaintainerAccount from './addMaintainerAccount.vue'
  import EditMaintainerComponent from './editMaintainer.vue'
  export default {
    components: {
        Paging:Pages,
        AddMaintainerComponent,
        EditMaintainerComponent,
        addMaintainerAccount
        // citycommon
    },
    data () {
        return {
            importShow:false,
            editImportShow:false,
            editImportData:'',
            pageshow:false,
            addshow:false,
            id:'',
            name:'',
            formCustom:{
              name:"",
              phone:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:15,
            },
            columnsdata: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '手机',
                    key: 'phone'
                },
                {
                    title: '工号',
                    key: 'workerNo'
                },
                {
                    title: '所属维修站点',
                    key: 'siteName',
                    render: (h, params) => {
                        let str="未分配"
                        if (params.row.siteName) {
                            str=params.row.siteName
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                // {
                //     title: '登录账号',
                //     key: 'siteName',
                //     render: (h, params) => {
                //         let str="未分配"
                //         if (params.row.repairWorkerLoginId) {
                //             str=params.row.repairWorkerLoginId
                //         }
                //         return h('div', [
                //             h('span', str)
                //         ])
                //     }
                // },
                {
                    title: '创建时间',
                    key: 'createAt'
                },
                {
                    title: '状态',
                    key: 'status',
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
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:260,
                    render: (h, params) => {
                        var str="inline-block"
                        var restart="none"
                        var isDisabled=false
                        if (params.row.status==-1) {
                            str="none"
                            restart="inline-block"
                        }
                        if (params.row.repairWorkerLoginId) {
                            isDisabled=true
                        }
                        
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled:isDisabled
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                        this.id=params.row.id
                                        this.name=params.row.name
                                        this.addshow=true;
                                    }
                                }
                            }, '分配账号'),
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
                                        this.$router.push("/maintainer/detail/"+params.row.id)
                                    }
                                }
                            }, '详情')
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
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize
            }
            var _this =  this
            this.$api.post('/repairWorker/page',listdata,reset => {
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
        add() {
            this.importShow=true;
        },
        exportShow(e){
            this.importShow=e.show
            this.list();
        },
        revamp(e){
            this.editImportData=e;
            this.editImportShow=true;
        },
        editExportShow(e){
            this.editImportShow=e.show
            this.list();
        },
        remove (params) {
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+params.name+'】吗?</p>',
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
            this.$api.post("/repairWorker/delete", data, reset => {
                if (reset.code === 0) {
                    _this.$Message.success("删除成功!")
                    _this.list();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        restart(params){
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要启用【'+params.name+'】吗?</p>',
                onOk: () => {
                    _this.resModel(params)
                },
                onCancel: () => {

                }
            });
        },
        resModel(params){
            let _this = this
            var data={
              "id":params.id,
              "status":1
            }
            this.$api.post("/repairWorker/update", data, reset => {
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
        ashow(e){
            this.addshow=e.ashow;
            this.list();
        },
    }
    
  }
</script>
