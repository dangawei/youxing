<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>售后管理</BreadcrumbItem>
          <BreadcrumbItem>维护人员列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>维护人员列表</h2>
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
                <FormItem label="维护人员名称" prop="name">
                  <Input type="text" v-model="formCustom.name"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <FormItem label="手机号" prop="phone">
                  <Input type="text" v-model="formCustom.phone"></Input>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                <div class="">
                  <FormItem style="margin-left: -70px;text-align:left">
                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                  </FormItem>
                </div>
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
                    
               </div>
           </Col>
        </Row>
        <Row justify="center">
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
          </Col>
        </Row>
      </div>
    </div>
      <add-maintainer-component v-if="addshow" :addshow="addshow" @addshow="addshows"></add-maintainer-component>
      <edit-maintainer-component v-if="editshow" :editshow="editshow" :editdata="editdata" @editshow="editshows"></edit-maintainer-component>

  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import AddMaintainerComponent from './addmaintainercomponent.vue'
  import EditMaintainerComponent from './editmaintainercomponent.vue'
  // import citycommon from "../pub/citycommon.vue"
  export default {
    components: {
        Paging:Pages,
        AddMaintainerComponent,
        EditMaintainerComponent
        // citycommon
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            editdata:'',
            pageshow:false,
            formCustom:{
              name:"",
              phone:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                  title: '性别',
                  key: 'sex',
                  render: (h, params) => {
                    var str = ""
                    if(params.row.sex == 1){
                      str = "男"
                    }else {
                      str = "女"
                    }
                    return h('div', [
                      h('span', str)
                    ])
                  }
                },
                {
                    title: '身份编号',
                    key: 'idCard'
                },
                {
                    title: '手机',
                    key: 'mobileNo'
                },
                {
                  title: '创建人',
                  key: 'creatorName',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.creatorName)
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
                    title: '修改人',
                    key: 'updatorName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.updatorName)
                    ])
                 }
                },
                {
                    title: '修改时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:300,
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
                                      this.revamp(params.row);
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
            data: []
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      list () {
        var listdata = {
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
          name:this.formCustom.name,
          mobileNo:this.formCustom.phone
        }
        var _this =  this
        this.$api.get('/dealer-maintainer/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data=reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          } else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      add () {
        this.addshow=true;
      },
      addshows(e){
        console.log(e);
        this.addshow=e
        this.list();
      },
      revamp(e){
        this.editdata=e;
        this.editshow=true;
      },
      editshows(e){
        this.editshow=e
        this.list();
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.name+'】要删除吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (params) {
       let _this = this
       // var url = "/dealer-maintainer/delete?token=" + this.$webapi.get('token') + " &id=" + params.id
       var data={
          token:this.$webapi.get('token'),
          id:params.id
        }
       this.$api.post("/dealer-maintainer/delete", data, reset => {
         if (reset.codeId === 1) {
            _this.$Message.success("删除成功!")
            _this.list();
         }else {
           _this.$netcode.getApiCode(reset)
        }
       })
      },
      handleSubmit (name) {
        this.pageshow = false
        this.pageData.pageCurrent = 1
        this.list()
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
    }
    
  }
</script>
