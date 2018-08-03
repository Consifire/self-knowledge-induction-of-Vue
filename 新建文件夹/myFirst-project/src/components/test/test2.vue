<template>
    <div class='customComponent'>
        <h2>test2页面--生命周期钩子函数</h2>
        <button @click="$router.go(-1)">返回上一个页面</button>
        <router-link to="/home">跳转至Helloworld</router-link>
        <div class="exampleContainer">

        </div>
    </div>
</template>
<script>
export default {
    name:'test2',
    data(){
        return{

        }
    },
    beforeCreate:function(){
        console.log('beforeCreate')
    },
    //在beforeCreate和created之间，进行数据观测(data observer) ，也就是在这个时候开始监控data中的数据变化了，同时初始化事件
    created:function(){
        console.log('created')

    },
    /*** created 到  beforeMount 之间 */

    //首先系统会判断对象中有没有el选项
    //有el选项，则继续编译过程
    //没有el选项，则停止编译，也意味着暂时停止了生命周期，直到手动执行vm.$mount(el),添加el

    // 1.如果Vue实例对象中有template参数选项，则将其作为模板编译成render函数
    // 2.如果没有template参数选项，则将外部的HTML作为模板编译（template），也就是说，template参数选项的优先级要比外部的HTML高
    // 3.如果1,2条件都不具备，则报错
    beforeMount:function(){
        console.log('beforeMount')

    },
    mounted:function(){
        console.log('mounted')

    },
    beforeUpdate:function(){
        console.log('beforeUpdate')

    },
    updated:function(){
        console.log('updated')
        console.log("1==我会先执行");
        //DOM 还没更新
        this.$nextTick(function(){
            //DOM 更新了,DOM更新完即会调用
            //在下次 DOM 更新循环结束之后执行这个回调。在修改数据之后立即使用这个方法，获取更新后的DOM.
            console.log("3==我只能等页面渲染完了才会立即执行");
        })
        console.log("2==我虽然在最后但会比$nextTick先执行")

    },
    //组件移除前
    beforeDestroy:function(){
        console.log('beforeDestroy')

    },
    destroyed:function(){
        console.log('destroyed')

    },
    activated:function(){
        console.log('activated')

    },
    deactivated:function(){
        console.log('deactivated')

    }

}
</script>
<style scoped>
    h2{
        color: red;
    }
</style>
