<template>
  <div class="">
    <AutoComplete
        v-model="valueId"
        :data="array"
        placeholder="请输入车辆编号"
        @on-change="change(valueId)">
    </AutoComplete>
    <!-- <Select v-model="valueId" clearable @on-change="change(valueId)">
        <Option v-for="item in alldata" :value="item.vehicleId" :key="item.vehicleId">{{item.vehicleNo}}</Option>
    </Select> -->
  </div>
</template>
<script>
export default {
  name: '',
  props: ['importData'],
  data () {
    return {
      valueId: "",
      alldata:[],
      array:[],
    }
  },
    created() {
        this.valueId=parseInt(this.importData)?parseInt(this.importData):'';
    },
  mounted() {
    this.list()
  },
  methods: {
    list () {
      let _this = this;
      let data = {
        "companyId": this.$webapi.get("companyId"),
        "pageNum": 1,
        "pageSize": 100,
        "status":1
      }
      this.$api.post('/vehicle/page/dealer',data,reset => {
          if (reset.code === 0){
                _this.alldata = reset.data.data
                _this.alldata.forEach((obj)=>{
                    _this.array.push(obj.vehicleNo)
                })
          }
      })
    },
    filterMethod (value, option) {
        console.log(value)
        console.log(option)
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    change(option) {
        var _this=this;
        var d=''
        _this.alldata.forEach((obj)=>{
            // _this.array.push(obj.vehicleNo)
            if (obj.vehicleNo==option) {
                d=obj.vehicleId
            }
        })
        _this.$emit('exportData',d)
    }
  }
}
</script>

<style scoped lang="less">
</style>
