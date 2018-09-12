 <!--
    mapmodel:渲染模式 1代表当前门店位置
-->
<template>
  <div>
    <div id="container" :style="sytledata"></div>
  </div>
</template>

<script>
    import VueAMap from 'vue-amap';
var map
var markers=[]
export default {
  name: 'login',
  props: ['mapmodel','longitude','latitude'],
  data () {
    return {
      sytledata:{
        width:"100%",
        height:"500px"
      },
      mobile: "pg_aniu",
      password: "123456",
      exmap:{
        longitude:"",
        latitude:""
      }
    }
  },
  mounted() {
    this.exmap.longitude = this.longitude
    this.exmap.latitude = this.latitude
    //do something after mounting vue instance
    if(this.width){
      this.sytledata.width = this.propName.width?this.propName.width:"100%"
    }
    if(this.height){
      this.sytledata.height = this.propName.height?this.propName.height:"400px"
    }
    this.init()
  },
  methods: {
   init () {
      var _this = this
       map = new AMap.Map('container', {
         resizeEnable: true,
         zoom: 12
       })        
       AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
         map.addControl(new AMap.ToolBar())
         map.addControl(new AMap.Scale())
       })
        map.on('click',function(e){
             map.remove(markers)
             _this.select(e)
       })
      this.modellist()
   },
   poiPickerReady () {
     window.poiPicker = poiPicker;
   },
   select (e) {
       markers = new AMap.Marker({
          map: map,
          position: [e.lnglat.lng,e.lnglat.lat],
          icon: new AMap.Icon({
              size: new AMap.Size(40, 50),  //图标大小
              image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
              imageOffset: new AMap.Pixel(0, -60)
          })
     })
     this.exmap.lng = e.lnglat.lng
     this.exmap.lat = e.lnglat.lat
     map.setZoom(12)
     map.setCenter([e.lnglat.lng,e.lnglat.lat])
     this.export()
  },
  export (){
    this.$emit("exMapData",this.exmap)
  },
  modellist () {
    var str = parseFloat(this.mapmodel?this.mapmodel:0)
        if(str==1){
            this.showlocation()
        }
   },
   showlocation () {
      map.setCenter([this.exmap.longitude,this.exmap.latitude])
       //添加点标记，并使用自己的icon
      markers = new AMap.Marker({
         map: map,
         position: [this.exmap.longitude,this.exmap.latitude],
         icon: new AMap.Icon({
             size: new AMap.Size(40, 50),  //图标大小
             image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
             imageOffset: new AMap.Pixel(0, -60)
         })
      })
   }
  }
}
</script>
