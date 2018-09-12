<template>
  <div class="">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>角色管理</BreadcrumbItem>
                <BreadcrumbItem to="/role/list">角色列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>权限设置</h2>
            </div>
        </div>
    </div>
    <div class="getResourceAll">
       <div class="resourcelist" v-for="(item,itemindex) in itemdata" style="margin-bottom:20px">
          <div class="resourcelist-hd" style="margin-bottom:10px">
             <span @click="first(item,itemindex)"><Checkbox v-model="item.flag==0?false:true" size="large"></Checkbox></span>{{item.menuName}}
          </div>
          <div class="resourcelist-bd">
              <div class="resourcelist" style="margin-left:20px;margin-bottom:10px" v-for="(itemrole,index) in item.menuLists">
                 <div class="resourcelist-hd" style="margin-bottom:10px" >
                  <span @click="second(itemrole,item,index)"><Checkbox v-model="itemrole.flag==0?false:true" size="large"></Checkbox></span>{{itemrole.menuName}}
                 </div>
                 <div class="resourcelist-bd" style="margin-left:30px;margin-bottom:5px" v-if="itemrole.menuLists!=null" >
                     <div  v-for="itemrolelist in itemrole.menuLists">
                        <span @click="three(itemrolelist,index,itemindex)"><Checkbox v-model="itemrolelist.flag==0?false:true" size="large"></Checkbox>{{itemrolelist.menuName}}</span>
                     </div>
                 </div>
              </div>
          </div>
       </div>
   </div>
   <div>
      <div class="" style="text-align:center;">
          <Button type="success" size="large" @click="save()">保存</Button>
      </div>
   </div>
  </div>
</template>
<script>
export default {
  name: 'Ressource',
  created() {
    //do something after creating vue instance
    this.subfrom.roleId = this.$route.params.id
    this.list()
  },
  data () {
    return {
        subfrom:{
            roleId:""
        },
        itemdata:[],
        newitemdata:{
          roleMenus:[]
        },
        selfData:[]
    }
  },
  methods:{
    first (item,index) {
      let show =  item.flag = !item.flag
      item.menuLists.forEach(function (list) {
          list.flag = show
          if(list.menuLists!=null){
             list.menuLists.forEach(function (itemlist) {
               itemlist.flag = show
             })
          }
      })
    },
    second (itemrole,item,index) {
      let show =  itemrole.flag = !itemrole.flag
      if(itemrole.menuLists!=null){
         itemrole.menuLists.forEach(function (itemlist) {
           itemlist.flag = show
         })
      }
      //判断上一级
      let num = 0
      item.menuLists.forEach(function (itemlist) {
          if(itemlist.flag){
             num = num + 1
          }
      })
      if(num>0){
        item.flag = true
      }else if(num == 0){
        item.flag = false
      }
    },
    three (itemrolelist,index,itemindex) {
        let show =  itemrolelist.flag = !itemrolelist.flag
        let num = 0
        this.itemdata[itemindex].menuLists[index].menuLists.forEach(function (itemlist) {
            if(itemlist.flag){
                 num = num + 1
            }
        })
        if(num>0){
            this.itemdata[itemindex].flag = true
            this.itemdata[itemindex].menuLists[index].flag = true
        }else if(num == 0){
          let strnum = 0
           this.itemdata[itemindex].menuLists[index].flag = false
           this.itemdata[itemindex].menuLists.forEach(function (itemlist) {
               if(itemlist.flag){
                  strnum = strnum + 1
               }
           })
           if(num == 0){
             this.itemdata[itemindex].flag  = false
           }
        }
    },
    list () {
      let _this=this;
      var data=parseInt(this.$route.params.id)
      this.$api.post("/role_menu/menu", data, reset => {
        if (reset.code === 0) {
            var ddd=reset.data;
            // ddd.forEach(function(obj){
            //   obj.flag=1
            //   if (obj.menuLists) {
            //     obj.menuLists.forEach(function(a){
            //       a.flag=1
            //     })
            //   }
              
            // })
            _this.itemdata=ddd
        }else {
          _this.$netcode.getApiCode(reset)
        }
      })
      
    },
    save () {
      let _this = this
      var data = []
      // {roleResources:[{roleId:28,resourcesId:1},{roleId:28,resourcesId:2}]}
        this.itemdata.forEach(function (itemlist) {
           if(itemlist.flag){
              var itemdata = {
                  roleId:parseInt(_this.$route.params.id),
                  menuId:itemlist.id
              }
              data.push(itemdata)
           }
           if(itemlist.menuLists!=null){
             itemlist.menuLists.forEach(function (item) {
               if(item.flag){
                  var itemdata = {
                      roleId:parseInt(_this.$route.params.id),
                      menuId:item.id
                  }
                  data.push(itemdata)
                  if(item.menuLists!=null){
                    item.menuLists.forEach(function (itemthree) {
                      if(itemthree.flag){
                         var itemdata = {
                             roleId:parseInt(_this.$route.params.id),
                             menuId:itemthree.id
                         }
                         data.push(itemdata)
                      }
                   })
                  }
                }
             })
           }
        })
        this.newitemdata = data
        if(data.length<1){
            this.$Message.error('资源信息至少选择一个才能保存')
        }else{
            this.saveemit()
        }
    },
    saveemit () {
      var _this = this
      var datas=JSON.stringify(this.newitemdata)
      this.$api.post("/role_menu/save", datas, reset => {
        if (reset.code === 0) {
            _this.$Message.success("设置成功!")
            _this.$router.push({path:"/role/list"})
            window.location.reload();
        }else {
          _this.$netcode.getApiCode(reset)
       }
      })
    }
  }
}
</script>

<style>
  .getResourceAll{
    padding: 15px;
  }
  .resourcelist{
    text-align: left
  }
</style>
