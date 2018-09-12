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
				bar: {},
				faultTypeData:[]
			}
		},
		created(){
			this.getfault();

		},
		mounted(){
			
		},
		methods:{
			getfault(){
				let _this = this;
				this.$api.post('/fault/type/all',null,reset => {
					if (reset.code === 0) {
						_this.faultTypeData=reset.data
						_this.list();
					}else{
						_this.$netcode.getApiCode(reset)
					}
				})
			},
			list () {
				let _this = this;
				let data = {
					id:this.$webapi.get("companyId")
				}
				this.$api.post('/statistics/vehicle/fault',data,reset => {
					if (reset.code === 0){
						let twoMap=reset.data.twoMap
						let threeMap=reset.data.threeMap
						_this.faultTypeData.forEach((obj)=>{
							let incul2=false
							let incul3=false
							for (let key in twoMap) {
								if (obj.id==key) {
									incul2=true;
									obj.twoNum=twoMap[key]
								}
							}
							for (let key in threeMap) {
								if (obj.id==key) {
									incul3=true;
									obj.threeNum=threeMap[key]
								}
							}
							if (incul2==false) {
								obj.twoNum=0;
							}
							if (incul3==false) {
								obj.threeNum=0;
							}
						})
						this.barCopy(_this.faultTypeData);
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
				let nameArray=[];
				let twoNum=[];
				let threeNum=[]
				for(let value of e){
					nameArray.push(value.faultTypeName)
					twoNum.push(value.twoNum)
					threeNum.push(value.threeNum)
				}
				this.bar={
					title: {
						text: '车辆故障类型统计'
					},
					tooltip: {
						show:true,
						trigger:"axis",
						// trigger:"item"
						// axisPointer : {// 坐标轴指示器，坐标轴触发有效
				            // type : 'shadow'// 默认为直线，可选为：'line' | 'shadow'
				        // },
				        // textStyle:{
				        	// align:"left"
				        // }
					},
					legend: {
				        data:['','','二轮','三轮']
				    },
					xAxis: {
						type:"category",
						boundaryGap: false,
						axisLabel :{
							interval:0,
							rotate:40 
						},
						data: nameArray,
						// inverse:true
					},
					yAxis: {},
					series: [
						{
							name: '二轮',
							type: 'line',
							label: {
								normal:{
				                    show: true,
				                    position: 'top'
				                }
				            },
							data: twoNum
						},
						{
							name: '三轮',
							type: 'line',
							label: {
								normal:{
				                    show: true,
				                    position: 'top'
				                }
				            },
							data: threeNum
						},
					],
					color: ['rgb(224,98,174)','rgb(255,159,127)','rgb(131,120,234)','rgb(249,205,173)','rgb(200,200,169)'],
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