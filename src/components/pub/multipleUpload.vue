<template>
<div>
    <div class="demo-upload-list" v-for="(item,index) in items">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :headers="header"
        :on-success="handleSuccess"
        :format="['jpg', 'jpeg', 'png','gif']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        multiple
        type="drag"
        :action="commonurl"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
    </Upload>
    <!-- <Modal title="View Image" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal> -->
</div>
</template>
<script>
    export default {
        props:['importData'],
        data () {
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                items: [],
                header: {
                    // 'Content-Type': 'multipart/form-data'
                },
                commonurl: this.$api.root+"/file/upload",
            }
        },
        created(){
            this.header.token = this.$webapi.get("token");
        },
        methods: {
            // handleView (name) {
            //     this.imgName = name;
            //     this.visible = true;
            // },
            // handleRemove (file) {
            //     const fileList = this.$refs.upload.fileList;
            //     this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            // },
            // handleSuccess (res, file) {
            //     file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            //     file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            // },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.items.splice(fileList.indexOf(file), 1);
                this.$emit('exportData',this.items)
            },
            //     this.items.splice(index,1)
            //     this.$emit('exportData',this.items)
            // },
            handleSuccess (response, file, fileList) {
                if (response.code==0) {
                    this.$Message.success("上传成功!")
                    this.items=[];
                    file.url = response.data.img;
                    // this.items.push(response.data.img)
                    this.items=fileList
                    this.$emit('exportData',this.items)
                    // this.formValidate.apkUrl=response.data.img
                }else{
                    this.$netcode.getApiCode(response)
                }
            },
            handleFormatError (file) {
                this.$Message.error("上传格式错误,请选择'jpg', 'jpeg', 'png','gif'格式!")
            },
            handleMaxSize (file) {
                this.$Message.error("上传的大小不能超过2M!")
            },
            // handleBeforeUpload () {
            //     const check = this.items.length < 5;
            //     if (!check) {
            //         this.$Notice.warning({
            //             title: 'Up to five pictures can be uploaded.'
            //         });
            //     }
            //     return check;
            // }
        },
        mounted () {
            this.items = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
