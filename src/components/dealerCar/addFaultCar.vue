<template>
    <div>
        <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>{{adddatas.vehicleNo}}故障上报</span>
            </p>
            <div style="text-align:center">
                <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
                    <FormItem label="故障类型" prop="faultType">
                        <fault-type @exportData="exportType" required></fault-type>
                    </FormItem>
                    <FormItem label="故障详情" prop="faultDetails">
                        <Input v-model="adddatas.faultDetails" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="200" placeholder="故障详情" onkeydown="if(event.keyCode==32) return false"></Input>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
                      <Button type="error" @click="handleCancel('adddatas')" size="large">取消</Button>
                    </FormItem>
                </Form>
            </div>
         <div slot="footer">
         </div>
        </Modal>
    </div>
</template>
<script>
    import faultType from "@/components/pub/faultType"
    import bikeAutoComplete from "@/components/pub/bikeAutoComplete"
    export default {
        props:['importShow','importData'],
        components:{
            faultType,
            bikeAutoComplete
        },
        data () {
            return {
              adddatas:{
                vehicleNo:'',
                faultType:'',
                faultDetails:''
              },
              ashow:false,
              ruleValidate: {
                faultType:[{
                  required: true,
                  message: '故障类型没有选择'
                }]
              }
            }
        },
        created(){
            this.ashow=this.importShow
            this.adddatas.vehicleNo=this.importData.vehicleNo
        },
        mounted(){
          // this.getCarModel();
        },
        methods: {
            cancel () {

                this.remove("adddatas");
            },
            handleSave(name) {
                let _this = this
                this.$refs[name].validate((valid) => {
                    if(valid){
                        _this.post();
                    }else{
                        _this.$Message.error('信息不完整!')
                    }
                })
            },
            remove (item) {
                var _this=this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                        _this.$refs[item].resetFields()
                        _this.$emit('exportShow',{"show":false})
                    },
                    onCancel: () => {
                        _this.ashow = true
                    }
                });
            },
            handleCancel(name){
                this.remove(name);
            },
            post () {
                let _this = this;
                var data={
                    "vehicleNo":this.adddatas.vehicleNo,
                    "faultType": this.adddatas.faultType,
                    "faultDetails":this.adddatas.faultDetails
                }
                this.$api.post("/fault/add", data, reset => {
                    if (reset.code === 0) {
                        _this.$emit('exportShow',{"show":false})
                        _this.$Message.success("上报成功!")
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            exportType(e){
                this.adddatas.faultType=e
            },
            exportNo(e){
                this.adddatas.vehicleNo=e;
            }
        }
    }
</script>
