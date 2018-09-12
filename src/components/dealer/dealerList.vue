<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/home">首页</BreadcrumbItem>
			<BreadcrumbItem>经销商管理</BreadcrumbItem>
			<BreadcrumbItem to="/dealer/list">经销商列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>经销商列表</h2>
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
        <add-dealer-account :addshow="addshow" :dealerId="dealerId" @addShowComponent="ashow" v-if="addshow"></add-dealer-account>
        <add-dealer :addshow="addDealerShow" @addBranchShow="addBranchShows" v-if="addDealerShow"></add-dealer>
        <!-- <edit-admin :editshow="editshow" :editData="editData" @editShowComponent="eshow" v-if="editshow"></edit-admin> -->
    </div>
  </div>
</template>
<script>
    import AddDealerAccount from "./addDealerAccount"
    import AddDealer from "./addDealer"
    // import EditAdmin from "./editAdmin"
    import paging from "./../pub/page"
export default {
    components:{
        AddDealerAccount,
        AddDealer,
        paging,
        // EditAdmin
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            addDealerShow:false,
            // 经销商id
            dealerId:'',
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
                    title: '经销商名字',
                    key: 'name',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.name)
                        ])
                    }
                },
                {
                    title: '地址',
                    key: 'address',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.address)
                        ])
                    }
                },
                {
                    title: '电话',
                    key: 'telephone',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.telephone)
                        ])
                    }
                },
                {
                    title: '拥有车辆数(辆)',
                    key: 'vehicleCount',
                    render:(h,params)=>{
                    	return h('div',[
                    		h("span",params.row.vehicleCount)
                    	])
                    }
                },
                {
                    title: '创建时间',
                    key: 'createAt',
                    render: (h, params) => {
                        // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', params.row.createAt)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:280,
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
                                        this.dealerId=params.row.id
                                        this.addshow=true;
                                    }
                                }
                            }, '分配账号'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:"/dealer/allocationCar/"+this.$webapi.get("companyId")+"/"+params.row.id,
                                            query:{
                                                dealerName:params.row.name
                                            }
                                        })
                                    }
                                }
                            }, '分配车辆'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:"/dealer/allocationed/list/"+params.row.id,
                                            query:{
                                                dealerName:params.row.name
                                            }
                                        })
                                    }
                                }
                            }, '拥有车辆'),
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small',
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.$router.push({
                            //                 path:"/dealer/allocationed/list/"+params.row.id,
                            //                 query:{
                            //                     dealerName:params.row.name
                            //                 }
                            //             })
                            //         }
                            //     }
                            // }, '查看骑手'),
                            // h('Button', {
                            //     props: {
                            //         type: 'error',
                            //         size: 'small',
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //         	this.remove(params.row);
                            //         }
                            //     }
                            // }, '注销'),
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
				"endTime": null,
                "name": null,
                "startTime": null,
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize,
			}
    		this.$api.post("/company/child/page",req,result=>{
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
    	add(){
    		// this.addDealerShow=true;
            this.$router.push('/dealer/add')
    	},
        addBranchShows(e){
            this.addDealerShow=e.ashow
            this.list();
        },
        ashow(e){
            this.addshow=e.ashow;
            this.list();
        },
    	edit(e){
    		this.editshow=true;
            this.editData=e;
            this.list();
    	},
        eshow(e){
            this.editshow=e.eshow;
            this.list();
        },
    	remove (params) {
			let _this = this
			this.$Modal.confirm({
				title: '提示',
				content: '<p>确认【'+params.username+'】要删除吗?</p>',
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
			this.$api.post("/adminLogin/delete", data, reset => {
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
    }
  }
</script>
