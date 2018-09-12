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
					id:this.$webapi.get("companyId")
				}
				this.$api.post('/statistics/vehicle/breakdownRate',data,reset => {
					if (reset.code === 0){
						_this.carNumber.Array=[];
						_this.carNumber.obj={};
						_this.carNumber.Array=[
							{num:reset.data.gu2,name:"二轮故障"},
							{num:reset.data.twoSum-reset.data.gu2,name:"二轮完好"},
							{num:reset.data.gu3,name:"三轮故障"},
							{num:reset.data.threeSum-reset.data.gu3,name:"三轮完好"}
						];
						_this.carNumber.obj=reset.data
						_this.barCopy(_this.carNumber);
					}else{
	                    _this.$netcode.getApiCode(reset)
	                }
				})
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
			},
			barCopy(e){
				this.bar={
					title: {
						text: '车辆故障表'
					},
					tooltip: {
						show:true,
						// trigger:"axis",
						trigger:"item",
						formatter: "{b} : {c} ({d}%)"
					},
					legend: {
						bottom: 0,
				        data:["二轮故障","二轮完好","三轮故障","三轮完好"],
				        itemWidth:14
				    },
					series: [
						{
							type: 'pie',
							// label: {
							// 	normal:{
				   //                  show: true,
				   //                  position: 'top'
				   //              }
				   //          },
			   				radius : [0,'65%'],
				            center: ['50%', '50%'],
				            selectedMode: 'single',
							data: [
								{
									value:e.Array[0].num,
									name:"二轮故障"
								},
								{
									value:e.Array[1].num,
									name:"二轮完好"
								},
								{
									value:e.Array[2].num,
									name:"三轮故障"
								},
								{
									value:e.Array[3].num,
									name:"三轮完好"
								},
							]
						},
					],
					// color:["#D53A35","#F37724","#A3A3A4"]
					color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
				}
				this.show=true;
			}
		}
	}
</script>
<style scoped>
	.echarts{
		height: 200px;
	}
</style>