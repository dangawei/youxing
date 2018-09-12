<template>
  <div class="rule">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>APP管理</BreadcrumbItem>
            <BreadcrumbItem to="/app/version/list">APP版本列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>APP版本列表</h2>
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
        <add-app-version :importShow="importShow" @exportData="exportData" v-if="importShow"></add-app-version>
    </div>
  </div>
</template>
<script>
    import addAppVersion from "./addAppVersion"
export default {
    components:{
        addAppVersion
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
                    title: '类型名称',
                    key: 'appTypeName'
                },
                {
                    title: '下载地址',
                    key: 'apkUrl',
                    render:(h,params)=>{
                        return h("a",{
                            attrs: {
                                href: params.row.apkUrl
                            },
                        },params.row.apkUrl)
                    }
                },
                {
                    title: '版本',
                    key: 'version'
                },
                {
                    title: '创建时间',
                    key: 'createAt'
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
                                    type: 'error',
                                    size: 'small',
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
        this.list()
    },
    methods:{
        list(){
            let _this=this;
            var data={
                "appTypeId":null,
                "status":1
            }
            this.$api.post("/appVersion/list",data,result=>{
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
        remove (params) {
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+params.version+'】版本吗?</p>',
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
            this.$api.post("/appVersion/delete", data, reset => {
                if (reset.code === 0) {
                    _this.$Message.success("删除成功!")
                    _this.list();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        }
    }
  }
</script>
