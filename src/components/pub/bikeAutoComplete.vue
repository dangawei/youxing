<template>
  <div class="">
    <AutoComplete
        v-model="valueNo"
        :data="alldata"
        :filter-method="filterMethod"
        placeholder="筛选车辆编号"
        @on-change="change(valueNo)">
    </AutoComplete>
  </div>
</template>
<script>
export default {
    name: '',
    props: ['importData'],
    data () {
    return {
        valueNo: "",
        alldata:[]
    }
    },
    created() {
        if (this.importData) {
            this.valueNo=parseInt(this.importData);
        }
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
                "status": 2
            }
            this.$api.post('/vehicle/page',data,reset => {
                if (reset.code === 0){
                    var datas = reset.data.data
                    datas.forEach((a)=>{
                        _this.alldata.push(a.vehicleNo)
                    })
                }
            })
        },
    change(option) {
        this.$emit('exportData',option)
    },
    filterMethod (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    }
  }
}
</script>

<style scoped lang="less">
</style>
