<template>
  <v-app>
    <body>
      <header>
        <Header />
      </header>
      <section id="container">
        <main>
          {{$store.state}}
        </main>
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
