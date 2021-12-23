<template>
  <div>
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
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>