<template>
    <div>
        <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>修改{{formCustom.vehicleNo}} 编号车辆维修状态</span>
            </p>
            <div style="text-align:center">
                <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="100">
                    <!-- <FormItem label="维修车辆编号" prop="vehicleNo">
                        <p>{{formCustom.vehicleNo}}</p>
                    </FormItem>
                    <FormItem label="维修车辆人员" prop="workerNo">
                        <get-maintainer @exportData="selWorkerNo"></get-maintainer>
                    </FormItem> -->
                    <FormItem label="维修结果" prop="repairResult">
                        <Select v-model="formCustom.repairResult">
                            <Option :value="1">已修复</Option>
                            <Option :value="3">未修好</Option>
                            <Option :value="4">已报废</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="维修开始时间:" prop="startTime">
                        <start-date @exportDate="startDate"></start-date>
                    </FormItem> -->
                    <FormItem label="维修结束时间:" prop="endTime">
                        <end-date @exportDate="endDate"></end-date>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="handleSave('formCustom')" size="large">确定</Button>
                      <Button type="error" @click="handleCancel('formCustom')" size="large">取消</Button>
                    </FormItem>
                </Form>
            </div>
         <div slot="footer">
         </div>
        </Modal>
    </div>
</template>
<script>
    import getMaintainer from "@/components/pub/getMaintainer"
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
    export default {
        props:['importShow',"importData"],
        components:{
            getMaintainer,
            startDate,
            endDate,
        },
        data () {
            return {
                formCustom:{
                    endTime: "",
                    faultRecordId: 0,
                    repairResult: "",
                    // startTime: "",
                    // vehicleNo: "",
                    // workerNo: ""
                },
              ashow:false,
              ruleValidate: {
                // workerNo:[{
                //     required: true,
                //     message: '维修人员没有选择'
                // }],
                // startTime:[{
                //     required: true,
                //     message: '开始修车时间没填写'
                // }],
                endTime:[{
                    required: true,
                    message: '完成修车时间没填写'
                }],
                repairResult:[{
                    required: true,
                    message: '维修结果没选择'
                }],
              }
            }
        },
        created(){
            this.ashow=this.importShow
            this.formCustom.faultRecordId=this.importData.faultRecordId
            this.formCustom.id=this.importData.id
            this.formCustom.workerNo=this.importData.workerNo
            this.formCustom.vehicleNo=this.importData.vehicleNo
        },
        mounted(){
          // this.getCarModel();
          console.log(this.importData);
        },
        methods: {
            cancel () {

                this.remove("formCustom");
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
                    "id":this.formCustom.id,
                    "endTime": this.formCustom.endTime+" 00:00:00",
                    "repairResult": this.formCustom.repairResult,
                    "faultRecordId":this.formCustom.faultRecordId,
                    "workerNo":this.formCustom.workerNo,
                    "vehicleNo":this.formCustom.vehicleNo
                }
                this.$api.post("/repairRecord/update", data, reset => {
                    if (reset.code === 0) {
                        _this.$emit('exportShow',{"show":false})
                        _this.$Message.success("成功!")
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            startDate(e){
                this.formCustom.startTime=e
            },
            endDate(e){
                this.formCustom.endTime=e
            },
            selWorkerNo(e){
                this.formCustom.workerNo=e.workerNo
            }
        }
    }
</script>
