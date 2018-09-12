<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>维修管理</BreadcrumbItem>
              <BreadcrumbItem to="/maintainer/list">维修人员列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>维修人员{{formItem.name}}详情</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-view allm20">
          <div class="page-view-body">
          <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
            <div class="pagelist">
                <div class="pagelist-hd">基本信息</div>
                <div class="pagelist-bd">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="姓名:" prop="name">
                                <p>{{formItem.name}}</p>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="工号:" prop="workerNo">
                                <p>{{formItem.workerNo}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="手机号:" prop="phone">
                                <p>{{formItem.phone}}</p>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="身份证号:" prop="idCard">
                                <p>{{formItem.idCard}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="登录账号:" prop="loginName">
                                <p>{{formItem.loginName||"未分配"}}</p>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="创建时间:" prop="createAt">
                                <p>{{formItem.createAt}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
            </div>
             <div class="pagelist" v-if="Show">
                <div class="pagelist-hd">所属维修站点信息</div>
                <div class="pagelist-bd">
                  <Row>
                    <Col :xs="24" :sm="24" :md="8" :lg="8">
                       <div class="">
                            <FormItem label="站点编号:" label-position="left">
                                <p>{{formItem.repairSite==null?"":formItem.repairSite.siteNo}}</p>
                            </FormItem>
                       </div>
                    </Col>
                    <Col :xs="24" :sm="24" :md="8" :lg="8">
                       <div class="">
                            <FormItem label="站点名称:" label-position="left" prop="siteName">
                                <p>{{formItem.repairSite==null?"":formItem.repairSite.siteName}}</p>
                            </FormItem>
                       </div>
                    </Col>
                  </Row>
                  <Row>
                     <Col :xs="24" :sm="24" :md="8" :lg="8">
                       <div class="">
                            <FormItem label="站点地址:" label-position="left" prop="address">
                                <p>{{formItem.repairSite==null?"":formItem.repairSite.address}}</p>
                            </FormItem>
                       </div>
                    </Col>
                  </Row>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
                <div class="pagelist" v-if="Show">
                  <div class="pagelist-hd">维修记录信息</div>
                  <div class="pagelist-bd">
                        <div class="">
                            <i-table border :columns="columnsdata" :data="formItem.repairRecords"></i-table>
                            <div class="mt20">
                            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                            </div>
                        </div>
                  </div>
                </div>
                </div>
                <div style="text-align:center;margin-bottom:15px;">
                    <Button type="default"  @click="back()">返回</Button>
                </div>
            </Form>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import Pages from '@/components/pub/page.vue'
export default {
  name: 'index',
  components: {
    Paging:Pages,
  },
    created() {
    },
    data () {
        return {
            Show:false,
            pageshow:false,
            formItem: {},
            detailData:[],
            ruleValidate: {

            },
            // 分页数据
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
                    title: '维修结果',
                    key: 'repairResult',
                    render: (h, params) => {
                        let str=""
                        switch (params.row.repairResult){
                            case 1:
                                str="已修复"
                                break;
                            case 2:
                                str="维修中"
                                break;
                            case 3:
                                str="未修好"
                                break;
                            case 4:
                                str="已报废"
                                break;
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
            ],
        }
    },
    mounted(){
        this.status=this.$route.query.status
        this.list()
    },
    methods: {
        list () {
            let _this = this
            let datas={
                "id": this.$route.params.id
            }
            this.$api.post("/repairWorker/getOne", datas, reset => {
                if (reset.code === 0) {
                    // _this.$Message.success("!");
                    _this.formItem=reset.data
                    _this.Show=true
                    _this.pageshow=true;
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
        back(){
            this.$router.back(-1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
