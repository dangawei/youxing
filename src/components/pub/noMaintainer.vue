<template>
  <div class="">
    <Select v-model="valueId" @on-change="change(valueId)">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.name}}</Option>
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
            let data = {
                "pageNum": 1,
                "pageSize": 100
            }
            this.$api.post('/repairWorker/page/unallot',data,reset => {
                if (reset.code === 0){
                    _this.alldata = reset.data.data
                }
            })
        },
        change(option) {
            var data = {}
            this.alldata.forEach(function (item) {
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
