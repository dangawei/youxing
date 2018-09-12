<template>
    <div class="layout">
        <Layout>
            <Row>
                <Col :style="widthdata">
                    <side-component :height="sideHeight" v-if="sideshow"></side-component>
                </Col>
                <Col :style="widthdataright" >
                  <div class="web-shell">
                    <div class="web-shell-hd">
                        <header-component @headerdata="headerdata"></header-component>
                    </div>
                    <div class="web-shell-bd">
                        <Content>
                            <transition name="fade">
                                <router-view/></router-view>
                            </transition>
                        </Content>
                    </div>
                  </div>
                </Col>
            </Row>
        </Layout>
    </div>
</template>

<script>
import HeaderComponent from "./common/headerComponent"
import SideComponent from "./common/sideComponent"
export default {
    components:{
        HeaderComponent,
        SideComponent,
    },
    data () {
        return {
            sideshow:false,
            show:true,
            sideHeight:0,
            muneheight:100,
            widthnum:240,
            widthdata:{},
            widthdataright:{}
        }
    },
    mounted(){
        this.widthdataright = {
            display:"block",
            "margin-left":this.widthnum+"px",
        }
        this.sideHeight = window.innerHeight-64
        this.widthdata = {
            width:this.widthnum+"px",
            float:"left",
            background:"#001529",
            "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
            "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
             position: "relative",
             "z-index":100,
              overflow:"hidden"
        }
        this.watchwidth()
        this.sideshow = true 
    },
    watch:{
        widthnum:function (a,c){
            this.widthdata = {
                width:this.widthnum+"px",
                float:"left",
                background:"#001529",
                "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
                "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
                position: "relative",
                "z-index":100,
                overflow:"hidden"
            }
            // console.log(window.innerWidth)
            this.widthdataright = {
                display:"block",
                "margin-left":this.widthnum+"px",
                // width:(window.innerWidth)+"px"
            }
        }
    },
    methods:{
        headerdata() {
            if(this.widthnum==240){
                this.widthnum=0
            }else{
                this.widthnum=240
            }
        },
        watchwidth () {
            var _this = this
            window.onresize = function () {
                _this.sideHeight = window.innerHeight-64
                if(document.body.offsetWidth<780){
                    _this.widthnum = 0
                }else if(document.body.offsetWidth>780){
                    _this.widthnum = 240
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    body{
        //background: #495060;
    }
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .web-shell{
        width: 100%;
        height: 100vh;
        display: flex;
        flex: 1;
        flex-direction: column;
    }
    .web-shell-hd{
        width: 100%;
        height: 60;
    }
    .web-shell-bd{
        flex:1;
        overflow-y:scroll;
    }
    .fold-enter-active {
      animation-name: fold-in !important;
      animation-duration: .5s;
    }
    .fold-leave-active {
      animation-name: fold-out !important;
      animation-duration: .5s;
    }
    @keyframes fold-in {
      0% {
        transform: translate3d(0, 100%, 0);
      }
      50% {
        transform: translate3d(0, 50%, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    @keyframes fold-out {
      0% {
        transform: translate3d(0, 0, 0);
      }
      50% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
</style>
