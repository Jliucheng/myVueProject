<template>
  <div v-if="isLoginSuccess">
    <vLogin :isLoginSuccess="isLoginSuccess" />
  </div>
  <div v-else>
    <vInput />
  </div>
  
</template>
<script>
import vLogin from './components/vLogin.vue'
import vInput from './components/views/vIndex.vue'
export default {
  components: {
    vLogin, vInput
  },
  data() {
    return {
      isLoginSuccess: true
    }
  },
  methods: {
  },
}
</script>
<style>
</style>
