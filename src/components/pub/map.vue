<template>
  <div class="amap-box">
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" class="amap-demo" :plugin="plugin" :events="events" :center="center">
        <!-- <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker> -->
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
    props:["importData"],
    data () {
        let self=this;  
        return {
            zoom: 15,
            positions: {
                lng: '',
                lat: '',
                address: ''
            },
            // center: [],
            center: [121.5273285, 31.21515044],
            events: {
                click(e) {
                    let { lng, lat } = e.lnglat;
                    self.positions.lng =lng;
                    self.positions.lat =lat;
                    // 这里通过高德 SDK 完成。
                    var geocoder = new AMap.Geocoder({
                        // key:'5e1fe28e0100adf9d34ec4b8ff4c5069',
                        radius: 1000,
                        extensions: "all"
                    });     
                    geocoder.getAddress([lng ,lat], function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.regeocode) {
                                self.positions.address = result.regeocode.formattedAddress;
                                self.$nextTick();
                                self.$emit("exportData",self.positions)
                            }else{
                               self.$emit("exportData",self.positions) 
                            }
                        }else{
                            self.$emit("exportData",self.positions)
                        }
                    });        
                }
            },
            // marker: {
            //     position: [121.5273285, 31.21515044],
            //     events: {
            //         click: (e) => {
            //            console.log(e); 
            //         },
            //         dragend: (e) => {
            //             this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            //         }
            //     },
            //     visible: true,
            //     draggable: false
            // },
            plugin: [{
                pName: 'Geolocation',
                events: {
                    init(o) {
                        if (self.importData) {
                            if (self.importData.longitude&&self.importData.latitude) {
                                self.center=[self.importData.longitude, self.importData.latitude]
                                self.positions.lng = self.importData.longitude;
                                self.positions.lat = self.importData.latitude;
                                self.positions.address = self.importData.address;
                                self.$emit("exportData",self.positions)
                            }
                        }else{
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                // console.log(result);  //  能获取定位的所有信息
                                if (!self.importData) {
                                    if (result && result.position) {
                                        // self.str = result.formattedAddress;
                                        // self.positions.address = self.str.substring(self.str.indexOf('市') + 1);
                                        self.center=[result.position.lng, result.position.lat]
                                        self.positions.lng = result.position.lng;
                                        self.positions.lat = result.position.lat;
                                        self.$nextTick();
                                        self.$emit("exportData",self.positions)
                                        // sessionStorage.setItem('id', JSON.stringify(self.positions));
                                    }
                                }
                            });
                        }
                        
                    }
                }
            }]
        }
    },
    created(){
        // if (this.importData) {
        //     if (this.importData.longitude&&this.importData.latitude) {
        //         this.center=[this.importData.longitude, this.importData.latitude]
        //         console.log(this.center)
        //     }
        // }
    },
    mounted(){
        // if (this.importData) {
        //     if (this.importData.longitude&&this.importData.latitude) {
        //         this.center=[this.importData.longitude, this.importData.latitude]
        //         console.log(this.center)
        //     }
        // }
        
    },
    methods:{
        
    }    
}
</script>
<style scoped>
    .amap-box{
      margin: 0 0 0;
      width: 800px;
      height: 500px;
    }
    .amap-page-container {
        height: 500px;
    }
</style>