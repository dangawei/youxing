<template>
  <div class="">
    <Select v-model="valuedata" @on-change="departmentselect(valuedata)" :disabled="booldisabled">
        <Option  value="" key="">全部</Option>
        <Option v-for="item in alldata" :value="item.classifyName" :key="item.id">{{item.classifyName}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['problemName','booldis'],
  data () {
    return {
      valuedata: "",
      alldata:[],
      booldisabled:false
    }
  },
  created() {
    //do something after creating vue instance
    this.booldisabled=this.booldis
    this.list()
  },
  mounted() {
    //do something after mounting vue instance
    // this.valuedata = parseInt(this.problemName) || ""
  },
  methods: {
    list () {
      let _this = this;
      let data = {
          token:this.$webapi.get('token'),
          pageNo:"1",
          pageSize:"10000",
          status:1          
      }
      this.$api.get('/common_problem_classify/page',data,reset => {
          if (reset.codeId === 1) {
            _this.alldata = reset.resData
            // _this.valuedata =_this.alldata[0].classifyName
            _this.alldata.forEach(function (item) {
              if(item.id == _this.problemName){
                _this.valuedata = item.classifyName
              }
            })
          }
      })
    },
    departmentselect (option) {
      var data = {}
      this.alldata.forEach(function (item) {
          if(item.classifyName == option){
            data = item
          }
      })
      this.$emit('problecomponent',data)
    }
  }
}
</script>
