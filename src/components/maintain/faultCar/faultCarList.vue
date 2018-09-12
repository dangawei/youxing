<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>维修管理</BreadcrumbItem>
          <BreadcrumbItem to="/fault/car/list">故障记录列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>故障记录列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
      <div class="page-component-bd">
        <!--查询条件-->
        <div class="tableListForm">
            <Form :model="formCustom" :label-width="100" label-position="right">
                <Row>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="车辆编号" prop="vehicleNo">
                            <!-- <get-fault-car @exportData="exportNo"></get-fault-car> -->
                            <Input v-model="formCustom.vehicleNo" placeholder="车辆编号"></Input>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="故障类型" prop="faultType">
                            <fault-type @exportData="exportType" required></fault-type>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="故障状态" prop="faultStatus">
                            <Select v-model="formCustom.faultStatus">
                                <!-- <Option value="" key="">全部</Option> -->
                                <Option :value="1">故障中</Option>
                                <Option :value="2">已修复</Option>
                                <Option :value="3">已报废</Option>
                                <Option :value="4">维修中</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <div>
                            <FormItem style="text-align:left">
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <!--操作按钮-->
        <div class="tableListOperator">
          <Button type="primary"  @click="add()">添加</Button>
          <Button type="primary"  @click="exportExcel()" style="float:right;">导出excel</Button>
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
      <add-fault-car v-if="importShow" :importShow="importShow" @exportShow="exportShow"></add-fault-car>
      <assign-fault-car v-if="maintainedShow" :importShow="maintainedShow" :importData="bikeInfo" @exportShow="maintainedBack"></assign-fault-car>
  </div>
</template>
<script>
    import Pages from '@/components/pub/page.vue'
    import addFaultCar from './addFaultCar.vue'
    import assignFaultCar from './assignFaultCar.vue'
    import faultType from "@/components/pub/faultType"
    import getFaultCar from "@/components/pub/getFaultCar"
export default {
    components: {
        Paging:Pages,
        addFaultCar,
        faultType,
        getFaultCar,
        assignFaultCar
    },
    data () {
        return {
            importShow:false,
            editImportShow:false,
            editImportData:'',
            maintainedShow:false,
            bikeInfo:{},
            pageshow:false,
            formCustom:{
              vehicleNo:"",
              faultType:"",
              faultStatus:1
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:15,
            },
            columnsdata: [
                {
                    title: '维修车辆编号',
                    key: 'vehicleNo'
                },
                {
                    title: '故障类型',
                    key: 'faultTypeName',
                    // render: (h, params) => {
                    //     let str=""
                    //     switch (params.row.faultType){
                    //         case 1:
                    //             str="刹车"
                    //             break;
                    //         case 2:
                    //             str="车牌"
                    //             break;
                    //         case 3:
                    //             str="轮胎"
                    //             break;
                    //         case 4:
                    //             str="踏板"
                    //             break;
                    //         case 5:
                    //             str="坐垫"
                    //             break;
                    //         case 6:
                    //             str="车锁"
                    //             break;
                    //         case 7:
                    //             str="链条"
                    //             break;
                    //         case 8:
                    //             str="其他"
                    //             break;
                    //     }
                    //     return h('div', [
                    //         h('span', str)
                    //     ])
                    // }
                },
                {
                    title: '故障详情',
                    key: 'faultDetails'
                },
                {
                    title: '状态',
                    key: 'faultStatus',
                    render: (h, params) => {
                        let str=""
                        switch (params.row.faultStatus){
                            case 1:
                                str="故障中"
                                break;
                            case 2:
                                str="已修复"
                                break;
                            case 3:
                                str="已报废"
                                break;
                            case 4:
                                str="维修中"
                                break;
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                {
                    title: '上报时间',
                    key: 'createdAt',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.createdAt)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:300,
                    render: (h, params) => {
                        let str=false
                        let color="#fff"
                        if (params.row.faultStatus!=1) {
                            str=true
                            color="#ccc"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default',
                                    disabled:str
                                },
                                style: {
                                    marginRight: '5px',
                                    color:color
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:"/assign/fault/car/"+params.row.id,
                                            query:{
                                                vehicleNo:params.row.vehicleNo
                                            }
                                        })
                                    }
                                }
                            }, '分配维修人员'),
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
                            //             this.$router.push({
                            //                 path:"/fault/car/detail"+params.row.id,
                            //                 query:{
                            //                     vehicleNo:params.row.vehicleNo
                            //                 }
                            //             })
                            //         }
                            //     }
                            // }, '故障详情')
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
            if (this.formCustom.faultType) {
                listdata.faultType=this.formCustom.faultType
            }
            if (this.formCustom.faultStatus) {
                listdata.faultStatus=this.formCustom.faultStatus
            }
            if (this.formCustom.vehicleNo) {
                listdata.vehicleNo=this.formCustom.vehicleNo
            }
            var _this =  this
            this.$api.post('/fault/page',listdata,reset => {
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
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        complate(e){
            this.maintainedShow=true;
            this.bikeInfo=e;
        },
        // 查询相关
        exportType(e){
            this.formCustom.faultType=e
        },
        exportNo(e){
            this.formCustom.vehicleNo=e;
        },
        maintainedBack(e){
            this.maintainedShow=e.show
        },
        exportExcel(){
            let _this=this;
            let data={
                id:Number.parseInt(this.$webapi.get("companyId"))
            }
            if (this.formCustom.faultType) {
                data.faultType=this.formCustom.faultType
            }
            if (this.formCustom.faultStatus) {
                data.faultStatus=this.formCustom.faultStatus
            }
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            this.$api.get("/excelExport/fault",data,result=>{
                // console.log(result)
                if (result) {
                    if (result.code) {
                        if(result.code == undefined || result.code==null){
                            _this.$Message.error(result.message)
                        }else{
                           _this.$netcode.getApiCode(result) 
                        }
                    }else {
                        window.location.href=this.$webapi.http_url(this.$api.root+"/excelExport/fault",data)
                    }
                }else{
                    _this.$Message.error("请求错误!")
                }
            })
        }
    }
    
  }
</script>
