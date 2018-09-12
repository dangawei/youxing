<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/home">首页</BreadcrumbItem>
			<BreadcrumbItem>故障管理</BreadcrumbItem>
			<BreadcrumbItem to="/fault/list">故障类型列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>故障类型列表</h2>
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
				    </div>
				</Col>
			</Row>
		</div>
        <add-fault-type :importShow="importShow" @exportData="exportData" v-if="importShow"></add-fault-type>
       <edit-fault-type :importEditShow="importEditShow" :importEditData="importEditData" @exportData="exportEditData" v-if="importEditShow"></edit-fault-type>
    </div>
  </div>
</template>
<script>
    import addFaultType from "./addFaultType"
    import editFaultType from "./editFaultType"
export default {
    components:{
        addFaultType,
        editFaultType
    },
    data () {
        return {
            importShow:false,
            importEditShow:false,
            importEditData:{},
            formCustom:{
              trueName:"",
              mobile:"",
              username:"",
              status:""
            },
            columnsdata: [
                {
                    title: '编号',
                    key: 'id',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.id)
                        ])
                    }
                },
            	{
                    title: '故障类型',
                    key: 'faultTypeName',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.faultTypeName)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:220,
                    render: (h, params) => {
                        return h('div',[
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
                                        this.importEditShow=true;
                                        this.importEditData=params.row
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
    		this.$api.post("/fault/type/all",null,result=>{
    			if (result.code==0) {
    				_this.data=result.data                    
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
    	add(){
    		this.importShow=true;
    	},
    	exportData(e){
    		this.importShow=e.show;
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
				content: '<p>确认要删除【'+params.faultTypeName+'】吗?</p>',
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
			this.$api.post("/fault/type/delete", data, reset => {
			 	if (reset.code === 0) {
			    	_this.$Message.success("删除成功!")
			    	_this.list();
			 	}else {
			   		_this.$netcode.getApiCode(reset)
				}
			})
		},
        exportEditData(e){
            this.importEditShow=e.show
        }
    }
  }
</script>
