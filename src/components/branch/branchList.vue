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
			 	<h2>分公司列表</h2>
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
                            <FormItem label="公司名称:" prop="name">
                                <Input type="text" v-model="formCustom.name"></Input>
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
        <add-branch-account :addshow="addshow" :branchId="branchId" :branchName="branchName" @addShowComponent="ashow" v-if="addshow"></add-branch-account>
    </div>
  </div>
</template>
<script>
    import AddBranchAccount from "./addBranchAccount"
    import paging from "./../pub/page"
export default {
    components:{
        AddBranchAccount,
        paging,
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            addBranchShow:false,
            editData:{},
            formCustom:{
                name:''
            },
            // 分公司id
            branchId:'',
            branchName:'',
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
                //     title: '编号',
                //     key: 'id',
                //     render:(h,params)=>{
                //         return h('div',[
                //             h("span",params.row.id)
                //         ])
                //     }
                // },
            	{
                    title: '分公司名称',
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
                    title: '经度',
                    key: 'latitude'
                },
                {
                    title: '纬度',
                    key: 'longitude'
                },
                {
                    title: '创建时间',
                    key: 'createAt',
                    render: (h, params) => {
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
                    	// var str="inline-block"
                        return h('div',[
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
                                        this.branchId=params.row.id
                                        this.addshow=true;
                                        this.branchName=params.row.name
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
                                    		path:"/branch/allocationCar/"+params.row.id,
                                    		query:{
                                    			branchName:params.row.name
                                    		}
                                    	})
                                    }
                                }
                            }, '分配车辆'),
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small',
                            //     },
                            //     style: {
                            //         marginRight: '5px',
                            //         display:str
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.$router.push({
                            //                 path:"/branch/dealer/list/"+params.row.id,
                            //                 query:{
                            //                     branchName:params.row.name
                            //                 }
                            //             })
                            //         }
                            //     }
                            // }, '查看经销商'),
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small',
                            //     },
                            //     style: {
                            //         marginRight: '5px',
                            //         display:str
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.$router.push({
                            //                 path:"/branch/allocationed/list/"+params.row.id,
                            //                 query:{
                            //                     branchName:params.row.name
                            //                 }
                            //             })
                            //         }
                            //     }
                            // }, '拥有车辆'),
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
                                            path:"/branch/detail/"+params.row.id,
                                            query:{
                                                branchName:params.row.name
                                            }
                                        })
                                    }
                                }
                            }, '详情'),
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
                                            path:"/branch/edit/"+params.row.id,
                                            query:{
                                                name:params.row.name
                                            }
                                        })
                                    }
                                }
                            }, '修改'),
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
				endTime: null,
                name: null,
                startTime: null,
				pageNum: this.pageData.pageCurrent,
                pageSize: this.pageData.pagesize,
			}
            if(this.formCustom.name){
                req.name=this.formCustom.name
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
    		// this.addBranchShow=true;
            this.$router.push("/add/branch")
    	},
        addBranchShows(e){
            this.addBranchShow=e.ashow
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

			  	token:this.$webapi.get('token'),
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
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
    }
  }
</script>
