<template>
  <div>
    <LogOutButton  />
    <LoginButton />
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton';
  import LogOutButton from '@/components/LogOutButton';

  export default {
    name: 'AuthenticationButton',
    components: { LogOutButton, LoginButton },
  };
</script>