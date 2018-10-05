<template>
  <div id="connect">
    <AuthorizeAccount></AuthorizeAccount>
  </div>
</template>

<script>
import AuthorizeAccount from '@/components/AuthorizeAccount.vue'

export default {
  name: 'connect',
  components: {
    AuthorizeAccount
  }
}
</script>

<style lang="scss" scoped>
  #connect {
    width: 90%;
    max-width: 1024px;
    margin: 3em auto 1em;
  }
</style>
