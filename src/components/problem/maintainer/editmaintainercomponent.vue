<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>修改维护人员</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="name">
              <Input v-model="adddatas.name" placeholder="请填写姓名"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex">
              <Select v-model="adddatas.sex">
                <Option :value="1">男</Option>
                <Option :value="2">女</Option>
              </Select>  
            </FormItem>
            <FormItem label="身份证号码" prop="idCard">
              <Input v-model="adddatas.idCard" placeholder="请填写身份证号码"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="mobileNo">
              
              <Input v-model="adddatas.mobileNo" placeholder="手机号码"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">修改</Button>
              <Button type="primary" @click="handleSubmit('adddatas')" size="large">取消</Button>
            </FormItem>
          </Form>
        </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
  import {vm} from '../../js/infobase/vm.js'
    export default {
        props:['editshow','editdata'],
        data () {
            return {
              adddatas:{
                id:0,
                name:'',
                sex:'',
                idCard:'',
                mobileNo:''
              },
              ashow:false,
              ruleValidate: {
                
              }
            }
        },
        created(){
          console.log(this.editdata)
          this.ashow=this.editshow
          this.adddatas.id=this.editdata.id
          this.adddatas.name=this.editdata.name
          this.adddatas.idCard=this.editdata.idCard
          this.adddatas.mobileNo=this.editdata.mobileNo
          this.adddatas.sex=this.editdata.sex
          
        },
        mounted(){
          // if (this.adddatas.sex==1) {
          //   this.adddatas.sex="男"
          // }else{
          //   this.adddatas.sex="女"
          // }
          // this.getCarModel();
        },
        methods: {
          cancel () {
            this.remove()
            // _this.$emit('editshow',false)
          },
          handleSave(name) {
            
            let _this = this
            this.$refs[name].validate((valid) => {
              if(valid){

                _this.post();
              }else{
                _this.$Message.error('失败!')
              }
            })
          },
          remove (item) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要关闭吗?</p>',
              onOk: () => {
                this.$emit('editshow',false)
              },
              onCancel: () => {
                 this.ashow = true
              }
            });
          },
          handleSubmit(name){
            this.remove();
          },
          post () {
            let _this = this;
            // var url = "/dealer-maintainer/update?token=" + this.$webapi.get('token')+"&id="+this.adddatas.id;
            var data={
              token:this.$webapi.get('token'),
              id:this.adddatas.id
            }
            if (this.adddatas.name!=this.editdata.name) {
              // url+="&name=" + this.adddatas.name
              data.name=this.adddatas.name
            }
            if (this.adddatas.idCard!=this.editdata.idCard) {
              // url+="&idCard=" + this.adddatas.idCard
              data.idCard=this.adddatas.idCard
            }
            if (this.adddatas.mobileNo!=this.editdata.mobileNo) {
              // url+="&mobileNo=" + this.adddatas.mobileNo
              data.mobileNo=this.adddatas.mobileNo
            }
            
            if (this.adddatas.sex!=this.editdata.sex) {
              // url+="&sex=" + this.adddatas.sex
              data.sex=this.adddatas.sex
            }
            this.$api.post("/dealer-maintainer/update",data, reset => {
              if (reset.codeId === 1) {
                _this.$emit('editshow',false)
                _this.$Message.success("修改成功!")
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          }
        }
    }
</script>
