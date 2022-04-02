<template>
    <div class="card_box" v-for="(i) in amdmsg">
        <el-card shadow="hover" >
             <v-md-editor :model-value="i" mode="preview" height="650px"></v-md-editor>
        </el-card>
    </div>

  <el-pagination background layout="prev, pager, next" :total="totalpage"  :page-size="showmsg" @next-click.stop="next" @prev-click.stop="last" @current-change="changecurr" :current-page="currpage" />

</template>


<script lang="ts" setup>
import {ref,reactive,onUpdated,computed} from 'vue'
import  mdtext  from './markdowntext'
let {markdown1,markdown2,markdown3,markdown4,markdown5} = mdtext
//笔记数据
let mdmsg = reactive([markdown1,markdown2,markdown3,markdown4,markdown5,'666','777'])
//总页数
const totalpage = ref(mdmsg.length)
//起始页
const currpage = ref(1)
//每页数据数量
const showmsg = ref(1)
let mdmsg2 = reactive([]) 
//计算每页显示哪些数据
const amdmsg = computed(() => {
     mdmsg2 = mdmsg.filter((val,index)=>index>=currpage.value*showmsg.value-showmsg.value&&index<=currpage.value*showmsg.value-1)
      return mdmsg2
})
//下一页
const next = () => {currpage.value++;console.log(currpage.value)}
// 上一页
const last = () => {currpage.value--;console.log(currpage.value)}
// 页码
const changecurr = (e) => {currpage.value = e;console.log(currpage.value)}
</script>

<style scoped>
    .card_box{
        margin: 30px auto;
    }
</style>