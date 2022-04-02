<template>
    <div class="flex">
        <el-button type="primary" :icon="Search" @click="getmsg()">获取数据</el-button>
        <el-table :data="msg"  style="width: 100%" class="table_box" height="450" :row-style="{height:'300px'}">
            <el-table-column prop="title" label="标题" width="350"  />
            <el-table-column prop="description" label="概述" width="550" />
            <el-table-column label="封面" width="380" prop  >
                <template #default="scope">
                    <el-image
                        :src="scope.row?.cover.detail"
                        fit="cover"
                        :preview-src-list="[scope.row?.cover.detail]"
                        :hide-on-click-modal="true"
                        class="testimg"
                        
                    />
                </template>
            </el-table-column>
            <el-table-column prop="category" label="类型" width="180" />
            <el-table-column label="视频" width="280" prop>
                <template #default="scope">
                    <video
                        :src="scope.row?.playUrl"
                        style="width: 250px;height: 100px;"
                        controls
                    ></video>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import axios from 'axios'
import { reactive } from 'vue'
import { ElLoading } from 'element-plus'
let msg = reactive([])
const getmsg = () => {
    const loadingInstance = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      // background: 'rgba(0, 0, 0, 0.3)',
    })
    console.log('getmsg')
    axios.get('https://api.apiopen.top/todayVideo').then((res) => {
        // console.log(res.data.result)
        res.data.result = res.data.result.filter((val, index) => index >= 5)
        console.log(res.data.result[0].data.content.data)
        // msg = res.data.result
        for (let i = 0; i < res.data.result.length; i++) {
            msg.push(res.data?.result[i]?.data.content?.data)
        }
        console.log(msg)
        loadingInstance.close()

    }).catch((err) => {
        console.log(err)
        loadingInstance.close()
    })
}


</script>

<style lang="less" >
.table_box {
    margin: 30px auto;
}
.el-carousel__container{
    z-index: 1;
}
.testimg{
    z-index: 9999;
}

</style>
