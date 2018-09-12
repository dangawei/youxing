<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>用户管理</BreadcrumbItem>
			<BreadcrumbItem to="/user/list">用户列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>用户还车</h2>
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
			  <!-- <Button type="primary"  @click="add()">导入车辆信息(excel)</Button> -->
			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
				    <div class="">
						<Table border :columns="columnsdata" :data="data"></Table>
				    </div>
				</Col>
			</Row>
            <div style="text-align:center;margin-top:15px;">
                <Button type="primary"  @click="back">返回</Button>
            </div>
		</div>
    </div>
  </div>
</template>
<script> 
export default {
    components:{
    },
    data () {
        return {
            formCustom:{
              trueName:"",
              mobile:"",
              username:"",
              status:""
            },
            columnsdata: [
                {
                    title: '车辆编号',
                    key: 'vehicleNo'
                },
                {
                    title: '中控编号',
                    key: 'vehicleState',
                    render: (h, params) => {
                        // var str=''
                        // if (params.row.vehicleState==1) {
                        //     str="未分配"
                        // }
                        return h('div', [
                            h('span',params.row.vehicleInfo.middleControlNo)
                        ])
                    }
                },
                {
                    title: '所属人',
                    key: 'customerName'
                },
                {
                    title: '车辆类型(轮)',
                    key: 'vehicleModelId',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.vehicleInfo.vehicleModelId)
                        ])
                    }
                },
                {
                    title: '车辆状态',
                    key: 'state',
                    render: (h, params) => {
                        var str="使用中"
                        if (params.row.vehicleInfo.state==2) {
                            str="维修中"
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                {
                    title: '分配给用户时间',
                    key: 'createAt',
                    render: (h, params) => {
                        // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', params.row.createAt)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:140,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.returnCar(params.row);
                                    }
                                }
                            },"还车")
                        ])
                    }
                },
            ],
            data: []
        }
    },
    mounted() {
      	this.getCar()
    },
    methods:{
        getCar(){
            var listdata = {
                "vehicleId":this.$route.query.vehicleId
            }
            var _this =  this
            this.$api.post('/vehicle/detail',listdata,reset => {
                if (reset.code === 0) {
                    var dataBox=reset.data;
                    dataBox.loginName=_this.$route.query.loginName
                    dataBox.customerName=_this.$route.query.customerName
                    _this.data.push(dataBox);
                } else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        returnCar(e){
            let _this=this;
            let data={
                "companyId":this.$webapi.get("companyId"),
                "vehicleNo": e.vehicleNo
            }
            this.$api.post("/vehicle/return/customer",data,result=>{
                if (result.code==0) {
                    _this.$Message.success("还车成功!")
                    _this.getCar();
                    // _this.$router.push("/user/list")
                    _this.$router.back(-1);
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        back(){
            _this.$router.back(-1);
        }
    }
  }
</script>
