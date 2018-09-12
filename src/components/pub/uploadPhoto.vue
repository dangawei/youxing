<template>
    <div class="" style="text-align:left">
        <div class="demo-upload-list" v-for="(item,index) in items" v-if="items.length>0">
            <img :src="item">
            <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
        </div>
        <div class="">
            <Upload
            :action="commonurl"
            :headers="header"
            :format="format"
            :on-format-error="formatError"
            :show-upload-list ="false"
            :Accept="Accept"
            :on-error="error"
            name="file"
            :on-success="onsuccess"
            style="text-align:left" v-if="items.length<=0">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
        </div>
    </div>
</template>

<script>
export default {
    props:['importData'],
    data() {
        return {
            uploadnum:0,
            modelstyle:1,
            items:[],
            commonurl: this.$api.root+"/file/upload",
            header: {
                // 'Content-Type': 'multipart/form-data'
            },
            format: ['jpg', 'jpeg', 'png','gif'],
            Accept: "application/json"
        }
    },
    created(){
        this.header.token = this.$webapi.get("token");
    },
    mounted() {
        if(this.Uploadimg){
            this.items.push(this.Uploadimg)
        }
    },
    methods: {
        handleRemove (index) {
            this.items.splice(index,1)
            this.$emit('exportData',this.items)
        },
        onsuccess(response, file, fileList) {
            if (response.code==0) {
                this.$Message.success("上传成功!")
                this.items=[];
                this.items.push(response.data.img)
                this.$emit('exportData',this.items)
                // this.formValidate.apkUrl=response.data.img
            }else{
                this.$netcode.getApiCode(response)
            }
        },
        error(error, file, fileList){
            this.$Message.error("上传失败!")
        },
        formatError(file,fileList){
            this.$Message.error("上传格式错误,请选择'jpg', 'jpeg', 'png','gif'格式!")
        }
    }
}
</script>
<style>
.upfile{
  display: inline-block;
  width:60px;
  height: 60px;
  text-align: center;
  border: 1px #999 dashed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 10px;
}
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
