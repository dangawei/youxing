<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加维护人员</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="name">
              <Input v-model="adddatas.name" placeholder="请填写姓名"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex" required>
              <!-- <Input v-model="adddatas.sex" placeholder="请填写性别"></Input> -->
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
              <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
              <!-- <Button type="primary" @click="handleSubmit('adddatas')" size="large">提交</Button> -->
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
        props:['addshow'],
        data () {
            return {
              adddatas:{
                name:'',
                sex:'',
                idCard:'',
                mobileNo:''
              },
              ashow:false,
              ruleValidate: {
                name:[{
                  required: true,
                  message: '姓名没有填写',
                  trigger: 'blur'
                }],
                
                idCard:[{
                  required: true,
                  message: '身份证号没有填写',
                  trigger: 'blur'
                }],
                mobileNo:[{
                  required: true,
                  message: '手机号没有填写',
                  trigger: 'blur'
                }],
              }
            }
        },
        created(){
          this.ashow=this.addshow
        },
        mounted(){
          // this.getCarModel();
        },
        methods: {
          cancel () {
            this.$emit('addshow',false)
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
          post () {
            let _this = this;           
            // var url = "/dealer-maintainer/save?token=" + this.$webapi.get('token') + "&name=" + this.adddatas.name + "&sex="+sex + "&idCard="+this.adddatas.idCard + "&mobileNo="+this.adddatas.mobileNo
            var data={
              token:this.$webapi.get('token'),
              name:this.adddatas.name,
              sex:this.adddatas.sex,
              idCard:this.adddatas.idCard,
              mobileNo:this.adddatas.mobileNo
            }
            this.$api.post("/dealer-maintainer/save", data, reset => {
              if (reset.codeId === 1) {
                _this.$emit('addshow',false)
                _this.$Message.success("添加成功!")
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          }
        }
    }
</script>
