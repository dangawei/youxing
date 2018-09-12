<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称:" prop="menuName">
            <Input v-model="formValidate.menuName" placeholder="请输入名称" ref="focusBool"></Input>
        </FormItem>
        <FormItem label="页面路径:" prop="path">
            <Input v-model="formValidate.path" placeholder="请输入页面路径"></Input>
        </FormItem>
        <FormItem label="接口地址:" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入接口地址"></Input>
        </FormItem>
        <FormItem label="菜单所属范围:" prop="menuScope">
            <Select v-model="formValidate.menuScope">
                <Option :value="1" key="1">侧边栏</Option>
                <Option :value="2" key="2">功能键</Option>
            </Select>
        </FormItem>
        <!-- <FormItem label="排序字段:" prop="resourcesOrder">
            <Select v-model="formValidate.menuStatus">
                <Option :value="1" key="1">1</Option>
                <Option :value="2" key="2">2</Option>
                <Option :value="3" key="3">3</Option>
            </Select>
        </FormItem> -->
        <FormItem>
           <Button type="ghost" @click="handleReset('formValidate')" size="large">取消</Button>
           <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
       </FormItem>

    </Form>
</template>
<script>
    import {vm} from '@/js/vm.js'
    export default {
        props:['addid'],
        data () {
            return {
                focusBool:'',
                formValidate: {
                    bool:false,
                    menuName:'',
                    path:'',
                    url:'',
                    icon:'',
                    sortValue:'',
                    menuStatus:'',
                    parentId:'',
                    menuScope:''
                },
                ruleValidate: {
                    menuName: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 14, min:2,message: '请填写2-14个字符', trigger: 'blur'}
                    ],

                }
            }
        },
        created() {
            
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // vm.$emit("addmodal",this.formValidate.bool);
                        this.post(name)
                    } else {
                        this.$Message.error('内容填写有误!')
                        // this.focusBool=true;
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                vm.$emit("addmodal",this.formValidate.bool)
                this.$refs[name].resetFields();
            },
            post (name) {
                let _this = this;
                var data = {
                    "icon": this.formValidate.icon,
                    "menuName": this.formValidate.menuName,
                    "menuStatus":this.addid.menuStatus,
                    "parentId": this.addid.addid,
                    "path": this.formValidate.path,
                    "sortValue": this.addid.menuStatus,
                    "url": this.formValidate.url,
                    "menuScope":this.formValidate.menuScope
                }
                this.$api.post('/menu/add',data, reset => {
                    if (reset.code === 0) {
                        _this.$Message.success('添加成功');
                        _this.$refs[name].resetFields();
                        if (this.addid.menuStatus==1) {
                            vm.$emit("addmodal",this.formValidate.bool);
                        }else{
                            vm.$emit("showtwo",{
                                "addmodal":this.formValidate.bool,
                                "show":true,
                                "menuStatus":this.addid.menuStatus,
                                "id":this.addid.addid
                            });
                        }

                    }else {
                        // _this.focusBool=true;
                        _this.$refs.focusBool.focus();
                        _this.$netcode.getApiCode(reset)

                    }
                })
            },
            changesel(val){
                if (val=="显示") {
                    this.formValidate.isShow=1
                }else{
                    this.formValidate.isShow=-1
                }
            }
        }
    }
</script>
