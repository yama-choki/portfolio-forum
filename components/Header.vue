<template>
  <v-app-bar
    color="#00CCCC"
    dark
    max-width="1263px"
    app
  >
    <v-toolbar-title>
      Port
    </v-toolbar-title>

    <v-spacer />
      <Login />
      <AddPost />
      <!-- <AddPost v-if="$store.state.userName" /> あとでこっちにする-->
  </v-app-bar>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>