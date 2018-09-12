<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/home">首页</BreadcrumbItem>
			<BreadcrumbItem>用户管理</BreadcrumbItem>
			<BreadcrumbItem to="/user/list">用户列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>用户列表</h2>
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
                            <FormItem label="账号:" prop="loginName">
                                <Input type="text" v-model="formCustom.loginName"></Input>
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
						<div class="mt20">
							<paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
						</div>
				    </div>
				</Col>
			</Row>
		</div>
        <add-dealer-account :addshow="addShow" @addShowComponent="ashow" v-if="addShow"></add-dealer-account>
        <user-sel-car :importShow="selCarShow" :importData="customerId" @exportShow="editSelShow" v-if="selCarShow"></user-sel-car>
    </div>
  </div>
</template>
<script>
    import AddDealerAccount from "./addUser"
    import userSelCar from "./userSelCar"
    import paging from "./../pub/page"
export default {
    components:{
        AddDealerAccount,
        paging,
        userSelCar
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            addShow:false,
            selCarShow:false,
            customerId:"",
            editData:{},
            formCustom:{
                loginName:''
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
                // {
                //     title: '租车时间',
                //     key: 'modifiedTime',
                //     render:(h,params)=>{
                //         var info=params.row.customerInfo
                //         var str=''
                //         if (info==null) {
                //             str=''
                //         }else{
                //             str=params.row.customerInfo.mobilePhone
                //         }
                //         return h('div',[
                //             h("span",str)
                //         ])
                //     }
                // },
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
                // {
                //     title: '创建时间',
                //     key: 'registerTime',
                //     render: (h, params) => {
                //         // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                //         return h('div', [
                //             h('span', params.row.registerTime)
                //         ])
                //     }
                // },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:220,
                    render: (h, params) => {
                        var str="inline-block"
                        var restart="none"
                        var logout="inline-block"
                        if (params.row.userStats==-1) {
                            restart="inline-block"
                            logout="none"
                            str="none"
                        }else if (params.row.customerBusiness==null || params.row.customerBusiness=='') {
                            str="inline-block"
                        }else if (params.row.customerBusiness.status==-1) {
                            str="inline-block"
                        }else{
                            str="none"
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type:'primary',
                                    size:'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                        this.customerId=params.row.customerId;
                                        this.selCarShow=true;
                                    }
                                }
                            }, '分配车辆'),
                            
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:logout
                                },
                                on: {
                                    click: () => {
                                        if (params.row.customerBusiness==null) {
                                            var carId=""
                                        }else{
                                            var carId=params.row.customerBusiness.vehicleId
                                        }
                                        this.$router.push({
                                            path:"/user/detail/"+params.row.customerId+"/"+params.row.customerInfo.customerInfoId,
                                            query:{
                                                loginName:params.row.loginName,
                                                customerName:params.row.customerInfo.customerName,
                                                status:params.row.userStats,
                                                carNo:carId
                                            }
                                        })
                                    }
                                }
                            }, "信息详情"),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:logout
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
                                    size: 'small',
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
                "companyId":this.$webapi.get("companyId"),
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize,
                "loginName":this.formCustom.loginName
			}
    		this.$api.post("/customer/page",req,result=>{
    			if (result.code==0) {
    				_this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageData.pageCurrent = result.data.currentPage
                    _this.pageshow=true;
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
    	add(){
    		this.addShow=true;
    	},
        ashow(e){
            this.addShow=e.ashow;
            this.list();
        },
    	remove (params) {
            let _this = this
            if (!params.customerBusiness) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要注销【'+params.loginName+'】吗?</p>',
                    onOk: () => {
                        _this.itemdel(params)
                    },
                    onCancel: () => {

                    }
                });
            }else{
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>有车辆未还,请先还车再注销!点击确定前往还车!</p>',
                    onOk: () => {
                        _this.$router.push({
                            path:"/user/return/"+params.customerId,
                            query:{
                                loginName:params.loginName,
                                vehicleId:params.customerBusiness.vehicleId,
                                customerName:params.customerInfo.customerName
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            }
      	},
		itemdel (params) {
			let _this = this
			var data={
			  	id:params.customerId
			}
			this.$api.post("/customer/delete", data, reset => {
			 	if (reset.code === 0) {
			    	_this.$Message.success("注销成功!")
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
        editSelShow(e){
            this.selCarShow=e.show;
            this.list();
        },
        restart(params){
            let _this=this;
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要启用【'+params.loginName+'】吗?</p>',
                onOk: () => {
                    _this.restartInfo(params)
                },
                onCancel: () => {

                }
            });
        },
        restartInfo(params){
            let _this = this
            var data={
                id:params.customerId
            }
            this.$api.post("/customer/enable", data, reset => {
                if (reset.code === 0) {
                    _this.$Message.success("启用成功!")
                    _this.list();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            }) 
        },
        handleSubmit(){
            this.list()
        }
    }
  }
</script>
