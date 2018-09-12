<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>车辆管理</BreadcrumbItem>
			<BreadcrumbItem>车辆位置</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>已分配车辆位置</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
			   
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
				    <div class="amap-page-container" v-if="show">
                        <el-amap
                        vid="amapDemo"  
                        :center="center"
                        :zoom="zoom"
                        class="amap-demo">
                        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :vid="index" :content-render="marker.contentRender"></el-amap-marker>
                        </el-amap>
                    </div>
				</Col>
			</Row>
		</div>
    </div>
  </div>
</template>
<script>
    // import paging from "@/components/pub/page" 
export default {
    components:{
        // paging
    },
    data () {
        let self = this;
        // const componentsMarkers = this.data.map((item, index) => {
        //     return {
        //         position: [item.longitude,item.latitude],
        //         contentRender: h => h(img, {
        //             attrs: {
        //                 src: "https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png"
        //             },
        //             style: {
        //             },
        //             nativeOn: {
        //                 click: () => {
        //                     console.log(333); 
        //                 }
        //             }
        //         })
        //     }
        // });
        return {
            zoom: 7,
            center:[],
            markers: [],
            source: 'click',
            // componentsMarkers,
            data:[],
            show:false
        }
    },
    created(){
        this.list()
    },
    mounted() {
        
    },
    methods:{
    	list(){
    		let _this=this;
    		this.$api.post("/vehicle/location",null,result=>{
    			if (result.code==0) {
    				_this.data=result.data
                    _this.show=true;
                    _this.map(result.data)
    			}else{
                    _this.$netcode.getApiCode(result)
                }
    		})
    	},
    	map(data){
            let self = this;
            let markers = [];
            data.map((item, index) =>{
                if (item.longitude&&item.latitude) {
                    self.center=[item.longitude,item.latitude]
                    markers.push({
                        position: [item.longitude,item.latitude],
                        contentRender: (h, instance) => {
                            // if use jsx you can write in this
                            // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
                            return h('div',[
                                    h("img",{
                                        attrs: {
                                            src: "https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png"
                                        },
                                        style: {
                                            
                                        },
                                        on: {
                                            click: () => {
                                                console.log(222);
                                            }
                                        }
                                    })
                                ])
                        }
                        // content: `content ${i}`
                    });
                }
                
            })
            this.markers = markers;
            this.show=true;
        }
    }
}
</script>
<style scoped>
    .amap-demo {
      height: 600px;
    }
</style>