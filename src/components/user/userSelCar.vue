<template>
    <div class="">
        <Modal v-model="ashow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
               <Icon type="information-circled"></Icon>
               <span>分配车辆</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="选择车辆:" prop="vehicleId">
                        <sel-car @exportData="exportData"></sel-car>
                    </FormItem>
                    <FormItem label="配置时间:" prop="startDates">
                        <start-date @exportDate="startDate"></start-date>
                    </FormItem>
                    <FormItem label="还车时间:" prop="endDates">
                        <end-date @exportDate="endDate"></end-date>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >分配</Button>
                        <Button type="error" @click="handleReset('formValidate')" >取消</Button>
                    </FormItem>
             </Form>
            </div>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import selCar from "./../pub/selCar"
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
    export default {
        props:['importShow','importData'],
        components:{
            startDate,
            endDate,
            selCar
        },
        data () {
            return {
                
                ashow:false,
                formValidate: {
                    vehicleId:'',
                    startDates:"",
                    endDates:"",
                },
                ruleValidate: {
                    vehicleId: [
                        { required: true, message: '请选择车辆'}
                    ]
                }
            }
        },
        created(){
            
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
                      _this.$emit('exportShow',{show:false})
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
                // console.log(this.formValidate.vehicleId)
                let _this = this;
                let startTime=new Date(this.formValidate.startDates).getTime()
                let endTime=new Date(this.formValidate.endDates).getTime()
                if (endTime>startTime) {
                    var data = {
                        "customerId": this.importData,
                        "vehicleId": this.formValidate.vehicleId,
                        "rentTime": this.formValidate.startDates+" 00:00:00",
                        "returnTime": this.formValidate.endDates+" 00:00:00"
                    }
                    
                    this.$api.post("/vehicle/allot/customer", data, reset => {
                        if (reset.code === 0) {
                            _this.$Message.success('分配成功');
                            _this.$emit('exportShow',{show:false,data:this.formValidate.vehicleId})
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                }else{
                    _this.$Message.error('选择时间不合理');
                }
                
            },
            exportData(e){
                this.formValidate.vehicleId=e
            },
            startDate(e){
                this.formValidate.startDates=e
            },
            endDate(e){
                this.formValidate.endDates=e
            }
        }
    }
</script>
