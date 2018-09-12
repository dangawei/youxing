<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>维修管理</BreadcrumbItem>
          <BreadcrumbItem>维修记录列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>维修记录列表</h2>
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
                <FormItem label="维护人员编号" prop="workerNo">
                  <Input type="text" v-model="formCustom.workerNo"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <FormItem label="维修车辆编号" prop="vehicleNo">
                  <Input type="text" v-model="formCustom.vehicleNo"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <div class="">
                  <FormItem style="margin-left: -70px;text-align:left">
                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                  </FormItem>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <!--操作按钮-->
        <div class="tableListOperator">
          <Button type="primary"  @click="exportExcel()">导出excel</Button>
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
    <updata-record v-if="importShow" :importShow="importShow" :importData="importData" @exportShow="exportShow"></updata-record>

  </div>
</template>
<script>
  import Pages from '@/components/pub/page.vue'
  import updataRecord from './updataRecord.vue'
  export default {
    components: {
        Paging:Pages,
        updataRecord,
        // EditMaintainerComponent
        // citycommon
    },
    data () {
        return {
            importShow:false,
            editImportShow:false,
            editImportData:'',
            importData:'',
            pageshow:false,
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
                    title: '维修人员编号',
                    key: 'workerNo'
                },
                {
                    title: '维修人员姓名',
                    key: 'workerName'
                },
                {
                    title: '维修车辆编号',
                    key: 'vehicleNo'
                },
                {
                    title: '维修部件',
                    key: 'faultTypeName',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.faultRecordVO.faultTypeName)
                        ])
                    }
                },
                {
                    title: '维修结果',
                    key: 'repairResult',
                    render: (h, params) => {
                        let str=""
                        switch (params.row.repairResult){
                            case 1:
                                str="已修复"
                                break;
                            case 2:
                                str="维修中"
                                break;
                            case 3:
                                str="未修好"
                                break;
                            case 4:
                                str="已报废"
                                break;
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                {
                    title: '维修结束时间',
                    key: 'endTime'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:300,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.updata(params.row);
                                    }
                                }
                            }, '修改状态'),
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
            var _this =  this
            var listdata = {
                "id":parseInt(this.$webapi.get("companyId")),
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize,
                // "repairResult": ,
                // "vehicleNo": "mc12340001",
                // "workerNo": "mc12340001"
            }
            if (this.formCustom.vehicleNo) {
                listdata.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.workerNo) {
                listdata.workerNo=this.formCustom.workerNo
            }
            this.$api.post('/repairRecord/page',listdata,reset => {
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
              content: '<p>确认【'+params.name+'】要删除吗?</p>',
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
        updata(e){
            this.importShow=true;
            this.importData=e
        },
        exportExcel(){
            let _this=this;
            let data={
                id:Number.parseInt(this.$webapi.get("companyId"))
            }
            if (this.formCustom.workerNo) {
                data.workerNo=this.formCustom.workerNo
            }
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.repairResult) {
                data.repairResult=this.formCustom.repairResult
            }
            this.$api.get("/excelExport/repairRecord",data,result=>{
                // console.log(result)
                if (result) {
                    if (result.code) {
                        if(result.code == undefined || result.code==null){
                            _this.$Message.error(result.message)
                        }else{
                           _this.$netcode.getApiCode(result) 
                        }
                    }else {
                        window.location.href=this.$webapi.http_url(this.$api.root+"/excelExport/repairRecord",data)
                    }
                }else{
                    _this.$Message.error("请求错误!")
                }
            })
        }
    }
    
  }
</script>
