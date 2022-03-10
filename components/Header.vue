<template>
  <v-app-bar
    color="#00CCCC"
    dark
    max-width="1263px"
    app
  >
    <v-toolbar-title v-if="$store.state.login.user.userIcon">
      <img :src="$store.state.login.user.userIcon" class="userIcon mt-2">
    </v-toolbar-title>
    <v-toolbar-title class="ml-4">
      Port
    </v-toolbar-title>

    <v-spacer />
      <AddPost v-if ="$store.state.login.user.userName" /> 
      <Login v-else />
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

.userIcon{
  border-radius: 50%;
}
</style>