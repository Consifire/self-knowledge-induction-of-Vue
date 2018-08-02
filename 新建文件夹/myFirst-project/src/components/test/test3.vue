<template>
    <div class="test3">
        <button @click="goHome">跳转至Home</button>
       
        <router-link to="test1">路由跳转至test1</router-link>
        <button @click="goTo">路由跳转至test2</button>
        <p>test1页面跳转带过来的params参数age：{{this.$route.params.age}}</p>
        <p>test1页面跳转带过来的query参数age：{{this.$route.query.age}}</p>
        <h2>{{title}}</h2>
        <div class="pageTool">
            <span>当前页：<input type="text" v-model="currentOffset" > </span>
            <button @click="nextPage">下一页</button>
        </div>
        
        <div class="cmtsContainer">
            <div v-for="(item,index) in cmtsData " :key="item.id" class="dataList">
                {{index+1}}.【{{item.cityName}}】--{{item.content}}
                <div class="time">{{item.time}}</div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'test3',
    data(){
        return{
            title:'这是test3页面,使用axios',
            cmtsData:'',
            hcmtsData:'',
            currentOffset:1
        }
    },
    watch:{
        currentOffset:function(val,oldVal){
            console.log(val,oldVal);
            if (val!=oldVal) {
                this.getData();
            }
        }
    },
    mounted:function(){
      this.getData();
    },
    methods:{
        nextPage(){
            this.currentOffset ++ ;
        },
        getData(){
            let $this = this;
            this.$axios.get('rootUrl/248566.json?_v_=yes&offset='+this.currentOffset).then(function (response) {
                $this.cmtsData = response.data.cmts;
                $this.hcmtsData = response.data.cmts;
                
            }).catch(function (error) {
                console.log(error);//失败回调
            });
        },
        goTo(){
            this.$router.push({name:'test2',params:{id:123456}})
        },
        goHome(){
            this.$router.push({path:'/home',query:{id:654321}})
        }

    }

}
</script>
<style scoped>
    .dataList{
        padding: .1rem;
        text-align: left;
    }
    .time{
        text-align: right;
    }
    .pageTool span{
        display: inline-block;
        text-align: left;
        padding-right: .2rem;
    }
    .pageTool input{
        width: 2rem;
    }
    .pageTool button{
        border: 1px solid #ccc;
        border-radius: 20%;
        outline: none;
    }
</style>
