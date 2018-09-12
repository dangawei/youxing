<template>
  <div class="">
    <Select v-model="valueId" clearable @on-change="change(valueId)">
        <Option v-for="item in alldata" :value="item.id" :key="item.id">{{item.faultTypeName}}</Option>
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
        if (this.importData) {
            this.valueId=parseInt(this.importData);
        }
    },
    mounted() {
       this.list(); 
    },
    methods: {
        list(){
            var _this=this;
            this.$api.post('/fault/type/all',null,reset => {
                if (reset.code === 0){
                    _this.alldata = reset.data
                }
            })
        },
        change(e) {
            this.$emit('exportData',e)

        }
    }
}
</script>

<style scoped lang="less">
</style>
