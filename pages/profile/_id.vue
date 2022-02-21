<template>
  <v-app>
    <section>
      <h1>{{ message }}</h1>
      <p>id: {{ this.$route.params.id }}</p>
    </section>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      message: 'profile/_idを表示'
    }
  }
}
</script>

<style>

</style>