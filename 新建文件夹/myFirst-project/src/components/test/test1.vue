<template>
  <div class="test1">
    <h2>这是test1页面</h2>
    <h2>过滤器、属性计算、侦听器、路由跳转、路由传参</h2>
    <button @click="$router.go(-1)">返回上一个页面</button>
    <button @click="$router.push('test2')">跳转至test2页面</button>
    <!-- 过滤器filters -->
    <div class="exampleContainer">
      <p class="minTitle">过滤器filters------------</p>
      <p>过滤器输入值：<input type="number" v-model.number="filterVal"></p>
      <p>{{filterVal | filter1}}</p>
    </div>
    <!-- 数据绑定 -->
    <div class="exampleContainer">
      <p class="minTitle">数据绑定v-model:</p>
      <span>input-属性msg-：</span>
      <input v-model="msg" />
      <p>属性msg：{{msg}}</p>
    </div>
    <!-- 计算属性 -->
    <div class="exampleContainer">
      <p class="minTitle">计算属性computed:</p>
      <p>
        属性attrA：<input type="text" v-model="attrA">
      </p>
      <p>
        属性attrB：<input type="text" v-model="attrB">
      </p>
      <p>
        计算属性attrC：
        <span class="addBorder">{{attrC}}</span>

      </p>
    </div>
    <!-- 侦听器 -->
    <div class="exampleContainer">
      <p class="minTitle">侦听器watch:</p>
      <p>
        改变watchA<input type="text" v-model="watchA">
      </p>
      <p>
        watchA:变化前的值：{{watchANoChange}}
      </p>
      <p>
        变化后的值：{{watchAChanged}}
      </p>
      
    </div>  
    <p>msgComputed：{{msgComputed}}</p>

    <p>直接在html中计算：{{msg.split('').reverse().join('')}}</p>
    <p>侦听msg变化，变化前：{{oldMsg}}---变化后（当前值）：{{nowMsg}}</p>

    <p>计算属性nowMsgComputed --getter：{{nowMsgComputed}}</p>
    <p>计算属性nowMsgComputed --setter：{{setter}}</p>
    <input type="text" v-model="nowMsgComputed">
    <div>
      <button @click="clickToChangeSetter">clickToChangeSetter</button>
    </div>
    <div class="exampleContainer">
      <p class="minTitle">路由跳转方式：</p>
      <p>
        1、使用'<'router-link'><'/router-link'>'标签<br>
        <router-link :to="{path:'/test/test2'}">跳转到test2页面</router-link>
      </p>
      <p>
        2、js改变vue.$router<br>
        <button @click="$router.push('/home')">跳转至helloworld页面</button>
      </p>
      <p class="minTitle">路由跳转带参方式：</p>
      <p>
        <router-link :to="{name:'test3',params:{age:18}}">使用params方式带参跳转到test3</router-link>
      </p>

      <router-link :to="{name:'test3',query:{age:18}}">使用query方式带参跳转到test3</router-link>
      <p>HelloWorld跳转带过来的参数pageName：{{this.$route.query.pageName}}</p>
    </div>

  </div>
</template>
<script>
export default {
    name: "test1",
    data() {
        return {
            msg: "我是你大打野",
            oldMsg: "",
            nowMsg: "",
            setter: "",
            filterVal: "",
            attrA: 0,
            attrB: 0,
            watchA:'我是watchA',
            watchANoChange:'',
            watchAChanged:''
        };
    },
    //过滤器---定义过滤规则，多处使用
    filters: {
        filter1: function(value) {
            if (!value) return "";
            if (value > 5) return "大于五";
            if (value == 5) return "等于五";
            else return "小于五";
        },
        filter2: function(value) {
            return "";
        },
        filter3: function(value) {
            return "";
        }
    },
    //计算属性
    computed: {
        //计算属性默认只有 getter（一般省略不写） ，不过在需要时你也可以提供一个 setter ：
        //声明计算属性:function(){}  或者 声明计算属性:{ get:function(){},set:function(newValue){} }
        //计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
        msgComputed: function() {
            // `this` 指向 vue 实例对象
            // return '计算属性值哈哈哈'
            return this.msg.split("").reverse().join(""); //msg更新时msgComputed也会更新
        },
        // 现在再运行 this.nowMsgComputed = '新的值' 时，setter 会被调用,执行顺序setter -> getter -> updated
        // 并不是触发了setter也就会触发getter，他们两个是相互独立的，
        nowMsgComputed: {
            // getter
            get: function() {
                console.log("触发getter");
                return this.msg + "add"; //只有当this.msg变化时才会触发getter
            },
            // setter ---只有当this.nowMsgComputed 变化时才会触发setter，相关依赖（this.msg）发生改变时重新求值不会触发setter
            set: function(newValue) {
                console.log("触发setter");

                var setterVal = newValue.split("");
                this.setter = setterVal[setterVal.length - 1];
            }
        },
        attrC() {
            return parseInt(this.attrA) + parseInt(this.attrB);
        }
    },
    //侦听器，监听数据变化,变化时触发一个fn
    watch: {
        //val 改变后的值，即当前值
        //oldVal 改变前的值
        msg: function(val, oldVal) {
            console.log(val, oldVal);
            this.oldMsg = oldVal;
            this.nowMsg = val;
            this.nowMsgComputed = oldVal;
        },
        //要防止watch滥用，比如A + B = C，不必要分别侦听A、B变化来重新计算C,只需要 使用计算属性 computed 声明 C,减少重复代码
        //当需要在数据变化时执行异步请求或开销较大的操作时，最好使用watch自定义侦听。
        watchA:function(val,oldVal){
          this.watchANoChange = oldVal;
          this.watchAChanged = val;
        }
    },
    /******
  常用指令：
  v-text  --  更新元素的 textContent   用法: <span v-text="msg"></span>  和  <span>{{msg}}</span>  效果一样
  
  v-html  --  更新元素的 innerHTML 【内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译】 所以局部样式<style scoped>内的样式无法作用到
              新插入的HTML        用法：<div v-html="html"></div>   data(){ retrun { html:"<span>新插入的HTML</span>" }} 

  v-show  --  根据表达式之真假值，切换元素的 display CSS 属性。
              <span v-show="showFlag">点击我--touch</span>    data(){ retrun { showFlag:true }} 

  v-if    --  根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建，v-for优先级比v-if高

  v-else  --  前一兄弟元素必须有 v-if 或 v-else-if。
  v-else-if   前一兄弟元素必须有 v-if 或 v-else-if。

  v-for   --  循环遍历，遍历值可以为 Array | Object | number | string   <div v-for="(item, index) in items"></div>
                                                                      <div v-for="(val, key) in object"></div>
                                                                      <div v-for="(val, key, index) in object"></div>
              v-for 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素，你需要提供一个 key 的特殊属性
                                                            <div v-for="item in items" :key="item.id">
                                                              {{ item.text }}
                                                            </div>
  v-on    --  绑定事件监听器，例如点击事件v-on:click="alert('我被点击了')"  缩写 @click="绑定的Fn/js语句" 键盘事件 @keyup="Fn/js语句" 
              v-on="{ mousedown: doThis, mouseup: doThat }" 同时绑定多个事件
              事件修饰符：@click.stop="doFn" 阻止事件传播冒泡，@click.prevent="doFn" 阻止默认行为如a标签跳转 
              还有.self（只有绑定事件的元素本身能触发）等等修饰符--更多内容请参考https://cn.vuejs.org/v2/api/#v-on

  v-bind  --  缩写 : 绑定动态属性 <img v-bind:src="imageSrc"> 缩写 <img :src="imageSrc">

  v-model --  表单控件、组件双向绑定值，限制 <input>\<select>\<textarea>\components 可用。 例：<input v-model="msg">
              修饰符.lazy、.number(自动转数值类型)、.trim（过滤输入值首尾空白字符）
              例 <input v-model.lazy="msg">  在'change'（失去焦点时触发）时而非'input'（input值发生改变即触发）时更新msg值

  v-pre   --  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
              <span v-pre>{{此处双花括号不会被编译}}</span>

  v-cloak --  这个指令保持在元素上直到关联实例结束编译，配合[v-cloak]{display:none}隐藏未编译的标签直到实例准备完毕。编译完显示
  v-once  --  只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
   *******************/

    methods: {
        clickToChangeSetter: function() {
            this.nowMsgComputed = "nowMsgComputed被methods改变,set:会触发";
        }
    }
};
</script>
<style>
.test1 {
    text-align: left;
}
.exampleContainer {
    padding: 1rem 0;
}
.minTitle {
    color: red;
    font-weight: 600;
    font-size: 16px;
}
.addBorder {
    border: 1px solid #cccccc;
    display: inline;
    padding: 2px 5px;
}
</style>

