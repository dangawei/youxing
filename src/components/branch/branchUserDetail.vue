<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>分公司管理</BreadcrumbItem>
                <BreadcrumbItem to="/branch/list">分公司列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>{{this.$route.query.customerName}}--信息详情</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate">
            <div class="page-divider page-divider-horizontal "></div>
            <div class="pagelist">
                <div class="pagelist-hd">基本信息</div>
                <div class="pagelist-bd">
                    <Row>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="真实名字:" label-position="left" prop="customerName">
                                    <p>{{customerInfo.customerName}}</p>
                                </FormItem>
                            </div>
                        </Col>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="性别:" label-position="left" prop="gender">
                                    <p>{{customerInfo.gender}}</p>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="身份证号码:" label-position="left" prop="customerName">
                                    <p>{{customerInfo.identityCardNo}}</p>
                                </FormItem>
                            </div>
                        </Col>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="电话号码:" label-position="left" prop="mobilePhone">
                                    <p>{{customerInfo.mobilePhone}}</p>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="状态:" label-position="left" prop="status">
                                    <p>{{customerInfo.status}}</p>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </div>
                <!-- <div style="text-align:left;">
                    <Button type="primary"  @click="edit()" v-if="show">修改基本信息</Button>
                </div> -->
            </div>
            <div class="page-divider page-divider-horizontal "></div>
            <div class="pagelist">
                <div class="pagelist-hd">车辆信息</div>
                <div class="pagelist-bd">
                    <Row>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="车辆编号:" label-position="left" prop="vehicleId" v-if="carNoShow">
                                    <p>{{carNo ? carNo:"暂无分配"}}</p>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </div>
                <!-- <div style="text-align:left;">
                    <Button type="primary"  @click="addCar()" v-if="btnShow">配置车辆</Button>
                </div> -->
            </div>
            <div class="page-divider page-divider-horizontal "></div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div style="text-align: center;">
                        <Button type="primary"  @click="back()">返回</Button>
                    </div>
                </Col>
            </Row>
        </Form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'index',
    components: {

    },
  data () {
    return {
      pageshow:false,
      formItem: {},
      detailData:[],
      selCarShow:false,
      customerId:"",
      infoData:{},
      infoShow:false,
      btnShow:false,
      show:true,
      ruleValidate: {

      },
      customerInfo:{},
      // 分页数据
      pageData:{
        totalCount:1,
        pageCurrent:1,
        pagesize:10,
      },
      // 监听采购单状态
      carNoShow:false,
      carNo:''
    }
  },

    created() {
        //do something after creating vue instance
        this.carNo=this.$route.query.carNo
        if (this.$route.query.carNo) {
            this.btnShow=false;
        }else{
            this.btnShow=true;
        }
    },
  mounted(){
    this.list()
    this.getCar()
    this.carNoShow=true;
  },
  methods: {
    // 取消
    cancel(){
      this.nopassmodel=false;
      this.opinion='';
    },
    list () {
        var listdata = {
            "id":this.$route.params.infoId
        }
        var _this =  this
        this.$api.post('/customer/info/get',listdata,reset => {
            if (reset.code === 0) {
                _this.customerInfo=reset.data;
                if (_this.customerInfo.gender==1) {
                  _this.customerInfo.gender="男"
                }
                if (_this.customerInfo.gender==2) {
                  _this.customerInfo.gender="女"
                }
                if (_this.customerInfo.gender==null) {
                    _this.customerInfo.gender=""
                }
                if (_this.$route.query.status==3) {
                    _this.customerInfo.status="注销"
                    _this.btnShow=false
                    _this.show=false
                }else if (_this.$route.query.status==2) {
                    _this.customerInfo.status="正常"
                }else{
                    _this.customerInfo.status="标记"
                }
            } else {
                _this.$netcode.getApiCode(reset)
            }
        })

    },
    getCar(){
        if (this.carNo) {
            var listdata = {
                "vehicleId":this.carNo
            }
            var _this =  this
            this.$api.post('/vehicle/detail',listdata,reset => {
                if (reset.code === 0) {
                    this.carNo=reset.data.vehicleNo
                    this.carNoShow=true;
                    this.btnShow=false;
                } else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        }
        
    },
    addCar(){
        this.carNoShow=false;
        this.customerId=this.$route.params.id
        this.selCarShow=true;
    },
    editSelShow(e){
        this.carNo=e.data;
        this.carNoShow=true;
        this.getCar();
        this.selCarShow=false;
    },
    back(){
        this.$router.back(-1);
    },
    edit(){
        this.infoShow=true;
        this.infoData=this.customerInfo
    },
    editInfoShow(e){
        this.infoShow=e;
        this.list();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
