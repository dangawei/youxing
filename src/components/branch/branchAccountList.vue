<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/home">首页</BreadcrumbItem>
			<BreadcrumbItem>分公司账号管理</BreadcrumbItem>
			<BreadcrumbItem to="/branchAccount/list">分公司账号列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>分公司账号列表</h2>
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
			  <Button type="primary"  @click="add()">添加分公司账号</Button>
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
        <!-- <add-admin :addshow="addshow" @addShowComponent="ashow" v-if="addshow"></add-admin>
        <edit-admin :editshow="editshow" :editData="editData" @editShowComponent="eshow" v-if="editshow"></edit-admin> -->
    </div>
  </div>
</template>
<script>
    // import AddAdmin from "./addAdmin"
    // import EditAdmin from "./editAdmin"
    import paging from "./../pub/page"
export default {
    components:{
        // AddAdmin,
        paging,
        // EditAdmin
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
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
                    title: '所属分公司',
                    key: 'branchName',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.branchName)
                        ])
                    }
                },
                {
                    title: '账号',
                    key: 'account',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.account)
                        ])
                    }
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    render: (h, params) => {
                        var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:220,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                    	this.remove(params.row);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data: []
        }
    },
    mounted() {
      	// this.list()
    },
    methods:{
    	list(){
    		let _this=this;
    		let req={
				branchName: ""
    		}
    		this.$api.get("/branch/branch_page",req,result=>{
    			if (result.code==1001) {
    				_this.data=result.data
                    _this.pageData.pageCount = result.data.page.totalPage
                    _this.pageData.pagesize = result.data.page.pageSize
                    _this.pageData.pageCurrent = result.data.page.currentPage
                    _this.pageData.totalCount = result.data.page.totalCount                    
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
    	add(){
    		this.addshow=true;
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
            // this.list()
        },
    }
  }
</script>
