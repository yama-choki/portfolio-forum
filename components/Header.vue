<template>
  <v-app-bar
    color="#00CCCC"
    dark
    max-width="1263px"
    app
  >
    <v-toolbar-title v-if="$store.state.login.user.userIcon">
      <v-btn icon  @click="transition()">
        <v-img :src="$store.state.login.user.userIcon" class="userIcon"></v-img>
      </v-btn>
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
  computed :{
    user () {
      return this.$store.getters['login/user']
    }
  },
  methods: {
    transition() {
      this.$router.push({ name: 'profile-id', params: { id : this.user.userUid } })
    },
  }

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