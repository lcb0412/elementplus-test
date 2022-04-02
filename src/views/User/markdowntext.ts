const a = '```'
const b = 'js'
let markdown1 = `### 多个异步方法同步执行
*  **想要多个异步方法将上一个异步方法执行结果做为下一个异步方法的参数**
    * **异步方法1**
    ${a}${b}
    const p1 = function (t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            t+=1
            console.log(t)
            resolve(t)
        }, 1000);
    })
    ${a}
    * **异步方法2**
    ${a}${b}
    const p2 = function (t) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                t+=2
                console.log(t)
                resolve(t)
            }, 500);
        })
    }
    ${a}
   * **异步方法3**
    ${a}${b}
    const p3 = function (t) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                t+=3
                console.log(t)
                resolve(t)
            }, 100);
        })
    }
    ${a}
* **...fns--p1,p2,p3**
    ${a}${b}
    const pipefunction = (...fns) => {
    return fns.reduce((last, curr) => {
        //reduce的last参数为上一次的结果，所以需要return一个函数做为下一次执行时的参数
        return async (...args) => {
           //async异步执行，等待上一次执行结果**
            const res = await last(...args)
            //返回当前执行结果
            return curr(res)
        }
    })
    }
    ${a}
  * **将异步方法塞入管道函数**
${a}${b}
const fun = pipefunction(
     p2,p3,p1
)
fun(1)
}
${a}`

let markdown2= `### const { xxx } 的理解
* 
    ${a}${b}
    const { abc } = res.data 等同于 const abc = res.data.abc
    ${a}
***********************
### export export default 和 import xxx import { xxx } 的区别
* **export {} 可以使用一个或多个**
    1. 使用export {} 导出，在别的页面import时，需要写出export出的变量名或方法名
    2. 并使用{}对名称进行解构赋值
    ${a}${b}
    //a.js
    a:function(){
        console.log(111)
    }
    export { a }
    c:function(){
        console.log(222)
    }
    export { c }
    ${a}
    ${a}${b}
    //a.vue
    import { a,c } from a.js
    a()
    c()
    ${a}
* **export default 只能使用一个**
    1. 使用export default {} 导出，在别的页面import时，可以任意指定import的名称
    2. 无需使用{}
    ${a}${b}
    //b.js
    b:function(){
        console.log(111)
    }
    export default { b }
    ${a}
    ${a}${b}
    //b.vue
    import abc from b.js
    abc.b()
    ${a}

`



let markdown3 = `
### JS执行机制
* JS是单线程
* 同步任务：指排队在主线程上依次执行的任务
* 异步任务：不进入主线程，而进入任务队列的任务，又分为宏任务和微任务
* 宏任务： 渲染事件、请求、script、setTimeout、setInterval、Node中的setImmediate 等
* 微任务： Promise.then、MutationObserver(监听DOM)、Node 中的 Process.nextTick等
    * 顺序
    ${a}${b}
        清空（执行）主线程中的所有同步任务 --> 清空（执行）主线程中所有微任务 --> 
        执行其他宏任务 --> 清空（执行）该宏任务中的所有同步任务 --> 清空（执行）该宏任务中所有微任务 --> 
        执行下一个宏任务 -->
        重复执行此操作
    ${a}
    * 示例
    ${a}${b}
        console.log('1');
 
        setTimeout(function() {
            console.log('2');
            process.nextTick(function() {
                console.log('3');
            })
            new Promise(function(resolve) {
                console.log('4');
                resolve();
            }).then(function() {
                console.log('5')
            })
        })
        process.nextTick(function() {
            console.log('6');
        })
        new Promise(function(resolve) {
            console.log('7');
            resolve();
        }).then(function() {
            console.log('8')
        })
        
        setTimeout(function() {
            console.log('9');
            process.nextTick(function() {
                console.log('10');
            })
            new Promise(function(resolve) {
                console.log('11');
                resolve();
            }).then(function() {
                console.log('12')
            })
        })
    ${a}
    * 过程
    ${a}${b}
        console.log('1');//事件循环1-同步，直接输出1
 
        setTimeout(function() {//事件循环1-宏任务1
            console.log('2');//事件循环2-同步，直接输出2
            process.nextTick(function() {//事件循环2-微任务1
                console.log('3');
            })
            new Promise(function(resolve) {//事件循环2-同步，直接输出2，4
                console.log('4');
                resolve();
            }).then(function() {//事件循环2-微任务2
                console.log('5')
            })
        })
        process.nextTick(function() {//微任务1
            console.log('6');
        })
        //把Promise和Promise.then看成两个部分，且在同一次事件循环中
        new Promise(function(resolve) {
            console.log('7');//事件循环1-同步，输出 1，7
            resolve();
        }).then(function() {
            console.log('8')//事件循环1-微任务2
        })
        
        setTimeout(function() {//事件循环1-宏任务2
            console.log('9');//事件循环3-同步输出9
            process.nextTick(function() {//事件循环3-微任务1
                console.log('10');
            })
            new Promise(function(resolve) {
                console.log('11');//事件循环3-同步输出9，11
                resolve();
            }).then(function() {//事件循环3-微任务2
                console.log('12')
            })
        })
        //执行第一轮事件循环
        //第一轮事件循环结束--输出同步1，7
        //执行第一轮中的微任务1，微任务2--结果--1，7，6，8
        //执行第二轮事件循环
        //执行宏任务1
        //第二轮事件循环结束--输出同步2，4
        //执行第二轮中的微任务1，微任务2--结果--2，4，3，5
        //执行第三轮事件循环
        //执行宏任务2
        //第三轮事件循环结束--输出同步9，11
        //执行第三轮中的微任务1，微任务2--结果--9，11，10，12
    ${a}
    * 结果
    ${a}${b}
    1，7，6，8，2，4，3，5，9，11，10，12
    ${a}
    `

let markdown4 = `
### JS常用数组方法
#### concat()
* concat() 方法用于连接两个或多个数组。
* ***该方法不会改变现有的数组，仅会返回被连接数组的一个副本。***     
${a}${b}    
var arr1 = [1,2,3];
var arr2 = [4,5];
var arr3 = arr1.concat(arr2);
console.log(arr1); //[1, 2, 3]
console.log(arr3); //[1, 2, 3, 4, 5]
${a}
#### join()
* join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的，默认使用','号分割
* ***不改变原数组。***
${a}${b}
var arr = [2,3,4];
console.log(arr.join());  //2,3,4
console.log(arr.join(''));  //234
console.log(arr);  //[2, 3, 4]
${a}  
#### push()
* push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。末尾添加
* ***返回的是长度，会改变原数组***
${a}${b}
var a = [2,3,4];
var b = a.push(5);
console.log(a);  //[2,3,4,5]
console.log(b);  //4
push方法可以一次添加多个元素push(data1,data2....)
${a}  
#### pop()
* pop() 方法用于删除并返回数组的最后一个元素。
* ***返回最后一个元素，会改变原数组。***
${a}${b}
var arr = [2,3,4];
console.log(arr.pop()); //4
console.log(arr);  //[2,3]
${a}  
#### shift()
* shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
* ***返回第一个元素，改变原数组。***
${a}${b}
var arr = [2,3,4];
console.log(arr.shift()); //2
console.log(arr);  //[3,4]
${a}  
#### unshift()
* unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
* ***返回新长度，改变原数组。***
${a}${b}
var arr = [2,3,4,5];
console.log(arr.unshift(3,6)); //6
console.log(arr); //[3, 6, 2, 3, 4, 5]
${a}  
#### slice()
* 返回一个新的数组，包含从 start 到 end （不包括该元素,即start<=x<end）的 arrayObject 中的元素。
* ***返回选定的元素，该方法不会修改原数组。***
${a}${b}
var arr = [2,3,4,5];
console.log(arr.slice(1,3));  //[3,4]
console.log(arr);  //[2,3,4,5]
${a}  
#### splice()
* splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
* ***splice() 方法会直接对数组进行修改。***
${a}${b}
var a = [5,6,7,8];
console.log(a.splice(1,0,9)); //[]
//在下标1，也就是从6开始（包含6），删除0位，替换为9
console.log(a);  // [5, 9, 6, 7, 8]
var b = [5,6,7,8];
console.log(b.splice(1,2,3));  //[6, 7]
console.log(b); //[5, 3, 8]
${a}
* ***for循环中正序遍历数组调用splice()删除数组会出现结果有误***
    * 因为splice()方法会修改原数组，导致下标发生改变
    * 解决方法：
        1. 倒序遍历数组
        2. 删除后，对循环的flag-i，进行i--;
    * --
#### sort()
* 按照 Unicode code 位置排序，默认升序
* ***调用就修改原数组。***
${a}${b}
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort(); // ['apples', 'bananas', 'cherries']
var scores = [1, 10, 21, 2];
scores.sort(); // [1, 10, 2, 21]
${a}  
#### reverse()
* reverse() 方法用于颠倒数组中元素的顺序。
* ***返回的是颠倒后的数组，会改变原数组。***
${a}${b}
var arr = [2,3,4];
console.log(arr.reverse()); //[4, 3, 2]
console.log(arr);  //[4, 3, 2]
${a}  
#### indexOf 和 lastIndexOf
* 都接受两个参数：查找的值、查找起始位置
不存在，返回 -1 ；存在，返回位置。indexOf 是从前往后查找， lastIndexOf 是从后往前查找。
${a}${b}   
//indexOf
var a = [2, 9, 9];
a.indexOf(2); // 0
a.indexOf(7); // -1    
if (a.indexOf(7) === -1) {
// element doesn't exist in array
}

//lastIndexOf
var numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2);     // 3
numbers.lastIndexOf(7);     // -1
numbers.lastIndexOf(2, 3);  // 3
numbers.lastIndexOf(9, 1);  //-1
numbers.lastIndexOf(2, -2); // 0
numbers.lastIndexOf(2, -1); // 3
${a}
#### includes()
* 判断数组中是否存在该元素，参数：查找的值、起始位置，可以替换 ES5 时代的 indexOf 判断方式。indexOf 判断元素是否为 NaN，会判断错误。
${a}${b}
var a = [1, 2, 3];
a.includes(2); // true
a.includes(4); // false
${a}



#### every()
* 对数组的每一项都运行给定的函数，每一项都返回 ture,则返回 true
${a}${b}
function isBigEnough(element, index, array) {
    return element < 10;
}    
[2, 5, 8, 3, 4].every(isBigEnough);   // true
${a}  
#### some()
* 对数组的每一项都运行给定的函数，任意一项都返回 ture,则返回 true
${a}${b}
function compare(element, index, array) {
    return element > 10;
}    
[2, 5, 8, 1, 4].some(compare);  // false
[12, 5, 8, 1, 4].some(compare); // true
${a}  
#### filter()
* 对数组的每一项都运行给定的函数，返回 结果为 ture 的项组成的数组
${a}${b}
var words = ["spray", "limit", "elite", "exuberant", "destruction", "present", "happy"];
var longWords = words.filter(function(word){
return word.length > 6;
});
// longWords is ["exuberant", "destruction", "present"]
${a} 
#### forEach 数组遍历
* forEach()允许callback更改原始数组的元素。但不会返回数据，返回undefined
* ***使用场景：并不打算改变数据的时候，而只是想用数据做一些事情 ，比如存入数据库或则打印出来。***
${a}${b}
var arr1 = [0,2,4,6,8];
var newArr1 = arr1.forEach(function(item,index,arr1){
arr1[index] = item/2; 
});
console.log(arr1);//[0, 1, 2, 3, 4]
console.log(newArr1);//undefined
${a} 
#### map()
* 对数组的每一项都运行给定的函数，返回每次函数调用的结果组成一个新数组
* ***使用场景：map()适用于你要改变数据值的时候。不仅仅在于它更快，而且返回一个新的数组***
${a}${b}
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(function(x) {
return x * 2;
});
// doubles [2, 10, 20, 30]
// numbers  [1, 5, 10, 15]
${a} 

#### find()
* 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。
${a}${b}
const arr = [1, "2", 3, 3, "2"]
console.log(arr.find(n => typeof n === "number")) // 1
${a} 

#### findIndex()
* 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索。
${a}${b}
const arr = [1, "2", 3, 3, "2"]
console.log(arr.findIndex(n => typeof n === "number")) // 0
${a} 
#### fill()
* 用新元素替换掉数组内的元素，可以指定替换下标范围。
* arr.fill(value, start, end) (start <= x < end)
${a}${b}
const arr = [1,2,2,6,5]
arr.fill(3,1,3) //[1, 3, 3, 6, 5]
${a} 
#### from()
* 将类似数组的对象（array-like object）和可遍历（iterable）的对象转为真正的数组
* 字符串转数组
* Number不能转
${a}${b}
const bar = ["a", "b", "c"];
Array.from(bar);
// ["a", "b", "c"]
Array.from('foo');
// ["f", "o", "o"]
${a}
`

let markdown5 = `
### Vue中的nextTick
#### nextTick
    获取更新后的DOM元素
    应用场景：需要在视图更新之后，基于新的视图进行操作。

#### 需要注意的是，在 created 和 mounted 阶段，如果需要操作渲染后的视图，也要使用 nextTick 方法。

    官方文档说明：
    注意 mounted 不会承诺所有的子组件也都一起被挂载。
    如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted

${a}${b}
    mounted: function () {
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered
        })
    }
${a}
#### 使用场景
${a}${b}
    <div id="app">
    <p ref="myWidth" v-if="showMe">{{ message }}</p>
    <button @click="getMyWidth">获取p元素宽度</button>
    </div>

    getMyWidth() {
        this.showMe = true;
        //this.message = this.$refs.myWidth.offsetWidth;
        //报错 TypeError: this.$refs.myWidth is undefined
        this.$nextTick(()=>{
            //dom元素更新后执行，此时能拿到p元素的属性
            this.message = this.$refs.myWidth.offsetWidth;
    })
    }
${a}
### Vue3中    
${a}${b}
    //引入
    import { nextTick } from 'vue'
        //具体使用，配合异步
        setup() {
            const message = ref('Hello!')
            const changeMessage = async newMessage => {
                message.value = newMessage
                await nextTick()
                console.log('Now DOM is updated')
            }
        }
${a}
${a}${b}
    //引入
    import { nextTick } from 'vue'
        //具体使用，普通
        setup () {    
            let otherParam = reactive({
                showA:false
            })
        nextTick(()=>{
            otherParam.showA = true
        })
        return {
            otherParam
        }
    }
${a}
`
export default { markdown1,markdown2,markdown3,markdown4,markdown5}