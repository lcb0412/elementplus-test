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
    password2: string
    email: string
    sex:string
}>({
    password: '',
    password2:'',
    email: '',
    sex:'',
})
const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '未知',
    label: '未知',
  },
]
//判断第二次输入密码
const checkpassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== dynamicValidateForm.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback()
  }
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ElMessage({
                showClose: true,
                message: '注册成功，即将跳转到登陆页',
                type: 'success',
            })
            setTimeout(() => {
                router.push({path:'/login'})
            }, 2000);
        } else {
            console.log('error submit!')
            return false
        }
    })
}

export default{
    formRef,dynamicValidateForm,options,checkpassword,submitForm
}