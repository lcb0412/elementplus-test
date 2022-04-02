
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
// useRoute, useRouter必须写到setup中，若强行写在hooks函数中就会undefined，获取不到对应的方法，但是想要在自定义的hooks中使用路由方法如下：
import Vrouter from "@/router"
const route = Vrouter.currentRoute.value
const router = Vrouter
//********************* */
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
    password: string
    email: string
}>({
    password: '',
    email: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('email', dynamicValidateForm.email)
            console.log('password', dynamicValidateForm.password)
            ElMessage({
                showClose: true,
                message: '登陆成功',
                type: 'success',
            })
            setTimeout(() => {
                sessionStorage.setItem('user',dynamicValidateForm.email)
                sessionStorage.setItem('islogin','true')
                router.push({path:'/user1',query:{id: dynamicValidateForm.email}})
            }, 2000);
        } else {
            console.log('error submit!')
            return false
        }
    })
}

export default {
    formRef,dynamicValidateForm,submitForm
}

