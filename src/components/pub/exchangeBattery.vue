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
	// import 'echarts/lib/component/title';
	import 'echarts/lib/component/legend';
	export default{
		components:{
			IEcharts
		},
		data(){
			return{
				loading: false,
				bar: {
					title: {
						text: '换电次数'
					},
					tooltip: {
						show:true,
						// trigger:"axis"
						trigger:"item"
					},
					legend: {
				        data:['二轮','三轮', '总计']
				    },
					xAxis: {
						type:"category",
						data: ['二轮', '三轮', '总计']
					},
					yAxis: {},
					series: [{
						name: '换电次数',
						type: 'bar',
						data: [
							{
								name:"二轮",
								value:100,
								label: {
					                normal: {
					                    show: true,
					                    position: 'top'
					                }
					            },
								itemStyle:{
									color:"#D53A35"
								}
							},
							{
								name:"三轮",
								value:50,
								label: {
					                normal: {
					                    show: true,
					                    position: 'top'
					                }
					            },
								itemStyle:{
									color:"#F37724"
								}
							},
							{
								name:"总计",
								value:150,
								label: {
					                normal: {
					                    show: true,
					                    position: 'top'
					                }
					            },
								itemStyle:{
									color:"#A3A3A4"
								}
							}
						]
					}]
				}
			}
		},
		methods:{
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