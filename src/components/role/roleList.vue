<template>
    <div id="department">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >角色管理</BreadcrumbItem>
              <BreadcrumbItem>角色列表</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>角色列表</h2>
              </div>
          </div>
        </div>

        <div class="page-component-view">
         <div class="page-component-bd">
           <!--查询条件-->
           <div class="tableListForm">
             <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                 <Row>
                     <!-- <Col :xs="24" :sm="24" :md="12" :lg="6">
                         <FormItem label="角色名称" >
                             <Input type="text" v-model="formCustom.name"></Input>
                         </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <div class="">
                         <FormItem style="margin-left: -70px;text-align:left">
                             <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                         </FormItem>
                       </div>
                     </Col> -->
                 </Row>
             </Form>
           </div>
            <!--操作按钮-->
           <div class="tableListOperator">
             <Row>
                 <Col :xs="24" :sm="24" :md="24" :lg="24">
                     <div>
                         <Button type="primary" @click="addrole()"> <Icon type="android-add"></Icon> 添加</Button>
                     </div>
                 </Col>
             </Row>
           </div>
           <Row>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <i-table border  :columns="columns7" :data="data" class="table"></i-table>
               </Col>
           </Row>
           <Row justify="center">
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
               </Col>
           </Row>
           <role-component-add @rolecomponentdata="rolecomponentdata" :addroleshow="addroleshow" v-if="addroleshow"></role-component-add>
           <role-component-edit @editrolecomponentdata="editrolecomponentdata" :editroleshow="editroleshow" :editroledta="editroledta" v-if="editroleshow"></role-component-edit>
        </div>
        </div>
    </div>
</template>
<script>
  import Pages from '@/components/pub/page.vue'
  import roleComponentEdit from './editrole.vue'
  import roleComponentAdd from './addrole.vue'
  export default {
    components:{
        roleComponentEdit,
        roleComponentAdd,
        Paging:Pages
    },
    data () {
        return {
            pageshow:false,
            addroleshow:false,
            editroleshow:false,
            editroledta:{},
            self:this,
            formCustom: {
                number: '',
                name: '',
                des:'',
            },
            ruleCustom: {
                number: [
                    {trigger: 'blur' }
                ],
                name: [
                    {trigger: 'blur' }
                ]
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
            modals:{
                modalBool: false,
                successText:""
            },
            columns7: [
                {
                    title: '角色编号',
                    key: 'id',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.id)
                        ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '角色名称',
                    key: 'roleName',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.roleName)
                        ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    render: (h, params) => {
                        // let str=this.$webapi.gettime('date',(params.row.createAt)/1000)
                        return h('div', [
                            h('span', params.row.createdAt)
                        ]);
                    },
                    className:'ivu-table-column-center'
                }, 
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params)=> {
                        var str=false
                        var color="#fff"
                        if (params.row.roleName=="admin") {
                          str=true
                          color="#ccc"
                        }
                        return h('div',[
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled:str
                                },
                                style: {
                                    marginRight: '5px',
                                    color:color
                                },
                                on: {
                                    click: () => {
                                        this.editrole(params)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    // disabled:str
                                },
                                style: {
                                    marginRight: '5px',
                                    // color:color
                                },
                                on: {
                                    click: () => {
                                       this.$router.push({path:"/role/resource/"+params.row.id})
                                    }
                                }
                            }, '权限'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                    disabled:str
                                },
                                style: {
                                    marginRight: '5px',
                                    color:color
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)
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
    mounted () {
      //do something after creating vue instance
      this.list()
    },
    methods: {
        addrole () {
          this.addroleshow = true
        },
        editrole (e) {
            this.editroledta = e.row
            this.editroleshow = true
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()           
        },
        rolecomponentdata (e) {
            this.addroleshow = e.addroleshow
            this.list()
        },
        editrolecomponentdata (e) {
            this.editroleshow = e.editroleshow
            this.list()
        },
        list () {
          let _this = this
          let data = {
            pageNum:_this.pageData.pageCurrent,
            pageSize:_this.pageData.pagesize,
            roleName:_this.formCustom.roleName
          }
          this.$api.post('/role/page',data,reset => {
              if (reset.code === 0) {
                let data = reset.data;
                _this.data = data.data;
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
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+item.roleName+'】吗?</p>',
                onOk: () => {
                   this.del(item)
                },
                onCancel: () => {

                }
            });
        },
        del (item){
          let _this = this;
          var data = {
              id:item.id
          }
          this.$api.post("/role/delete", data, reset => {
            if (reset.code === 0) {
                this.$Message.success("删除成功!")
                this.list()
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
        },
        handleSubmit (name) {
           this.pageshow = false
           this.list()
        },
        handleReset (name) {
            this.$refs[name].resetFields()
            this.list()
        }
    }
  }
</script>
<style scoped>
   .base-info{
        font-size: 18px;
        text-align: left;
        padding-top: 15px;
        margin-bottom: 26px;
        padding-left: 30px;
        padding-bottom: 15px;
        background-color: #fff;
   }
   .base-color{
        color: #8c8c8c;
   }
    h3{
        font-size: 26px;
        text-align: left;
    }
    .dep-updata{
        text-align: left;
        padding-left: 30px;
        margin-bottom: 15px;
    }
</style>
