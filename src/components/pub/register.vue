<template>
    <div class="echarts" v-if="show">
        <IEcharts
            :option="bar"
            :loading="loading"
            @ready="onReady"
        />
        <!-- <button @click="doRandom">Random</button> -->
    </div>
</template>
<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';
    import 'echarts/lib/chart/bar';
    // import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    export default{
        components:{
            IEcharts
        },
        data(){
            return{
                show:false,
                loading: false,
                carNumber:{},
                bar: {}
            }
        },
        created(){
            this.list();

        },
        mounted(){
            
        },
        methods:{
            list () {
                let _this = this;
                let data = {
                    id:this.$webapi.get("companyId"),
                    flag:this.$webapi.get("flag")
                }
                this.$api.post('/statistics/register',data,reset => {
                    if (reset.code === 0){
                        // _this.carNumber.push((reset.data.avg2).toFixed(2))
                        // _this.carNumber.push((reset.data.avg3).toFixed(2))
                        this.barCopy(reset.data);
                    }else{
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            barCopy(e){
                this.bar={
                    title: {
                        text: '每月新增用户统计'
                    },
                    tooltip: {
                        show:true,
                        trigger:"axis",
                        // trigger:"item"
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        textStyle:{
                            align:"left"
                        }
                    },
                    legend: {
                        data:['','','总人数','新增人数','新增百分比'],
                        itemWidth:14
                    },
                    xAxis: {
                        type:"category",
                        data: ['总人数', '新增人数','新增百分比']
                        // inverse:true
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '总人数',
                            type: 'bar',
                            label: {
                                normal:{
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: e.allSum
                        },
                        {
                            name: '新增人数',
                            type: 'bar',
                            label: {
                                normal:{
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: e.registerSum
                        },
                        {
                            name: '新增百分比',
                            type: 'bar',
                            label: {
                                normal:{
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: e.percentage
                        },
                    ],
                    color:["#D53A35","#F37724","#A3A3A4"]
                    // color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
                }
                this.show=true;
            },
            doRandom() {
                const that = this;
                let data = [];
                for (let i = 0, min = 5, max = 99; i < 3; i++) {
                    data.push(Math.floor(Math.random() * (max + 1 - min) + min));
                }
                that.loading = !that.loading;
                that.bar.series[0].data = data;
            },
            onReady(instance, ECharts) {
                // console.log(instance, ECharts);
            }
        }
    }
</script>
<style scoped>
    .echarts{
        height: 200px;
    }
</style>