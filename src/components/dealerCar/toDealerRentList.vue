<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>车辆管理</BreadcrumbItem>
			<BreadcrumbItem to="/car/list">车辆列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>经销商租用即将到期列表</h2>
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
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
			    <!-- <Button type="primary" @click="returnCars">批量还车</Button> -->
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
        paging,
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            editData:{},
            formCustom:{
                vehicleNo:''
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
                    title: '开始租用时间',
                    key: 'rentTime',
                    render: (h, params) => {
                        return h('div', [
                            h('span',params.row.rentTime)
                        ])
                    }
                },
                {
                    title: '到期时间',
                    key: 'returnTime',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.returnTime)
                        ])
                    }
                },
                {
                    title: '真实还车时间',
                    key: 'trueReturnTime',
                    render: (h, params) => {
                        var str = params.row.trueReturnTime;
                        if (str==null) {
                            str="未还"
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     render: (h, params)=> {
                //         return h('div',[
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     // size: 'small'
                //                 },
                //                 style: {
                //                     marginRight: '5px',
                //                     color:'#fff'
                //                 },
                //                 on: {
                //                     click: () => {
                //                        this.returnCarShow=true; 
                //                     }
                //                 }
                //             }, '还车')
                //         ]);
                //     }
                // }
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
                "pageNum":_this.pageData.pageCurrent,
                "pageSize":_this.pageData.pagesize,
                "type": 1,
                "vehicleNo":_this.formCustom.vehicleNo
    		}
    		this.$api.post("/vehicle/rent/immediately/expire",data,result=>{
    			if (result.code==0) {
    				_this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageshow = true                    
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
        returnCar(){
            let _this=this;
            let data={
                "id": 11,
                "trueReturnTime": "2017-01-11 00:00:00",
                "type": 2,
                "vehicleNo": "bike123001"
            }
            this.$api.post("/vehicle/rent/update",data,result=>{
                if (result.code==0) {
                    _this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount                    
                }else{
                    _this.$netcode.getApiCode(result)
                }
            }) 
        },
        returnCars(){

        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
    }
  }
</script>
