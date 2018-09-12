<template>

<div id="resource" style="width:100%">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>基础信息</BreadcrumbItem>
                <BreadcrumbItem>资源列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>资源列表</h2>
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
                            <FormItem label="资源名字" prop="menuName">
                                <Input type="text" v-model="formCustom.menuName"></Input>
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
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div>
                            <Button type="primary" @click="addlist()">
                                <Icon type="ios-plus-empty"></Icon>添加</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div>
                        <i-table border :content="self" :columns="columns7" :data="objArr"></i-table>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <paging :pageData="pageData" @pageComponentDate="pageComponentDates" v-if="pageshow"></paging>
               </Col>
           </Row>
        </div>
        <resource-edit @editresourcecomponentdata="editresourcecomponentdata" :editresourceshow="editresourceshow" :editresourcedata="editresourcedata" v-if="editresourceshow"></resource-edit>
        <!-- <resource-edit></resource-edit> -->
    </div>
</div>

</template>

<script>
import paging from '@/components/pub/page.vue'
import resourceEdit from './editresource.vue'
export default {
    components:{
        paging,
        resourceEdit
    },
    data() {
            return {
                pageshow: false,
                addmodal: false,
                typename: 'department',
                self: this,
                editresourcedata: {},
                editresourceshow: false,
                formCustom: {
                    menuName:''
                },
                ruleCustom: {
                    departmentNo: [{
                        trigger: 'blur'
                    }],
                    name: [{
                        trigger: 'blur'
                    }]
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
                modals: {
                    modalBool: false,
                    successText: ""
                },
                objArr: [],
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '名称',
                        key: 'menuName',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.menuName)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '页面地址',
                        key: 'path',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.path)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '父类ID',
                        key: 'parentId',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.parentId)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '接口地址',
                        key: 'url',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.url)
                            ]);
                        },
                        className: 'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleRender(params.row)
                                        }
                                    }
                                }, '修改'),
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
                                }, '删除')
                            ]);
                        }
                    }
                ],
                
            }
        },
        mounted() {
            // this.$api.get('http://localhost:8080/static/json/data.json')
            // var num=0;
            this.list();
        },
        created() {
            
        },
        methods: {
            handleRender(val) {
                this.editresourcedata = val;
                this.editresourceshow = true;
            },
            pageComponentDates(e) {
                // var d=JSON.parse(JSON.stringify(e));
                // console.log(d);
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editresourcecomponentdata(e) {
                this.editresourceshow = e.editresourceshow;
                if (e.start!=null) {
                    this.list(e.start.parentId,e.start.menuStatus);
                }
                
            },
            list() {
                let _this = this
                let data = {
                    pageNum: this.pageData.pageCurrent,
                    pageSize:this.pageData.pagesize
                }
                if(this.formCustom.menuName){
                    data.menuName=this.formCustom.menuName
                }
                this.$api.post('/menu/page', data, reset => {
                    if (reset.code === 0) {
                        let data = reset.data
                        _this.objArr = data.data
                        _this.pageData.pageCount = data.totalPage
                        _this.pageData.pagesize = data.pageSize
                        _this.pageData.totalCount = data.totalCount
                        _this.pageData.pageCurrent = data.currentPage
                        _this.pageshow =  true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove(e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要删除【' + e.menuName + '】吗?</p>',
                    onOk: () => {
                        let _this = this;                             
                        var data = {
                            id:e.id
                        }
                        this.$api.post("/menu/delete", data, reset => {
                            if (reset.code === 0) {
                                _this.list();
                                _this.$Message.info('删除成功');
                                _this.pageshow = true;
                            } else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })


                    },
                    onCancel: () => {

                    }
                });

            },
            addlist() {
                this.$router.push("/resource/add");
            },
            handleSubmit (name) {
                this.pageshow = false
                this.pageData.pageCurrent = 1
                this.list()
            },
        }
}

</script>
<style scoped>

.res-name {
    padding: 10px 16px;
}

.res-name span {
    float: left;
    line-height: 32px;
    font-size: 20px;
}

ul {
    margin: 0;
    padding: 0px;
}

li {
    text-align: left;
    padding-left: 16px;
}

.res-title-name {
    padding-top: 6px;
    padding-bottom: 0px;
    position: relative;
    z-index: 1;
    transition: all .2s ease-in-out;
}

.res-title-div {
    font-size: 18px;
}

.res-title-div p {
    text-align: center;
}

.res-title-name-div {
    font-size: 16px;
}

.res-title-name-ul {
    margin: 0;
    outline: 0;
    list-style: none;
    color: #495060;
    font-size: 14px;
    position: relative;
    z-index: 900;
}

.icon {
    display: inline-block;
}

.icon-div {
    text-align: center;
}

.icon-div span {
    float: left;
}

.icon span {
    margin-left: 10px;
}

.menu {
    border-right: 1px solid #ccc;
}

</style>
