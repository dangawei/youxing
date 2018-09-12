<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>车辆管理</BreadcrumbItem>
			<BreadcrumbItem to="/allocationed/car/list">已分配车辆列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>已分配车辆列表</h2>
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
                            <FormItem label="归属分公司" prop="subordinateName">
                                <Input type="text" v-model="formCustom.subordinateName"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="出租的开始时间 ">
                                <start-date @exportDate="startExport"></start-date>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="出租的到期时间 ">
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
              <Button type="primary"  @click="middleStatus()">查看选中的中控状态</Button>
			  <Button type="primary"  @click="operation()" style="float:right;">批量操作车辆</Button>
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
				    <div class="">
						<Table border :columns="columnsdata" :data="data"
                            @on-select-cancel="selectCancel"
                            @on-selection-change="selectChange"
                            @on-select-all="allChange">
                        </Table>
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
        <div>
            <car-action v-if="importShow" :importData="importData" :importShow="importShow" @exportShow="exportShow"></car-action>
        </div>
    </div>
  </div>
</template>
<script>
    import paging from "./../pub/page"  
    import carAction from "./carAction"
    import startDate from "@/components/pub/startDateCar"
    import endDate from "@/components/pub/endDateCar" 
    import { vm } from "@/js/vm.js" 
export default {
    components:{
        paging,
        carAction,
        startDate,
        endDate
    },
    data () {
        return {
            importShow:false,
            importData:"",
            pageshow:true,
            editData:{},
            formCustom:{
                vehicleNo:'',
                middleControlNo:'',
                importStartTime:'',
                importEndTime:'',
                vehicleModelId:'',
                expireStartTime:'',
                expireEndTime:'',
                subordinateName:''
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
            selectCar:[],
            columnsdata: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '车辆编号',
                    key: 'vehicleNo'
                },
                {
                    title: '车辆名称',
                    key: 'vehicleName'
                },
                {
                    title: '中控编号',
                    key: 'middleControlNo',
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
                    title: '已分配分公司名称',
                    key: 'subordinateName',
                    render: (h, params) => {
                        return h('div', [
                            h('span',params.row.subordinateName)
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
                    title: '租用开始时间',
                    key: 'rentTime',
                    render: (h, params) => {
                        // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', params.row.rentTime)
                        ])
                    }
                },
                {
                    title: '到期时间',
                    key: 'returnTime',
                    render: (h, params) => {
                        // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', params.row.returnTime)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:260,
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
                                        this.importShow=true;
                                        this.importData=params.row.middleControlNo
                                    }
                                }
                            }, '操作车辆'),
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
                                       this.$router.push({
                                        path:"/car/timeline/"+params.row.vehicleId,
                                        query:{
                                            vehicleNo:params.row.vehicleNo
                                        }
                                    }) 
                                    }
                                }
                            }, '查看车辆流转')
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
    methods:{
        list(){
            let _this=this;
            let data={
                companyId: parseInt(_this.$webapi.get("companyId")),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
                status:2,
                flag :1
            }
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.middleControlNo) {
                data.middleControlNo=this.formCustom.middleControlNo
            }
            if (this.formCustom.subordinateName) {
                data.subordinateName=this.formCustom.subordinateName
            }
            if (this.formCustom.expireStartTime) {
                data.expireStartTime=this.formCustom.expireStartTime+" 00:00:00"
            }
            if (this.formCustom.expireEndTime) {
                data.expireEndTime=this.formCustom.expireEndTime+" 00:00:00"
            }
            if (this.formCustom.vehicleModelId) {
                data.vehicleModelId=this.formCustom.vehicleModelId
            }
            this.$api.post("/vehicle/page/company",data,result=>{
                if (result.code==0) {
                    var data  =  result.data.data 
                    if(_this.selectCar.length>0){
                        data.forEach( (obj) =>{
                            // if (obj.state==2) {
                            //     obj._disabled=true
                            // }
                            _this.selectCar.forEach((a)=>{
                                var idx=0;
                                if (obj.middleControlNo==a) {
                                    obj._checked= true
                                }
                            })
                        }) 
                    }else{
                        // data.forEach((obj)=>{
                        //     if (obj.state==2) {
                        //         obj._disabled=true
                        //     }
                        // })
                    }
                    _this.data=data.concat()
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageshow = true                      
                }else if(result.code==9){
                    _this.data=[]
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        selectCancel(all,opa){
            var _this=this;
            this.selectCar.forEach(function(obj,j){
                if (obj==opa.middleControlNo) {
                    _this.selectCar.splice(j,1);
                }
            })
        },
        allChange(opa){
            var _this=this;
            if (opa) {
               this.allCar=[];
               this.allCar=opa;
            }
        },
        // 选中项事件
        selectChange(e){
            var result=[];
            var reset = this.selectCar.concat();
            var _this=this; 
            if(reset.length>0){
                if (e.length==0) {
                    // var resetBox=reset.concat();
                    reset.forEach(function(obj,j){
                        var flag=true;
                        _this.allCar.forEach(function(a,b){
                            if (obj==a.middleControlNo) {
                                // resetBox.splice(j,1);
                                // delete reset[j];
                                flag=false;
                            }
                        })
                        if (flag) {
                            result.push(reset[j]);
                        }
                    })
                    reset=result.concat();
                }else{
                   e.forEach(function(obj){
                        var idx = 0
                        reset.forEach((b) =>{
                            if(b == obj.middleControlNo) {
                                idx = 1
                            }
                        })
                        if(idx ==0){
                            reset.push(obj.middleControlNo)
                        }
                    })
                }
            }else{
                e.forEach(function(obj){
                    reset.push(obj.middleControlNo)
                })   
            }
            _this.selectCar = reset.concat()
        },
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        exportShow(e){
            this.importShow=e.show
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        startExport(e){
            this.formCustom.expireStartTime=e
        },
        endExport(e){
            this.formCustom.expireEndTime=e
        },
        operation(){
           this.$router.push("/operation/car") 
        },
        middleStatus(){
            var _this=this
            console.log(this.selectCar);
            // vm.$emit("eventName",this.selectCar) 
            _this.$webapi.save('middleControlNo',JSON.stringify(this.selectCar))         
            _this.$router.push("/middle/status")
        }
    },
    // beforeDestroy () {
    //     vm.$off('eventName')
    // },
  }
</script>
