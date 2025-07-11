<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';

  import { formSchema } from './pwd.data';
  import { changePassword } from '@/api/demo/system';
  import { useUserStore } from '@/store/modules/user';
  // import { useRouter } from 'vue-router';
  // const router = useRouter();
  defineOptions({ name: 'ChangePassword' });

  const userStore = useUserStore();

  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
  });

  // async function handleSubmit() {
  //   try {
  //     const values = await validate();
  //     const { passwordOld, passwordNew } = values;

  //     // TODO custom api
  //     console.log(passwordOld, passwordNew);
  //     // const { router } = useRouter();
  //     // router.push(pageEnum.BASE_LOGIN);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  async function handleSubmit() {
    try {
      const values = await validate();
      const { passwordOld, passwordNew } = values;
      const res = await changePassword({
        oldPassword: passwordOld,
        newPassword: passwordNew,
      });
      console.log(res);
      // 成功提示
      userStore.logout();
    } catch (error) {
      // 错误提示
      console.error(error);
    }
  }
</script>
