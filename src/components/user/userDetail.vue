<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>用户管理</BreadcrumbItem>
                <BreadcrumbItem to="/user/list">用户列表</BreadcrumbItem>
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
                                <FormItem label="登录账号:" label-position="left" prop="loginName">
                                    <p>{{this.$route.query.loginName}}</p>
                                </FormItem>
                            </div>
                        </Col>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="真实名字:" label-position="left" prop="customerName">
                                    <p>{{customerInfo.customerName}}</p>
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
                                <FormItem label="性别:" label-position="left" prop="gender">
                                    <p>{{customerInfo.gender}}</p>
                                </FormItem>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="电话号码:" label-position="left" prop="mobilePhone">
                                    <p>{{customerInfo.mobilePhone}}</p>
                                </FormItem>
                            </div>
                        </Col>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="状态:" label-position="left" prop="status">
                                    <p>{{customerInfo.status}}</p>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style="text-align:left;">
                    <Button type="primary"  @click="edit()" v-if="show">修改基本信息</Button>
                    <Button type="primary"  @click="updataPassword()" v-if="show">修改密码</Button>
                </div>
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
                <div style="text-align:left;">
                    <Button type="primary"  @click="addCar()" v-if="btnShow">配置车辆</Button>
                </div>
            </div>
            <div class="page-divider page-divider-horizontal "></div>
            <div class="pagelist">
                <div class="pagelist-hd">车辆预租车时间</div>
                <div class="pagelist-bd">
                    <Row v-if="timeShow">
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="预租车时间:" prop="rentTime">
                                    <start-date :importDate="rentTime" @exportDate="startDate"></start-date>
                                </FormItem>
                            </div>
                        </Col>
                        <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <div class="">
                                <FormItem label="预还车时间:" prop="returnTime">
                                    <end-date :importDate="returnTime" @exportDate="endDate"></end-date>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style="text-align:left;">
                    <Button type="primary"  @click="updateTime()">确定修改</Button>
                </div>
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
        <user-sel-car :importShow="selCarShow" :importData="customerId" @exportShow="editSelShow" v-if="selCarShow"></user-sel-car>
        <edit-user-info :exportShow="infoShow" :exportData="infoData" @importShow="editInfoShow" v-if="infoShow"></edit-user-info>
        <reset-password :importPasswordShow="importPasswordShow" :importPasswordData="importPasswordData" @exportPasswordShow="exportPasswordShow" v-if="importPasswordShow"></reset-password>
    </div>
</div>
</template>

<script>
import userSelCar from "./userSelCar"
import editUserInfo from "./editUserInfo"
import resetPassword from "./resetPassword"
import startDate from "@/components/pub/startDate"
import endDate from "@/components/pub/endDate"
export default {
  name: 'index',
  components: {
    // Upload
    userSelCar,
    editUserInfo,
    startDate,
    endDate,
    resetPassword
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
        importPasswordShow:false,
        importPasswordData:{},
        ruleValidate: {

        },
        rentTime:'',
        returnTime:'',
        timeShow:false,
        timeId:'',
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
    this.getTime();
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
    getTime(){
        const data={
            "id":this.$route.params.id
        }
        this.$api.post('/customer/rent/get/by_customer',data,reset => {
            if (reset.code === 0) {
                this.rentTime=reset.data.rentTime
                this.returnTime=reset.data.returnTime
                this.timeId=reset.data.id
                this.timeShow=true
            } else {
                _this.$netcode.getApiCode(reset)
            }
        })
    },
    updateTime(){
        const data={
            id:this.timeId,
            rentTime: this.rentTime+" 00:00:00",
            returnTime: this.returnTime+" 00:00:00"
        }
        this.$api.post('/customer/rent/update',data,reset => {
            if (reset.code === 0) {
                this.$Message.success("修改成功");
                this.getTime();
            } else {
                _this.$netcode.getApiCode(reset)
            }
        })
    },
    updataPassword(){
        this.importPasswordShow=true;
        this.importPasswordData=this.$route.query.loginName;
    },
    // 修改密码
    exportPasswordShow(e){   
        this.importPasswordShow=e.show;   
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
    },
    startDate(e){
        this.rentTime=e
    },
    endDate(e){
        this.returnTime=e
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
