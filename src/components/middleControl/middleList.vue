<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>中控管理</BreadcrumbItem>
			<BreadcrumbItem to="/car/list">中控列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>中控列表</h2>
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
                            <FormItem label="中控编号" prop="vehicleNo">
                                <Input type="text" v-model="formCustom.middleControlNo"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="是否绑定车辆" prop="isBindingVehicle">
                                <Select v-model="formCustom.isBindingVehicle" clearable>
                                    <Option value="">全部</Option>
                                    <Option :value="1">是</Option>
                                    <Option :value="-1">否</Option>
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
                            <Button type="ghost" icon="ios-cloud-upload-outline">导入中控excel文件</Button>
                        </Upload>
                        <div>
                            <span>{{fileName}}</span>
                        </div>
                    </Col>
                    <Col :xs="8" :sm="8" :md="8" :lg="8">
                        <div style="text-align:right;">
                            <Button type="primary" @click="add">添加单个中控信息</Button>
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
    <!-- <add-middle v-if="importShow" :importShow="importShow" @exportShow="exportShow"></add-middle>
    <edit-middle v-if="importEditShow" :importEditShow="importEditShow" :importEditData="importEditData" @exportEditData="exportEditData"></edit-middle> -->
    <connect-middle v-if="importConnectShow" :importConnectShow="importConnectShow" :importConnectData="importConnectData" @exportEditData="exportConnectData"></connect-middle>
  </div>
</template>
<script>
    import paging from "@/components/pub/page"  
    // import addMiddle from "./addMiddle"  
    // import editMiddle from "./editMiddle"  
    import connectMiddle from "./connectMiddle"  
export default {
    components:{
        paging,
        // editMiddle,
        // addMiddle,
        connectMiddle
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            importShow:false,
            importEditShow:false,
            importEditData:'',
            importConnectShow:false,
            importConnectData:'',
            commonurl: this.$api.root+"/middle/import",
            editData:{},
            format:['xls','xlsx'],
            fileName:'',
            formCustom:{
                middleControlNo:'',
                isBindingVehicle:''
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
                {
                    title: '中控编号',
                    key: 'middleControlNo'
                },
                {
                    title: '蓝牙名称',
                    key: 'blueToothName'
                },
                {
                    title: 'sim卡号',
                    key: 'simNo'
                },
                {
                    title: '是否绑定车辆',
                    key: 'isBindingVehicle',
                    render:(h,params)=>{
                        let str=""
                        if (params.row.isBindingVehicle==-1) {
                            str="没绑定"
                        }else if (params.row.isBindingVehicle==1) {
                            str="已绑定"
                        }else{
                            str="数据异常"
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '是否在线',
                    key: 'isOnLine',
                    render:(h,params)=>{
                        let str=""
                        if (params.row.isOnLine==-1) {
                            str="没在线"
                        }else if (params.row.isOnLine==1) {
                            str="在线"
                        }else{
                            str="数据异常"
                        }
                        return h('div',[
                            h('span',str)
                        ])
                    }
                },
                {
                    title: '版本号',
                    key: 'middleVersion'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        var str="绑定车辆"
                        var isDisabled=false
                        // if (params.row.flag) {
                        //     show="none"
                        // }
                        if (params.row.isBindingVehicle==1) {
                            str="已经绑定"
                            isDisabled=true
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled:isDisabled
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.importConnectData=params.row
                                        this.importConnectShow=true;
                                    }
                                }
                            }, str),
                            // h('Button', {
                            //     props: {
                            //         type: 'error',
                            //         size: 'small',
                            //     },
                            //     style: {
                            //         marginRight: '5px',
                            //         display:show
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.remove(params.row);
                            //         }
                            //     }
                            // }, '删除')
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
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
    		}
            if (this.formCustom.middleControlNo) {
                data.middleControlNo=this.formCustom.middleControlNo
            }
            if (this.formCustom.isBindingVehicle) {
                data.isBindingVehicle=this.formCustom.isBindingVehicle
            }
    		this.$api.post("/middleControl/info/page",data,result=>{
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
			  	id:params.id
			}
			this.$api.post("/middle/delete", data, reset => {
			 	if (reset.code === 0) {
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
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        exportEditData(e){
            this.importEditShow=e.show
            this.list()
        },
        exportConnectData(e){
            this.importConnectShow=e.show
            this.list()
        }
    }
  }
</script>
