<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>维修管理</BreadcrumbItem>
                    <BreadcrumbItem to="/maintenance/list">维修站点列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>维修站点添加</h2>
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
                <Row>
                   <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="120">
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="维修站点名称" prop="siteName">
                                        <Input v-model="adddatas.siteName" placeholder="请填写维修站点名称" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="联系人姓名" prop="name">
                                        <Input v-model="adddatas.name" placeholder="请填写联系人姓名" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="联系人电话" prop="phone">
                                        <Input v-model="adddatas.phone" placeholder="请填写联系人电话" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="维修站点地址" prop="address">
                                        <Input v-model="adddatas.address" placeholder="请填写维修站点地址" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem label="经纬度:">
                                <div>
                                    <span class="ml15">经度:{{adddatas.longitude}}</span>
                                    <span class="ml15">纬度:{{adddatas.latitude}}</span>
                                </div>
                            </FormItem>
                            <FormItem>
                                <div v-if="mapShow">
                                    <map-component @exportData="lngLat"></map-component>
                                </div>
                            </FormItem>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem class="text-center">
                                        <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
                                        <Button type="primary" @click="handleCancel" size="large">返回</Button>
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
                adddatas:{
                    address:'',
                    latitude:'',
                    longitude:'',
                    phone:'',
                    siteName:'',
                    name:''
                },
                ruleValidate: {
                    name:[{
                        required: true,
                        message: '姓名没填写',
                        trigger: 'blur'
                    },{ 
                        type: 'string',
                        min:2,
                        max: 11, 
                        message: '输入2-11字符',
                        trigger: 'blur'
                    }],
                    phone:[{
                        required: true,
                        message: '电话没填写',
                        trigger: 'blur'
                    }],
                    address:[{
                        required: true,
                        message: '站点地址没有填写',
                        trigger: 'blur'
                    },{ 
                        type: 'string',
                        min:2,
                        max: 45, 
                        message: '输入2-45字符',
                        trigger: 'blur'
                    }],
                    siteName:[{
                        required: true,
                        message: '站点名称没有填写',
                        trigger: 'blur'
                    },{ 
                        type: 'string',
                        min:2,
                        max: 20, 
                        message: '输入2-20字符',
                        trigger: 'blur'
                    }],
                }
            }
        },
        mounted(){
            this.mapShow=true;
        },
        methods: {
            handleSave(name){
                let _this = this
                this.$refs[name].validate((valid) => {
                    if(valid){
                        _this.post();
                    }else{
                        _this.$Message.error('请输入正确信息!')
                    }
                })
            },
            lngLat(e){
                this.adddatas.longitude=e.lng;
                this.adddatas.latitude=e.lat;
                this.adddatas.address=e.address
            },
            handleCancel(){
                this.$router.back(-1);
            },
            post () {
                let _this = this;
                var data={
                    address:this.adddatas.address,
                    latitude: this.adddatas.latitude,
                    longitude:this.adddatas.longitude,
                    siteName:this.adddatas.siteName,
                    name:this.adddatas.name,
                    phone:this.adddatas.phone
                }
                this.$api.post("/repairSite/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success("添加成功!")
                        _this.$router.back(-1);
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .ml15{
        margin-left: 15px;
    }
</style>