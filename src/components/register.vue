<template>
    <div class="index">
        <el-form
            ref="formRef"
            :model="dynamicValidateForm"
            label-width="80px"
            class="demo-dynamic"
            label-position="left"
        >
            <el-form-item
                prop="email"
                label="用户名"
                :rules="[
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱',
                        trigger: ['blur', 'change'],
                    },
                ]"
            >
                <el-input v-model="dynamicValidateForm.email" clearable />
            </el-form-item>
            <el-form-item
                prop="password"
                label="密码"
                :rules="[
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                    },
                    {
                        min: 6,
                        max: 13,
                        message: '密码长度需为6-13位',
                        trigger: 'blur',
                    },
                ]"
            >
                <el-input
                    v-model="dynamicValidateForm.password"
                    type="password"
                    show-password
                    clearable
                />
            </el-form-item>
            <el-form-item
                prop="password2"
                label="确认密码"
                :rules="[
                    {
                        validator: checkpassword,
                        trigger: 'blur',
                    },
                ]"
            >
                <el-input
                    v-model="dynamicValidateForm.password2"
                    type="password"
                    show-password
                    clearable
                />
            </el-form-item>
            <el-form-item
                prop="sex"
                label="性别"
                :rules="[
                    {
                        required: true,
                        message: '请选择性别',
                        trigger: 'blur',
                    },
                ]"
            >
                <el-select
                    v-model="dynamicValidateForm.sex"
                    class="m-2"
                    placeholder="请选择性别"
                    size="large"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">注册</el-button>
            </el-form-item>
            <el-link type="primary" @click="$router.push({ path: '/login' })">去登录</el-link>
        </el-form>
    </div>
</template>


<script lang="ts" setup>
import aregister from '../utils/register'
const { formRef, dynamicValidateForm, options, checkpassword, submitForm } = aregister
</script>


<style lang="less" scoped>
.index {
    width: 400px;
    margin: 200px auto;
    // box-shadow: 0 0 4px 3px rgb(228, 225, 225);
    box-shadow: var(--el-box-shadow);
    padding: 100px;
    border-radius: 30px;
}
</style>