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
                    <h2>维修站点修改</h2>
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
                            <Col :xs="24" :sm="24" :md="16" :lg="16">
                            <FormItem label="维修站点名字" prop="siteName">
                                <Input v-model="adddatas.siteName" placeholder="请填写维修站点名字" onkeydown="if(event.keyCode==32) return false"></Input>
                            </FormItem>
                            </Col>
                            </Row>
                            <Row>
                            <Col :xs="24" :sm="24" :md="16" :lg="16">
                            <FormItem label="维修站点地址" prop="address">
                                <Input v-model="adddatas.address" placeholder="请填写维修站点地址" onkeydown="if(event.keyCode==32) return false"></Input>
                            </FormItem>
                            </Col>
                            </Row>
                            <Row>
                            <Col :xs="24" :sm="24" :md="16" :lg="16">
                            <FormItem label="状态" prop="status">
                                <Select v-model="adddatas.status">
                                    <Option :value="1">启用</Option>
                                    <Option :value="-1">注销</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            </Row>
                            <FormItem label="经纬度:" required>
                                <div>
                                    <span class="ml15">经度:{{adddatas.longitude}}</span>
                                    <span class="ml15">纬度:{{adddatas.latitude}}</span>
                                </div>
                            </FormItem>
                            <FormItem>
                                <div>
                                    <map-component :importData="adddatas" @exportData="lngLat"></map-component>
                                </div>
                            </FormItem>
                            <FormItem class="text-center">
                                <Button type="primary" @click="handleSave('adddatas')" size="large">保存</Button>
                                <Button type="primary" @click="handleCancel" size="large">返回</Button>
                            </FormItem>
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
                    id:'',
                    address:'',
                    latitude:'',
                    longitude:'',
                    siteNo:'',
                    siteName:''
                },
                ruleValidate: {
                    siteNo:[{
                        required: true,
                        message: '站点编号没有填写',
                        trigger: 'blur'
                    },{ 
                        type: 'string',
                        min:2,
                        max: 11, 
                        message: '输入2-11字符',
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
                        message: '站点地址没有填写',
                        trigger: 'change'
                    },{ 
                        type: 'string',
                        min:2,
                        max: 11, 
                        message: '输入2-11字符',
                        trigger: 'blur'
                    }],
                }
            }
        },
        mounted(){
            this.adddatas.id=this.$route.params.id
            this.list(); 
        },
        methods: {
            list(){
                let _this = this;
                var data={
                     "id": this.$route.params.id
                }
                this.$api.post("/repairSite/getOne", data, reset => {
                    if (reset.code === 0) {
                        _this.adddatas=reset.data
                        _this.mapShow=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                }) 
            },
            handleSave(name){
                let _this = this
                this.$refs[name].validate((valid) => {
                    if(valid){
                        _this.post();
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
                    "id":this.adddatas.id,
                    "address":this.adddatas.address,
                    "latitude": this.adddatas.latitude,
                    "longitude":this.adddatas.longitude,
                    "siteNo":this.adddatas.siteNo,
                    "siteName":this.adddatas.siteName,
                    "status":this.adddatas.status
                }
                this.$api.post("/repairSite/update", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success("修改成功!")
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