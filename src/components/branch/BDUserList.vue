<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/home">首页</BreadcrumbItem>
			<BreadcrumbItem>分公司管理</BreadcrumbItem>
			<BreadcrumbItem to="/branch/list">分公司列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>{{this.$route.query.dealerName}}--骑手列表</h2>
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
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div style="text-align: center;">
                        <Button type="primary"  @click="back()">返回</Button>
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
            addshow:false,
            editshow:false,
            pageshow:true,
            customerId:"",
            editData:{},
            formCustom:{
              trueName:"",
              mobile:"",
              username:"",
              status:""
            },
            // 分页
           pageData:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:10,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
            columnsdata: [
                {
                    title: '编号',
                    key: 'customerId',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.customerId)
                        ])
                    }
                },
            	{
                    title: '用户账号',
                    key: 'loginName',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.loginName)
                        ])
                    }
                },
                {
                    title: '真实姓名',
                    key: 'customerName',
                    render:(h,params)=>{
                        var info=params.row.customerInfo
                        var str=''
                        if (info==null) {
                            str=''
                        }else{
                            str=params.row.customerInfo.customerName
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    }
                },
                {
                    title: '电话',
                    key: 'mobilePhone',
                    render:(h,params)=>{
                        var info=params.row.customerInfo
                        var str=''
                        if (info==null) {
                            str=''
                        }else{
                            str=params.row.customerInfo.mobilePhone
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    }
                },
                {
                    title: '状态',
                    key: 'userStatus',
                    render:(h,params)=>{
                        let str=''
                        if (params.row.userStats==1) {
                            str="标记"
                        }else if (params.row.userStats==2) {
                            str="启用"
                        }else{
                            str="注销"
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    }
                },
                
                {
                    title: '注册时间',
                    key: 'registerTime',
                    render: (h, params) => {
                        // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', params.row.customerInfo.registerTime)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:220,
                    render: (h, params) => {
                        var str="inline-block"
                        if (params.row.customerBusiness==null || params.row.customerBusiness=='') {
                            str="inline-block"
                        }else{
                            str="none"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        if (params.row.customerBusiness==null) {
                                            var carId=""
                                        }else{
                                            var carId=params.row.customerBusiness.vehicleId
                                        }
                                        this.$router.push({
                                            path:"/branch/user/detail/"+params.row.customerId+"/"+params.row.customerInfo.customerInfoId,
                                            query:{
                                                loginName:params.row.loginName,
                                                customerName:params.row.customerInfo.customerName,
                                                carNo:carId
                                            }
                                        })
                                    }
                                }
                            }, "信息详情"),
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
    		let req={
                "companyId":this.$route.params.dealerId,
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize,
			}
    		this.$api.post("/customer/page",req,result=>{
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
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        back(){
            this.$router.back(-1);
        }
    }
  }
</script>
