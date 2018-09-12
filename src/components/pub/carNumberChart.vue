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
				this.$api.post('/statistics/vehicle/number',data,reset => {
					if (reset.code === 0){
						if (reset.data.yi2||reset.data.yi3) {
							_this.carNumber.yi=[]
							_this.carNumber.yi.push(reset.data.yi2)
							_this.carNumber.yi.push(reset.data.yi3)
							_this.carNumber.yi.push(reset.data.yi2+reset.data.yi3)
						}
						if (reset.data.wei2||reset.data.wei3) {
							_this.carNumber.wei=[]
							_this.carNumber.wei.push(reset.data.wei2)
							_this.carNumber.wei.push(reset.data.wei3)
							_this.carNumber.wei.push(reset.data.wei2+reset.data.wei3)

						}
						if (reset.data.two||reset.data.three) {
							_this.carNumber.zong=[]
							_this.carNumber.zong.push(reset.data.two)
							_this.carNumber.zong.push(reset.data.three)
							_this.carNumber.zong.push(reset.data.two+reset.data.three)
						}
						this.barCopy(_this.carNumber);
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
						text: '车辆总数量图表'
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
				        data:['','','已分配','未分配','总数量'],
				        itemWidth:14
				    },
					xAxis: {
						type:"category",
						data: ['二轮', '三轮','总计'],
						// inverse:true
					},
					yAxis: {},
					series: [
						{
							name: '已分配',
							type: 'bar',
							label: {
								normal:{
				                    show: true,
				                    position: 'top'
				                }
				            },
							data: e.yi
						},
						{
							name: '未分配',
							type: 'bar',
							label: {
								normal:{
				                    show: true,
				                    position: 'top'
				                }
				            },
							data: e.wei
						},
						{
							name: '总数量',
							type: 'bar',
							label: {
								normal:{
				                    show: true,
				                    position: 'top'
				                }
				            },
							data: e.zong
						},
					],
					color:["#D53A35","#F37724","#A3A3A4"]
					// color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
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