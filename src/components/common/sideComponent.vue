<template>
   <div class="SideMenuComponent">
        <div class="mermber-logo"><i></i>优兴租赁管理后台</div>
        <Scroll :height='muneheight'>
            <Menu  theme="light" width="auto" :open-names="['1']" :theme="theme2"  @on-select="changeMenu" accordion v-if="show">
                  <div class="">
                    <Submenu :name="index" v-for="(item,index) in datas">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            <span>{{item.menuName}}</span>
                        </template>
						<MenuItem :name="index+'-'+itemlistindex" v-for="(itemlist,itemlistindex) in item.menuLists">
						 {{itemlist.menuName}}
						</MenuItem>
                    </Submenu>
               </div>
           </Menu>
       </Scroll>
   </div>
</template>
<script>
export default {
  name: 'SideMenu',
  data () {
    return {
        datas:[
        ],
        muneheight:"",
        theme2:'dark',
        show:false
    }
  },
  //获取菜单内容，是否缓存内容存在，如果没有，就重新获取，已存在，就从缓存里面获取
  beforeCreate () {
    // let _this = this
    // let roleId = 19
    // this.$api.post('/role_menu/roleMenus',roleId,reset => {
    //     if (reset.code === 0) {
    //       _this.datas = reset.data
    //     }else {
    //       _this.$netcode.getApiCode(reset)
    //    }
    // })
    // this.datas = JSON.parse(this.$webapi.get("menuList"))
    // console.log(this.datas);
    // this.show=true;
  },
  created () {
    let _this = this
    this.$api.post('/role_menu/roleMenus',null,reset => {
        if (reset.code === 0) {
          _this.datas = reset.data
          this.show=true;
        }else {
          _this.$netcode.getApiCode(reset)
       }
    })
     this.muneheight = window.innerHeight-64;
     window.onresize = function() {
        _this.muneheight = window.innerHeight-64;
    }
  },
  methods: {
    changeMenu (e) {
      var muneindex = e.split("-")[0]
      var itemindex = e.split("-")[1]
      this.$router.push({path:this.datas[muneindex].menuLists[itemindex].path})
       //window.location.href = this.items[muneindex].adminResourcesDoList[itemindex].path
    }
  }
}
</script>

<style>
.SideMenuComponent .subitemest{
  color: #fff
}
.mermber-logo{
  height: 64px;
  position: relative;
  line-height: 64px;
  /* padding-left: 24px; */
  -webkit-transition: all .3s;
  transition: all .3s;
  background: #002140;
  overflow: hidden;
  color: #fff;
  text-align: left;
  font-size: 18px;
}
.mermber-logo i{
  display: inline-block;
  background:url(../../assets/logo.png);
  background-repeat: no-repeat;
  background-size: 40px;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-top:10px;
  float:left;
  margin-right: 10px;
}
.ivu-scroll-container{
    overflow-y:auto
}
.ivu-menu-dark{
   background: #001529!important
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
  background: #000c17!important;
  -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.45) inset;
  box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
  background: #001529
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background: #001529
}
</style>
