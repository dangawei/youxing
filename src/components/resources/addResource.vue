<style scoped>

.res-name {
    padding: 10px 16px;
    text-align: right;
    border-bottom: 1px solid #ccc;
}

.res-name span {
    float: left;
    line-height: 32px;
    font-size: 20px;
}

ul {
    margin: 0;
    padding: 0px;
    list-style: none;
}

li {
    text-align: left;
    padding-left: 16px;
}

.res-title-name {
    padding-top: 6px;
    padding-bottom: 0px;
    position: relative;
    z-index: 1;
    transition: all .2s ease-in-out;
}

.res-title-div {
    font-size: 18px;
}

.res-title-div p {
    text-align: center;
}

.res-title-name-div {
    font-size: 16px;
}

.res-title-name-ul {
    margin: 0;
    outline: 0;
    list-style: none;
    color: #495060;
    font-size: 14px;
    position: relative;
    z-index: 900;
}

.icon {
    display: inline-block;
}

.icon-div {
    text-align: right;
    padding-right:10px;
}

.icon-div span {
    float: left;
}

.icon span {
    display: inline-block;
    margin-left: 15px;
}

.menu {
    border-right: 1px solid #ccc;
}

</style>

<template>

<div id="resource" style="width:100%">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>基础信息</BreadcrumbItem>
                <BreadcrumbItem>资源详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>资源详情</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
            <Row>
                <Col span="8">
                    <div class="menu">
                        <div class="res-name">
                            <span>一级菜单</span>
                            <Button type="primary" @click="addmenuone()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objArr">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.menuName}}</span>
                                    <p class="icon">
                                        <span @click="remove(item)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span>
                                        <span @click="switchone(item)"><Icon type="android-add-circle" color="#1AAB8D"></Icon></span>
                                    </p>

                                </div>
                            </li>
                        </ul>
                    </div>

                </Col>
                <Col span="8">
                    <div class="menu" v-if="showtwo">
                        <div class="res-name">
                            <span>二级菜单</span>
                            <Button type="primary" @click="addmenutwo()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objtwo">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.menuName}}</span>
                                    <p class="icon">
                                        <span @click="remove(item)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span>
                                        <span @click="switchtwo(item)"><Icon type="android-add-circle" color="#1AAB8D"></Icon></span>
                                    </p>

                                </div>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span="8">
                    <div class="menu" v-if="showthree">
                        <div class="res-name">
                            <span>三级菜单</span>
                            <Button type="primary" @click="addmenuthree()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objthree">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.menuName}}</span>
                                    <p class="icon">
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span><span @click="remove(item)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                    </p>

                                </div>

                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>

            <Modal
                v-model="addmodal"
                :title="addtitle"
                :mask-closable="false"
                @on-cancel="cancel"
                >
                <add-resource-component :addid="add"></add-resource-component>
                <div slot="footer">
                </div>
            </Modal>
            <resource-component-edit @editresourcecomponentdata="editresourcecomponentdata" :editresourceshow="editresourceshow" :editresourcedata="editresourcedata" v-if="editresourceshow"></resource-component-edit>
        </div>
    </div>
</div>

</template>

<script>
import AddResourceComponent from './addResourceComponent.vue'
import ResourceComponentEdit from './editresource.vue'
import {vm} from '@/js/vm.js'
import Vue from 'vue'
export default {
    components: {
        ResourceComponentEdit: ResourceComponentEdit,
        AddResourceComponent: AddResourceComponent
    },
    data() {
            return {
                showtwo: false,
                showthree: false,
                addtitle: '',
                addmodal: false,
                editresourcedata: {},
                addone:'',
                addtwo:'',
                add:{
                    addid:0,
                    menuStatus:1,
                },
                editresourceshow: false,
                objArr: [],
                objtwo: [],
                objthree: [],
            }
        },
        created() {
            vm.$on("addmodal", (datas) => {
                this.addmodal = datas;
                this.list(0,1);
            });
            vm.$on("showtwo", (datas) => {
                this.addmodal = datas.addmodal;
                if (datas.menuStatus==2) {
                    this.showtwo = datas.show;
                    this.list(datas.id,datas.menuStatus);
                }else{
                    this.showtwo = datas.show;
                    this.showthree = datas.show;
                    this.list(datas.id,datas.menuStatus);
                }

            });
        },
        mounted() {
            this.list(0,1);
        },
        methods: {
            cancel () {
                this.addmodal = false
            },
            addmenuone() {
                this.addmodal = true;
                this.addtitle = "新增一级菜单";
                this.add.addid=0;
                this.add.menuStatus=1;
            },
            addmenutwo() {
                this.addtitle = "新增二级菜单";
                this.add.addid=this.addone;
                this.add.menuStatus=2;
                this.addmodal = true;
            },
            addmenuthree() {
                this.addtitle = "新增三级菜单";
                this.add.addid=this.addtwo;
                this.add.menuStatus=3;
                this.addmodal = true;
            },
            handleRender(val) {
                this.editresourcedata = val;
                this.editresourceshow = true;
            },
            editresourcecomponentdata(e) {
                this.editresourceshow = e.editresourceshow;
                if (e.start!=null) {
                    this.list(e.start.parentId,e.start.menuStatus);
                }
                
            },
            switchone(e) {
                this.showthree=false;
                this.showtwo=true;
                this.objthree=[];
                // this.objtwo=e.menuList;
                this.addone=e.id;
                this.list(e.id,2)
            },
            switchtwo(e) {
                this.showthree=true;
                this.addtwo=e.id;
                // this.objthree=e.menuList;
                // this.getthree(e);
                this.list(e.id,3)
            },
            list(e,status) {
                let _this = this
                let data = {
                    "parentId":e
                }
                if (status==1) {
                    this.$api.post('/menu/list', data, reset => {
                        if (reset.code === 0) {
                            let data = reset.data
                            _this.objArr = data
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                }else if (status==2) {
                    this.$api.post('/menu/list', data, reset => {
                        if (reset.code === 0) {
                            let data = reset.data
                            _this.objtwo = data
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                }else{
                   this.$api.post('/menu/list', data, reset => {
                        if (reset.code === 0) {
                            let data = reset.data
                            _this.objthree = data
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    }) 
                }
                
            },
            remove(e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除' + e.menuName + '吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            id:e.id
                        }
                        this.$api.post("/menu/delete", data, reset => {
                            if (reset.code === 0) {            
                                _this.list(e.parentId,e.menuStatus);
                                _this.$Message.info('删除成功');
                            } else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });

            },
        },

}

</script>
