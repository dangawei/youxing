<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>添加APP版本</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">
                    <FormItem label="APP类型:" prop="appTypeId">
                        <get-app-type @exportData="exportData"></get-app-type>
                    </FormItem>
                    <FormItem label="上传APP文件:" prop="apkUrl">
                        <Upload 
                            ref="upload"
                            :action="commonurl" 
                            :on-success="onsuccess"
                            :on-error="error" 
                            :accept="accept" 
                            :headers="header" 
                            name="file"                             
                            :format="format"                            
                            :on-format-error="handleFormatError"> 
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="width:228px;">导入apk文件</Button>
                        </Upload>
                        <div>
                          <span>{{formValidate.apkUrl}}</span>
                        </div>
                    </FormItem>
                    <FormItem label="APP版本号:" prop="version">
                        <Input v-model="formValidate.version" placeholder="APP版本号格式如: 1.1.2"></Input>
                    </FormItem>
                    <FormItem label="是否强制更新:" prop="forceUpdate">
                        <Select v-model="formValidate.forceUpdate" clearable>
                            <Option value="1">不强制</Option>
                            <Option value="2">强制</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="版本描述:" prop="versionDescribe">
                        <Input v-model="formValidate.versionDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="版本描述格式:1.XXX#2.XXX#3.XXX" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">添加</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
             </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import getAppType from "@/components/pub/getAppType"
    let vers=(rule,value,callback)=>{
        let reg=/^\d{1,2}(\.\d{1,2}){2,3}$/
        if (!reg.test(value)) {
            callback(new Error("版本格式书写错误!"))
        }
    }
    export default {
        props:['importShow'],
        components:{
           getAppType 
        },
        data () {
            return {
                ashow:false,
                commonurl: this.$api.root+"/file/upload",
                accept:"appliction/json",
                header: {
                    
                 },
                format:['apk'],
                formValidate: {
                    appTypeId:"",
                    version:'',
                    apkUrl:'',
                    forceUpdate:'',
                    versionDescribe:''
                },
                ruleValidate: {
                    appTypeId:[
                        { required: true, message: '请选择APP类型'},
                    ],
                    forceUpdate:[
                        { required: true, message: '请选择是否强制更新'},
                    ],
                    version: [
                        { required: true, message: '请输入APP版本号', trigger: 'blur' },
                        // { validator: vers,message:'版本格式书写错误' trigger: "blur" }
                        { pattern: /^\d{1,2}(\.\d{1,2}){2,3}$/,message:'版本格式书写错误', trigger: "blur" }
                    ],
                    versionDescribe: [
                        { required: true, message: '请输入APP版本号', trigger: 'blur' }
                    ],
                    apkUrl:[
                        {required:true, message: '请上传apk文件',trigger: 'blur'}
                    ]
                }
            }
        },
        watch:{
            // "formValidate.version":(e)=>{
            //     console.log(e);
            // }
        },
        created(){
            this.header.token = this.$webapi.get("token");
        },
        mounted() {
            this.ashow = this.importShow
        },
        methods: {             
            cancel () {
               this.remove()
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.ashow = false
                      _this.$emit('exportData',{show:false})
                    },
                    onCancel: () => {
                       _this.ashow = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    }
                })
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {

                let _this = this;
                var data = {
                    "apkUrl": this.formValidate.apkUrl,
                    "appTypeId": this.formValidate.appTypeId,
                    "version": this.formValidate.version,
                    "forceUpdate":this.formValidate.forceUpdate,
                    "versionDescribe":this.formValidate.versionDescribe
                }
                this.$api.post("/appVersion/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$emit('exportData',{show:false})
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportData(e){
                this.formValidate.appTypeId=e
            },
            onsuccess(response, file, fileList) {
                if (response.code==0) {
                    this.$Message.success("上传成功!")
                    this.$refs.upload.clearFiles()
                    this.formValidate.apkUrl=response.data.img
                }else{
                    this.$Message.error("上传失败!")
                    this.$netcode.getApiCode(response)
                }
            },
            handleFormatError(file, fileList){
                this.$Message.error({
                    content:"文件上传格式错误,请选择apk的文件!",
                    duration:2
                })
            },
            error(error, file, fileList){
                this.$Message.error("上传失败!")
            }
        }
    }
</script>
