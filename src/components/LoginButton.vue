<template>
  <button
    class="btn btn-primary btn-block"
    v-if="!$auth.isAuthenticated"
    @click="login"
  >
    Log In
  </button>
</template>

<script>
  export default {
    name: 'LoginButton',
    methods: {
      login() {
        this.$auth.loginWithRedirect( { returnTo: 'http://localhost:8086/admin-panel'});
        this.$router.push({ path: '/admin-panel' });
      },
    },
  };
</script>