<template>
    <div class="">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>APP管理</BreadcrumbItem>
                    <BreadcrumbItem to="/apk/start/list">APP启动页列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>APP启动页添加</h2>
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
                                    <FormItem label="启动图片名字" prop="remark">
                                        <Input v-model="adddatas.remark" placeholder="请输入启动图片名字" onkeydown="if(event.keyCode==32) return false"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="启动图片地址" prop="startPhoto">
                                        <Input v-model="adddatas.startPhoto" placeholder="启动图片地址" onkeydown="if(event.keyCode==32) return false" disabled></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem label="上传图片" prop="photo">
                                        <div v-if="show">
                                            <upload-photo @exportData="exportData"></upload-photo>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="16">
                                    <FormItem class="text-center">
                                        <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
                                        <Button type="default" @click="handleCancel" size="large">返回</Button>
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
    import uploadPhoto from "@/components/pub/uploadPhoto.vue"
    export default {
        components: {
            uploadPhoto
        },
        data () {
            return {
                show:false,
                adddatas:{
                    remark:'',
                    startPhoto:'',
                    photo:''
                },
                ruleValidate: {
                    remark:[{
                        required: true,
                        message: '图片名字没有填写',
                        trigger: 'blur'
                    },{ 
                        type: 'string',
                        min:2,
                        max: 11, 
                        message: '输入2-11字符',
                        trigger: 'blur'
                    }],
                    // startPhoto:[{
                    //     required: true,
                    //     message: '图片地址没有填写',
                    //     trigger: 'blur'
                    // },{ 
                    //     type: 'string',
                    //     min:2,
                    //     max: 80, 
                    //     message: '输入2-80字符',
                    //     trigger: 'blur'
                    // }],
                    photo:[
                        {
                            required: true,
                            message: '请上传图片',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        mounted(){
            this.show=true;
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
            handleCancel(){
                this.$router.back(-1);
            },
            post () {
                let _this = this;
                var data={
                    "remark":this.adddatas.remark,
                    "startPhoto": this.adddatas.startPhoto
                }
                this.$api.post("/appStartPage/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success("添加成功!")
                        _this.$router.back(-1);
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportData(e){
                this.adddatas.photo=e[0];
                this.adddatas.startPhoto=e[0];
            }
        }
    }
</script>
<style scoped>
    .ml15{
        margin-left: 15px;
    }
</style>