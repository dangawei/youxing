<template>
  <div class="">
    <Select v-model="valueId" clearable @on-change="change(valueId)">
        <Option v-for="item in alldata" :value="item.actionNo" :key="item.actionNo">{{item.actionName}}</Option>
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
      alldata:[]
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
      this.$api.post('/vehicle/operation/list',null,reset => {
          if (reset.code === 0){
              _this.alldata = reset.data
          }
      })
    },
    change(option) {
      this.$emit('exportData',option)
        
    }
  }
}
</script>

<style scoped lang="less">
</style>
