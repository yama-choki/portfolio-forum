<template>
  <v-app>
    <body>
      <header>
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
        </v-app-bar>
      </header>
      <section id="container">
        <main></main>
      </section>      
    </body>
  </v-app>
</template>

<script>
export default {}
</script>

<style scoped>
body{
  max-width: 1263px;
  margin: 0 auto;
}
main{
  margin: 0 auto;
}
header{
  margin: 0 auto;
}

#container{
  margin-top: 64px;
  display:flex
}
</style>
