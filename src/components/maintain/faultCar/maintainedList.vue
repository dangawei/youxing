<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>维修管理</BreadcrumbItem>
          <BreadcrumbItem>已修复车辆列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>已修复车辆列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
      <div class="page-component-bd">
        <!--查询条件-->
        <div class="tableListForm">
          <Form :model="formCustom" :label-width="100">
            <!-- <Row>
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
            </Row> -->
          </Form>
        </div>
        <!--操作按钮-->
        <div class="tableListOperator">

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
  </div>
</template>
<script>
  import Pages from '@/components/pub/page.vue'
  export default {
    components: {
        Paging:Pages,
    },
    data () {
        return {
            pageshow:false,
            formCustom:{
              name:"",
              phone:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:15,
            },
            columnsdata: [
                {
                    title: '维修人员编号',
                    key: 'workerNo'
                },
                {
                    title: '维修车辆编号',
                    key: 'vehicleNo'
                },
                {
                    title: '故障类型',
                    key: 'faultRecordVO',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.faultRecordVO.faultTypeName)
                        ])
                    }
                },
                {
                    title: '维修人员',
                    key: 'workerNo',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.workerNo)
                        ])
                    }
                },
                {
                    title: '修复时间',
                    key: 'endTime',
                    render: (h, params) => {
                        var str=params.row.endTime.split(" ")[0];
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
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
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize,
                "repairResult":1,
                "id":parseInt(this.$webapi.get("companyId")),
            }
            var _this =  this
            this.$api.post('/repairRecord/page',listdata,reset => {
                if (reset.code === 0) {
                    _this.data=reset.data.data
                    _this.pageData.pageCount = reset.data.totalPage
                    _this.pageData.pagesize = reset.data.pageSize
                    _this.pageData.totalCount = reset.data.totalCount
                    _this.pageData.pageCurrent = reset.data.currentPage
                    _this.pageshow=true
                } else {
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
