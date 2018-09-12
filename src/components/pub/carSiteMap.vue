<template>
	<div>
		<div class="amap-page-container" v-if="show">
	        <el-amap
	        vid="amapDemo"  
	        :center="center"
	        :zoom="zoom"
	        class="amap-demo">
	        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :vid="index" :content-render="marker.contentRender"></el-amap-marker>
	        </el-amap>
	    </div>
	</div>
</template>
<script>
	export default{
		props: {
			zoomNum:{
				type: Number,
				default:7
			},
		},
		data () {
	        let self = this;
	        return {
	            zoom: 7,
	            center:[108.834225,34.185608],
	            markers: [],
	            source: 'click',
	            // componentsMarkers,
	            data:[],
	            show:false
	        }
	    },
	    created(){
	    	if (this.zoomNum) {
	    		this.zoom=this.zoomNum
	    	}
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
	                    // self.center=[item.longitude,item.latitude]
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
      	height: 512px;
    }
</style>