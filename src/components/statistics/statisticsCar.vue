<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/home">首页</BreadcrumbItem>
			<BreadcrumbItem>统计管理</BreadcrumbItem>
			<BreadcrumbItem to="/statistics/car">车辆统计列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>车辆统计列表</h2>
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
                            <FormItem label="车辆分配状态" prop="status">
                                <Select v-model="formCustom.status">
                                    <Option value="" :key="">全部</Option>
                                    <Option :value="1" :key="1">未分配</Option>
                                    <Option :value="2" :key="2">已分配</Option>
                                </Select>
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
                <div style="text-align:left;">
                    <Button type="primary" @click="exportExcel">导出excel文件</Button>
                </div>
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
  </div>
</template>
<script>
    import paging from "./../pub/page"
export default {
    components:{
        paging
    },
    data () {
        return {
            pageshow:true,
            formCustom:{
                vehicleNo:'',
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
            columnsdata: [
                {
                    title: '车辆编号',
                    key: 'vehicleNo',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.vehicleNo)
                        ])
                    }
                },
            	{
                    title: '中控编号',
                    key: 'middleControlNo',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.vehicleInfo.middleControlNo)
                        ])
                    }
                },
                {
                    title: '行驶里程(km)',
                    key: 'mileage',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.mileage)
                        ])
                    }
                },
                {
                    title: '行驶次数',
                    key: 'tripCount',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.tripCount)
                        ])
                    }
                },
                {
                    title: '修理次数',
                    key: 'repairCount',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.repairCount)
                        ])
                    }
                },
                {
                    title: '状态',
                    key: 'state',
                    render:(h,params)=>{
                        let str='使用中'
                        if (params.row.vehicleInfo.state==2) {
                            str="故障中"
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    }
                }
            ],
            data: []
        }
    },
    created(){
        this.list()
    },
    mounted() {
      	
    },
    methods:{
    	list(){
    		let _this=this;
    		let data={
                companyId:Number.parseInt(this.$webapi.get("companyId")),
                pageNum: this.pageData.pageCurrent,
                pageSize: this.pageData.pagesize
			}
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.status) {
                data.status=this.formCustom.status
            }
    		this.$api.post("/statistics/vehicle/page",data,result=>{
    			if (result.code==0) {
    				_this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageData.pageCurrent = result.data.currentPage
                    _this.pageshow=true;
    			}else if (result.code==9) {
                    _this.data=[]
                    _this.pageshow=true;
                }else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        exportExcel(){
            let _this=this;
            let data={
                companyId:Number.parseInt(this.$webapi.get("companyId"))
            }
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.status) {
                data.status=this.formCustom.status
            }
            this.$api.get("/excelExport/vehicle/list",data,result=>{
                // console.log(result)
                if (result) {
                    if (result.code) {
                        if(result.code == undefined || result.code==null){
                            _this.$Message.error(result.message)
                        }else{
                           _this.$netcode.getApiCode(result) 
                        }
                    }else {
                        window.location.href=this.$webapi.http_url(this.$api.root+"/excelExport/vehicle/list",data)
                    }
                }else{
                    _this.$Message.error("请求错误!")
                }
            })
        }
    }
  }
</script>
