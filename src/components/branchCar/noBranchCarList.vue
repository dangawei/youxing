<template>
  <div class="rule">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>车辆管理</BreadcrumbItem>
            <BreadcrumbItem to="/nobranch/car/list">未分配车辆列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>未分配车辆列表</h2>
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
                            <FormItem label="车辆编号" prop="vehicleNo">
                                <Input type="text" v-model="formCustom.vehicleNo"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="中控编号" prop="middleControlNo">
                                <Input type="text" v-model="formCustom.middleControlNo"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="车辆类型" prop="vehicleModelId">
                                <Select v-model="formCustom.vehicleModelId">
                                    <Option value="" key="">全部</Option>
                                    <Option :value="2" :key="2">二轮车</Option>
                                    <Option :value="3" :key="3">三轮车</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="导入的开始时间 ">
                                <start-date @exportDate="startExport"></start-date>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="导入的结束时间 ">
                                <end-date @exportDate="endExport"></end-date>
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
                <!-- <Row>
                    <Col :xs="16" :sm="16" :md="16" :lg="16">
                        <Upload
                            ref="excel"
                            :action="commonurl" 
                            :on-success="onsuccess" 
                            :accept="accept" 
                            :headers="header" 
                            name="file" 
                            :format="format" 
                            :on-format-error="handleFormatError" 
                            v-if="companyId==1">
                            <Button type="ghost" icon="ios-cloud-upload-outline">导入excel文件</Button>
                        </Upload>
                        <div>
                            <span>{{fileName}}</span>
                        </div>
                    </Col>
                    <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="text-align:right;">
                            <Button type="primary" @click="add">添加单个车辆</Button>
                        </div>
                    </Col>
                </Row> -->
            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
                        <Table border :columns="columnsdata" :data="data"></Table>
                        <div class="mt20">
                            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
    <!-- <add-car v-if="importShow" :importShow="importShow" @exportShow="exportShow"></add-car>
    <edit-car-info v-if="importEditShow" :importEditShow="importEditShow" :importEditData="importEditData" @exportEditData="exportEditData"></edit-car-info> -->
  </div>
</template>
<script>
    import paging from "@/components/pub/page"  
    // import addCar from "./addCar"  
    // import editCarInfo from "./editCarInfo"  
    import startDate from "@/components/pub/startDateCar"
    import endDate from "@/components/pub/endDateCar"
export default {
    components:{
        paging,
        // editCarInfo,
        // addCar,
        startDate,
        endDate
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            importShow:false,
            importEditShow:false,
            importEditData:'',
            commonurl: this.$api.root+"/vehicle/import",
            editData:{},
            format:['xls','xlsx'],
            fileName:'',
            formCustom:{
                vehicleNo:'',
                middleControlNo:'',
                importStartTime:'',
                importEndTime:'',
                vehicleModelId:''
            },
            account:'',
            accept:"appliction/json",
            header:{
                // 'Content-Type': 'multipart/form-data'
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
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    title: '车辆编号',
                    key: 'vehicleNo'
                },
                {
                    title: '车辆名称',
                    key: 'vehicleName',
                    render:(h,params)=>{
                        return h('div',[
                            h('span',params.row.vehicleName)
                        ])
                    }
                },
                {
                    title: '中控编号',
                    key: 'vehicleState',
                    render: (h, params) => {
                        // var str=''
                        // if (params.row.vehicleState==1) {
                        //     str="未分配"
                        // }
                        return h('div', [
                            h('span',params.row.middleControlNo)
                        ])
                    }
                },
                {
                    title: '车辆类型(轮)',
                    key: 'vehicleModelId',
                    render: (h, params) => {
                        // var str=''
                        // if (params.row.vehicleState==1) {
                        //     str="未分配"
                        // }
                        return h('div', [
                            h('span', params.row.vehicleModelId)
                        ])
                    }
                },
                {
                    title: '分配给分公司时间',
                    key: 'prentRentTime'
                },
                {
                    title: '到期时间',
                    key: 'prentReturnTime'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        var show="inline-block"
                        if (params.row.flag) {
                            show="none"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:show
                                },
                                on: {
                                    click: () => {
                                        this.importEditData=params.row
                                        this.importEditShow=true;
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            data: []
        }
    },
    created(){
        this.header.token = this.$webapi.get("token");
        this.companyId=this.$webapi.get("companyId")
    },
    mounted() {
        this.list()
    },
    methods:{
        list(){
            let _this=this;
            let data={
                companyId: parseInt(_this.$webapi.get("companyId")),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
                status:1,
                flag :2
            }
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.middleControlNo) {
                data.middleControlNo=this.formCustom.middleControlNo
            }
            if (this.formCustom.importStartTime) {
                data.importStartTime=this.formCustom.importStartTime+" 00:00:00"
            }
            if (this.formCustom.importEndTime) {
                data.importEndTime=this.formCustom.importEndTime+" 00:00:00"
            }
            if (this.formCustom.vehicleModelId) {
                data.vehicleModelId=this.formCustom.vehicleModelId
            }
            this.$api.post("/vehicle/page/company",data,result=>{
                if (result.code==0) {
                    _this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageshow = true                      
                }else if (result.code==9) {
                    _this.data=[]
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        add(){
            this.importShow=true    
        },
        exportShow(e){
            this.importShow=e.show
            this.list();
        },
        remove (params) {
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除吗?</p>',
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
                token:this.$webapi.get('token'),
                id:params.id
            }
            this.$api.get("/park/delete_park", data, reset => {
                if (reset.code === 1001) {
                    _this.$Message.success("删除成功!")
                    _this.list();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        onsuccess(response, file, fileList) {
            if (response.code==0) {
                this.$Message.success("上传成功!")
                this.$refs.excel.clearFiles();
                this.fileName=file.name
                this.list(); 
            }else{
                this.$Message.error("上传失败!")
                this.$netcode.getApiCode(response)
            }
        },
        handleFormatError(file, fileList){
            this.$Message.error({
                content:"文件上传格式错误,请选择xls和xlsx的文件!",
                duration:2
            })
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        startExport(e){
            this.formCustom.importStartTime=e
        },
        endExport(e){
            this.formCustom.importEndTime=e
        }
    }
  }
</script>
