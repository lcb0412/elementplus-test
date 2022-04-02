<template>
    <div class="block_top">
        <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item v-for="item in 6" :key="item">
                <img src="../assets/1.svg" style="height: 100%;margin: 0 auto;display: block;" />
            </el-carousel-item>
        </el-carousel>
    </div>

    <div class="block_content">
        <el-row class="tac">
            <el-col :span="6">
                <el-menu
                    default-active="/user1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>用户列表</span>
                        </template>
                        <el-menu-item-group title="分组1">
                            <el-menu-item index="/user1" >
                                用户分类1
                            </el-menu-item>
                            <el-menu-item index="/user2" >
                                视频接口
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="/user3" >
                                笔记
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>其他用户</template>
                            <el-menu-item index="/userMore" >
                                其他用户1
                            </el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="features">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <span>功能</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>充值中心</span>
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>设置</span>
                    </el-menu-item>
                </el-menu>
            </el-col>

            <el-col :span="1" style="border-left: 1px solid var(--el-border-color)"></el-col>

            <el-col :span="16">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    style="justify-content: end;margin-bottom: 30px;"
                >
                    <el-menu-item index="1">{{ ausername ? ausername : '--' }}</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>{{ ausername ? '已登录' : '未登录' }}</template>
                        <el-menu-item index="2-1" @click="logout()">{{ ausername ? '退出' : '登录' }}</el-menu-item>
                        <el-menu-item index="2-2">个人资料</el-menu-item>
                        <el-menu-item index="2-3">个人资料</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>更多</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="3" disabled>充值</el-menu-item>
                </el-menu>

                
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>


<style scoped>
.block_top {
    margin: 30px auto;
}
.block_content {
    border-top: 1px solid var(--el-border-color);
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 350px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.el-menu-item>a{
    text-decoration: none;
}

</style>

<script  lang="ts">
export default {
    name: 'index',
};
</script>

<script setup lang="ts">
import { Location, Document, Menu as IconMenu, Setting, } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const router  = useRouter()
const ausername = sessionStorage.getItem('user')
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}





const logout = () =>{
    if(ausername){
        sessionStorage.clear()
        ElMessage({
            showClose: true,
            message: '退出成功',
            type: 'success',
        })
        setTimeout(() => {
            sessionStorage.clear()
            router.push({path:'/login'})
        }, 2000);
    }else{
        router.push({path:'/login'})
    }
}
</script>
