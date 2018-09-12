<template>
    <Timeline>
        <TimelineItem>
            <p class="time">1976年</p>
            <p class="content">Apple I 问世</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">1984年</p>
            <p class="content">发布 Macintosh</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">2007年</p>
            <p class="content">发布 iPhone</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">2010年</p>
            <p class="content">发布 iPad</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">2011年10月5日</p>
            <p class="content">史蒂夫·乔布斯去世</p>
        </TimelineItem>
    </Timeline>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            list(){
                let _this=this;
                let req={
                    "companyId": this.$route.params.branchId,
                    "pageNum": this.pageData.pageCurrent,
                    "pageSize": this.pageData.pagesize,
                    "status": 1
                }
                this.$api.post("/vehicle/page",req,result=>{
                    if (result.code==0) {
                        var data  =  result.data.data 
                        if(_this.selectCar.length>0){
                            data.forEach( (obj) =>{
                                _this.selectCar.forEach((a)=>{
                                    var idx=0;
                                    if (obj.vehicleId==a) {
                                        obj._checked= true
                                    }
                                })
                            }) 
                        }
                        _this.data = data
                        _this.pageData.pageCount = result.data.totalPage
                        _this.pageData.pagesize = result.data.pageSize
                        _this.pageData.totalCount = result.data.totalCount
                        _this.pageshow = true                    
                    }else{
                        _this.$netcode.getApiCode(result)
                    }
                })
            },
        }
    }
</script>