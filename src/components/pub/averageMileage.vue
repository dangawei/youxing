<template>
	<div class="echarts">
		<IEcharts
			:option="bar"
			:loading="loading"
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
				loading: false,
				bar: {},
				carNumber:[]
			}
		},
		created(){
			this.list();
		},
		methods:{
			list () {
				let _this = this;
				let data = {
					id:this.$webapi.get("companyId")
				}
				this.$api.post('/statistics/vehicle/avgMileage',data,reset => {
					if (reset.code === 0){
						_this.carNumber.push((reset.data.avg2).toFixed(2))
						_this.carNumber.push((reset.data.avg3).toFixed(2))
						this.barCopy(_this.carNumber);
					}else{
	                    _this.$netcode.getApiCode(reset)
	                }
				})
			},
			barCopy(e){
				this.bar={
					title: {
						text: '平均里程(km)/车/天'
					},
					tooltip: {
						show:true,
						// trigger:"axis"
						trigger:"item",

					},
					legend: {
				        data:['二轮','三轮']
				    },
					xAxis: {
						type:"category",
						data: ['二轮', '三轮']
					},
					yAxis: {},
					series: [{
						name: '平均里程',
						type: 'bar',
						label: {
							normal:{
			                    show: true,
			                    position: 'top'
			                }
			            },
						data: [
							{
								name:"二轮",
								value:e[0],
								itemStyle:{
									color:"#D53A35"
								}
							},
							{
								name:"三轮",
								value:e[1],
								itemStyle:{
									color:"#F37724"
								}
							}
						]
					}]
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
				
			},
		}
	}
</script>
<style scoped>
	.echarts{
		height: 200px;
	}
</style>