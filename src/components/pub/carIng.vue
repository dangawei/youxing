<template>
	<div class="echarts">
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
	import 'echarts/lib/component/title';
	import 'echarts/lib/component/legend';
	export default{
		components:{
			IEcharts
		},
		data(){
			return{
				loading: false,
				carNumber:{},
				bar: {}
			}
		},
		created(){
			this.list()
		},
		methods:{
			list () {
				let _this = this;
				let data = {
					id:this.$webapi.get("companyId")
				}
				this.$api.post('/statistics/vehicle/usageRate',data,reset => {
					if (reset.code === 0){
						if (reset.data.yi2||reset.data.yi3) {
							_this.carNumber.using=[]
							_this.carNumber.using.push(reset.data.yi2)
							_this.carNumber.using.push(reset.data.yi3)
						}
						if (reset.data.twoSum||reset.data.threeSum) {
							_this.carNumber.zong=[]
							_this.carNumber.zong.push(reset.data.twoSum)
							_this.carNumber.zong.push(reset.data.threeSum)
							
						}
						if (reset.data.usageRate2||reset.data.usageRate3) {
							_this.carNumber.rate=[]
							_this.carNumber.rate.push((reset.data.usageRate2*100).toFixed(2))
							_this.carNumber.rate.push((reset.data.usageRate3*100).toFixed(2))
						}
						this.barCopy(_this.carNumber);
					}else{
	                    _this.$netcode.getApiCode(reset)
	                }
				})
			},
			barCopy(e){
				this.bar={
					title: {
						text: '车辆当前在线率'
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
				        data:['','','使用中','总计','在线率(%)'],
				        align: 'left', //水平方向位置
				        itemWidth:14
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
					xAxis: [{
						type:"value"
					}],
					yAxis: [
						{
				            type : 'category',
				            data : ['二轮','三轮']
						}
					],
					series: [
						{
							name: '使用中',
							type: 'bar',
							label: {
				                normal: {
				                    show: true,
				                    position: 'inside'
				                }
				            },
							data: e.using
						},
						{
							name: '总计',
							type: 'bar',
							label: {
				                normal: {
				                    show: true,
				                    position: 'inside'
				                }
				            },
							data: e.zong
						},
						{
							name: '在线率(%)',
							type: 'bar',
							label: {
				                normal: {
				                    show: true,
				                    position: 'right'
				                }
				            },
							data: e.rate
						},
					],
					color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)']
				}
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
				console.log(instance, ECharts);
			},
		}
	}
</script>
<style scoped>
	.echarts{
		height: 200px;
	}
</style>