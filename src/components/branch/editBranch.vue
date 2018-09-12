<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem>分公司管理</BreadcrumbItem>
                <BreadcrumbItem to="/branch/list">分公司列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>编辑分公司信息</h2>
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
                  
                </div>
                <Row v-if="show">
                   <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="分公司名称:" prop="name">
                                        <Input v-model="formValidate.name" placeholder="请输入分公司名称"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="地址:" prop="address">
                                        <div class="">
                                           <Input v-model="formValidate.address" placeholder="请输入地址"></Input>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="电话:" prop="telephone">
                                        <Input v-model="formValidate.telephone" placeholder="请输入电话"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem label="经纬度:">
                                <div>
                                    <span class="ml15">经度:{{formValidate.longitude}}</span>
                                    <span class="ml15">纬度:{{formValidate.latitude}}</span>
                                </div>
                            </FormItem>
                            <FormItem>
                                <div v-if="mapShow">
                                    <map-component :importData="lngArray" @exportData="lngLat"></map-component>
                                </div>
                            </FormItem>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem style="text-align:center;">
                                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >修改</Button>
                                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>

                    </Col>
                </Row>

            </div>
        </div>
        
    </div>
</template>
<script>
    import mapComponent from "@/components/pub/map.vue"
    export default {
        components: {
            mapComponent
        },
        data () {
            return {
                mapShow:false,
                show:false,
                lngArray:{},
                formValidate: {
                    bool:false,
                    address:'',
                    name:'',
                    telephone:"",
                    latitude:'',
                    longitude:'',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        { 
                            type: 'string',
                            min:2,
                            max: 11, 
                            message: '输入2-11字符',
                            trigger: 'blur'
                        }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur'},
                        { 
                            type: 'string',
                            min:2,
                            max: 45, 
                            message: '输入2-45字符',
                            trigger: 'blur'
                        }
                    ],
                    telephone: [
                        { required: true, message: '请输入电话号', trigger: 'blur' },
                        // { pattern: /^([1][3,4,5,6,7,8][0-9]{9})$|^((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})$/,message:'请输入11位手机号或者固定电话', trigger: "blur" },
                        { pattern: /^([1][3,4,5,6,7,8][0-9]{9})$/,message:'请输入正确的手机号格式', trigger: "blur" }
                    ]
                },
            }
        },
        mounted(){
            this.getBranchInfo();
        },
        methods: {
            getBranchInfo () {
                let _this = this
                let datas={
                    name: this.$route.query.name,
                    pageNum: 1,
                    pageSize: 1,
                    parentId: this.$webapi.get("companyId"),
                }
                this.$api.post("/company/page", datas, reset => {
                    if (reset.code === 0) {
                        // _this.$Message.success("!");
                        _this.formValidate=reset.data.data[0]
                        _this.lngArray.latitude=_this.formValidate.latitude
                        _this.lngArray.longitude=_this.formValidate.longitude
                        _this.lngArray.address=_this.formValidate.address
                        _this.show=true;
                        _this.mapShow=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    }else{
                        this.$Message.error('内容填写有误!')
                    }
                })
            },
            lngLat(e){
                this.formValidate.longitude=e.lng;
                this.formValidate.latitude=e.lat;
                this.formValidate.address=e.address;
            },
            post () {
                let _this = this;
                // var url = "?token=" + this.$webapi.get('token')
                var data = {
                    id:this.formValidate.id,
                    address:this.formValidate.address,
                    name:this.formValidate.name,
                    telephone:this.formValidate.telephone,
                    parentId: this.$webapi.get("companyId"),
                    latitude: this.formValidate.latitude,
                    longitude:this.formValidate.longitude,
                }
                this.$api.post("/company/update", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('修改成功');
                        _this.$router.back(-1)
                    }else {
                       _this.$netcode.getApiCode(reset)
                    }
                })
            },
            handleReset(){
                this.$router.back(-1);
            }
        }
    }
</script>
<style scoped>
    .ml15{
        margin-left: 15px;
    }
</style>