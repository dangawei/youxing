import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import branchList from '@/components/branch/branchList'
import branchAccountList from '@/components/branchAccount/branchAccountList'
import branchAllocationCar from '@/components/branch/branchAllocationCar'
import branchAllocationedList from '@/components/branch/branchAllocationedList'
import branchDealerList from '@/components/branch/branchDealerList'
import branchDetail from '@/components/branch/branchDetail'
import editBranch from '@/components/branch/editBranch'
import BDUserList from '@/components/branch/BDUserList'
import addBranch from '@/components/branch/addBranch'
import branchDealerCar from '@/components/branch/branchDealerCar'
import branchUserDetail from '@/components/branch/branchUserDetail'
import dealerList from '@/components/dealer/dealerList'
import addDealer from '@/components/dealer/addDealer'
import dealerAllocationCar from '@/components/dealer/dealerAllocationCar'
import dealerAllocationedList from '@/components/dealer/dealerAllocationedList'
import dealerReturn from '@/components/dealer/dealerReturn'
import dealerAccountList from '@/components/dealerAccount/dealerAccountList'

import carList from '@/components/car/carList'
import carSite from '@/components/car/carSite'
import allocatedCarList from '@/components/car/allocatedCarList'
import toBranchRentList from '@/components/car/toBranchRentList'
import goneBranchRentList from '@/components/car/goneBranchRentList'
import BranchReturn from '@/components/car/BranchReturn'
import operationCar from '@/components/car/operationCar'
import middleStatus from '@/components/car/middleStatus'
import roleList from '@/components/role/roleList'
import getResource from '@/components/role/getResource'
import resourceList from '@/components/resources/resourceList'
import resourceAdd from '@/components/resources/addResource'
// import exceit from '@/components/car/exceit'
import userList from '@/components/user/userList'
import userDetail from '@/components/user/userDetail'
import userReturn from '@/components/user/userReturn'
import accountList from '@/components/account/accountList'
// import questionList from '@/components/question/questionList'
import ownCarList from '@/components/dealerCar/ownCarList'
import noCarList from '@/components/dealerCar/noCarList'
import toUserRentList from '@/components/dealerCar/toUserRentList'
import goneUserRentList from '@/components/dealerCar/goneUserRentList'
import toDealerRentList from '@/components/branchCar/toDealerRentList'
import branchCarList from '@/components/branchCar/branchCarList'
import noBranchCarList from '@/components/branchCar/noBranchCarList'
import goneDealerRentList from '@/components/branchCar/goneDealerRentList'
import dealerReturnCars from '@/components/branchCar/dealerReturnCars'
import carTimeLine from '@/components/car/carTimeLine'
import maintenanceSiteList from '@/components/maintain/maintenance/maintenanceSiteList'
import addMaintenance from '@/components/maintain/maintenance/addMaintenance'
import editMaintenance from '@/components/maintain/maintenance/editMaintenance'
import allocationMaintainer from '@/components/maintain/maintenance/allocationMaintainer'
import allocationedMaintainer from '@/components/maintain/maintenance/allocationedMaintainer'
import workerRecord from '@/components/maintain/maintenance/workerRecord'
import relateDealer from '@/components/maintain/maintenance/relateDealer'
import maintenanceDetail from '@/components/maintain/maintenance/maintenanceDetail'
import branchMaintenance from '@/components/maintain/maintenance/branchMaintenance'

import maintainerList from '@/components/maintain/maintainer/maintainerList'
import maintainerDetail from '@/components/maintain/maintainer/maintainerDetail'
import maintenanceRecordList from '@/components/maintain/maintenanceRecord/maintenanceRecordList'
import faultCarList from '@/components/maintain/faultCar/faultCarList'
import maintainedList from '@/components/maintain/faultCar/maintainedList'
import assignFaultCar from '@/components/maintain/faultCar/assignFaultCar'
import faultTypeList from '@/components/faultType/faultTypeList'

import appTypeList from '@/components/app/appType/appTypeList'
import appVersionList from '@/components/app/appVersion/appVersionList'
import appStartList from '@/components/app/appStart/appStartList'
import addAppStart from '@/components/app/appStart/addAppStart'
import appGuideList from '@/components/app/appGuide/appGuideList'
import addAppGuide from '@/components/app/appGuide/addAppGuide'
import appRepairStartList from '@/components/app/appRepairStart/appRepairStartList'
import addRepairStart from '@/components/app/appRepairStart/addRepairStart'

import statisticsInfo from '@/components/statistics/statisticsInfo'
import statisticsCustomer from '@/components/statistics/statisticsCustomer'
import branchCustomer from '@/components/statistics/branchCustomer'
import dealerCustomer from '@/components/statistics/dealerCustomer'
import statisticsCar from '@/components/statistics/statisticsCar'
import middleList from '@/components/middleControl/middleList'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/statistics/info',
			name: 'statisticsInfo',
			component: statisticsInfo,
			meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
			children:[
				{
					path:'/branch/list',
					name:'branchList',
					component:branchList
				},
				{
					path:'/branch/account/list',
					name:'branchAccountList',
					component:branchAccountList
				},
				{
					path:'/branch/allocationCar/:id',
					name:'branchAllocationCar',
					component:branchAllocationCar
				},
				{
					path:'/branch/allocationed/list/:id',
					name:'branchAllocationedList',
					component:branchAllocationedList
				},
				{
					path:'/dealer/list',
					name:'dealerList',
					component:dealerList
				},
				{
					path:'/dealer/add',
					name:'addDealer',
					component:addDealer
				},
				{
					path:'/dealer/allocationCar/:branchId/:dealerId',
					name:'dealerAllocationCar',
					component:dealerAllocationCar
				},
				{
					path:'/car/list',
					name:'carList',
					component:carList
				},
				{
					path:'/car/site',
					name:'carSite',
					component:carSite
				},
				{
					path:'/car/timeline/:id',
					name:'carTimeLine',
					component:carTimeLine
				},
				{
					path:'/allocationed/car/list',
					name:'allocatedCarList',
					component:allocatedCarList
				},
				{
					path:'/tobranch/car/list',
					name:'toBranchRentList',
					component:toBranchRentList
				},
				{
					path:'/gonebranch/car/list',
					name:'goneBranchRentList',
					component:goneBranchRentList
				},
				{
					path:'/branch/car/list',
					name:'branchCarList',
					component:branchCarList
				},
				{
					path:'/nobranch/car/list',
					name:'noBranchCarList',
					component:noBranchCarList
				},
				{
					path:'/branch/returncars',
					name:'BranchReturn',
					component:BranchReturn
				},
				{
					path:'/operation/car',
					name:'operationCar',
					component:operationCar
				},
				{
					path:'/middle/status',
					name:'middleStatus',
					component:middleStatus
				},
				{
					path:'/role/list',
					name:'roleList',
					component:roleList
				},
				// {
				// 	path:'/exceit',
				// 	name:'exceit',
				// 	component:exceit
				// },
				{
					path:'/resource/list',
					name:'resourceList',
					component:resourceList
				},
				{
					path:'/resource/add',
					name:'resourceAdd',
					component:resourceAdd
				},
				{
					path:'/role/resource/:id',
					name:'getResource',
					component:getResource
				},
				{
					path:'/branch/dealer/list/:companyId',
					name:'branchDealerList',
					component:branchDealerList
				},
				{
					path:'/branch/detail/:companyId',
					name:'branchDetail',
					component:branchDetail
				},
				{
					path:'/branch/edit/:companyId',
					name:'editBranch',
					component:editBranch
				},
				{
					path:'/bduser/list/:companyId/:dealerId',
					name:'BDUserList',
					component:BDUserList
				},
				{
					path:'/add/branch',
					name:'addBranch',
					component:addBranch
				},
				{
					path:'/branch/dealer/car/:id',
					name:'branchDealerCar',
					component:branchDealerCar
				},
				{
					path:'/branch/user/detail/:id/:infoId',
					name:'branchUserDetail',
					component:branchUserDetail
				},
				{
					path:'/dealer/allocationed/list/:id',
					name:'dealerAllocationedList',
					component:dealerAllocationedList
				},
				{
					path:'/dealer/return/:id',
					name:'dealerReturn',
					component:dealerReturn
				},
				{
					path:'/dealer/account/list',
					name:'dealerAccountList',
					component:dealerAccountList
				},
				{
					path:'/user/list',
					name:'userList',
					component:userList
				},
				{
					path:'/user/detail/:id/:infoId',
					name:'userDetail',
					component:userDetail
				},
				{
					path:'/user/return/:id',
					name:'userReturn',
					component:userReturn
				},
				{
					path:'/account/list',
					name:'accountList',
					component:accountList
				},
				// {
				// 	path:'/question/list',
				// 	name:'questionList',
				// 	component:questionList
				// },
				{
					path:'/dealer/owncar/list',
					name:'ownCarList',
					component:ownCarList
				},
				{
					path:'/dealer/nocar/list',
					name:'noCarList',
					component:noCarList
				},
				{
					path:'/touser/rent/list',
					name:'toUserRentList',
					component:toUserRentList
				},
				{
					path:'/goneuser/rent/list',
					name:'goneUserRentList',
					component:goneUserRentList
				},
				{
					path:'/todealer/rent/list',
					name:'toDealerRentList',
					component:toDealerRentList
				},
				{
					path:'/gonedealer/rent/list',
					name:'goneDealerRentList',
					component:goneDealerRentList
				},
				{
					path:'/dealer/returncars',
					name:'dealerReturnCars',
					component:dealerReturnCars
				},
				{
					path:'/maintenance/list',
					name:'maintenanceSiteList',
					component:maintenanceSiteList
				},
				{
					path:'/branch/maintenance',
					name:'branchMaintenance',
					component:branchMaintenance
				},
				{
					path:'/maintenance/add',
					name:'addMaintenance',
					component:addMaintenance
				},
				{
					path:'/maintenance/edit/:id',
					name:'editMaintenance',
					component:editMaintenance
				},
				{
					path:'/worker/record/:id',
					name:'workerRecord',
					component:workerRecord
				},
				{
					path:'/relate/dealer/:id',
					name:'relateDealer',
					component:relateDealer
				},
				{
					path:'/maintenance/detail/:id',
					name:'maintenanceDetail',
					component:maintenanceDetail
				},
				{
					path:'/assign/fault/car/:id',
					name:'assignFaultCar',
					component:assignFaultCar
				},
				{
					path:'/allocation/maintainer/:id',
					name:'allocationMaintainer',
					component:allocationMaintainer
				},
				{
					path:'/allocationed/maintainer/:id',
					name:'allocationedMaintainer',
					component:allocationedMaintainer
				},
				{
					path:'/maintainer/list',
					name:'maintainerList',
					component:maintainerList
				},
				{
					path:'/maintainer/detail/:id',
					name:'maintainerDetail',
					component:maintainerDetail
				},
				{
					path:'/maintenance/record/list',
					name:'maintenanceRecordList',
					component:maintenanceRecordList
				},
				{
					path:'/fault/car/list',
					name:'faultCarList',
					component:faultCarList
				},
				{
					path:'/maintained/list',
					name:'maintainedList',
					component:maintainedList
				},
				{
					path:'/fault/type/list',
					name:'faultTypeList',
					component:faultTypeList
				},
				{
					path:'/apk/type/list',
					name:'appTypeList',
					component:appTypeList
				},
				{
					path:'/apk/version/list',
					name:'appVersionList',
					component:appVersionList
				},
				{
					path:'/apk/start/list',
					name:'appStartList',
					component:appStartList
				},
				{
					path:'/apk/start/add',
					name:'addAppStart',
					component:addAppStart
				},
				{
					path:'/apk/guide/list',
					name:'appGuideList',
					component:appGuideList
				},
				{
					path:'/apk/guide/add',
					name:'addAppGuide',
					component:addAppGuide
				},
				{
					path:'/apk/repair/list',
					name:'appRepairStartList',
					component:appRepairStartList
				},
				{
					path:'/apk/repair/add',
					name:'addRepairStart',
					component:addRepairStart
				},
				{
					path:'/statistics/car',
					name:'statisticsCar',
					component:statisticsCar
				},
				{
					path:'/statistics/customer',
					name:'statisticsCustomer',
					component:statisticsCustomer
				},
				{
					path:'/branch/customer',
					name:'branchCustomer',
					component:branchCustomer
				},{
					path:'/dealer/customer',
					name:'dealerCustomer',
					component:dealerCustomer
				},
				{
					path:'/middle/list',
					name:'middleList',
					component:middleList
				},
			]
		}
	]
})
