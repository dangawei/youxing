<template>
  <div class="">
    <Select v-model="valueId" @on-change="change(valueId)">
        <Option v-for="item in showData" :value="item.id" :key="item.id">{{item.roleName}}</Option>
    </Select>
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
      showData:[],
    }
  },
  created() {
    this.valueId=parseInt(this.importData);
  },
  mounted() {
    this.list()
  },
  methods: {
    list () {
        let _this = this;
        let data = {
            "pageNum": 1,
            "pageSize": 100,
            "roleName": ""
        }
        this.$api.post('/role/page',data,reset => {
            if (reset.code === 0){
                _this.alldata = reset.data.data
                _this.alldata.forEach(function(obj,i){
                    if (obj.roleName=="总公司客服") {
                        _this.showData.push(obj);
                    }
                    if (obj.roleName=="总公司管理") {
                        _this.showData.push(obj);
                    }
                })
            }
        })
    },
    change(option) {
      var data = {}
      this.showData.forEach(function (item) {
          if(item.id == option){
            data = item
          }
      })
      this.$emit('exportData',data)

    }
  }
}
</script>

<style scoped lang="less">
</style>
