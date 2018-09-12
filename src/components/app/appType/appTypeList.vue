<template>
  <div class="rule">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>APP管理</BreadcrumbItem>
            <BreadcrumbItem to="/app/type/list">APP类型列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>APP类型列表</h2>
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
        <add-app-type :importShow="importShow" @exportData="exportData" v-if="importShow"></add-app-type>
    </div>
  </div>
</template>
<script>
    import addAppType from "./addAppType"
export default {
    components:{
        addAppType
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
            title:"类型名称",
            columnsdata: [
                {
                    title: '类型名称',
                    key: 'appTypeName'
                },
                {
                    title: '状态',
                    key: 'status',
                    render:(h,params)=>{
                        var str="有效"
                        if (params.row.status==-1) {
                            str="无效"
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    },
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     width:220,
                //     render: (h, params) => {
                //         return h('div',[
                //             h('Button', {
                //                 props: {
                //                     type: 'error',
                //                     size: 'small',
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.remove(params.row);
                //                     }
                //                 }
                //             }, '删除'),
                //         ]);
                //     }
                // }
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
            this.$api.post("/appType/list",null,result=>{
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
                content: '<p>确认【'+params.appTypeName+'】要删除吗?</p>',
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
        }
    }
  }
</script>
