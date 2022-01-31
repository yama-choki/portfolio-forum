<template>
  <body>
    <section id="index">
      <v-app>
        <header>
          <Header />
        </header>
        <section id="container">
          <main>
            <Posts />
          </main>
        </section>      
      </v-app>
    </section>
  </body>
</template>

<script>
export default {}
</script>

<style scoped>
#index{
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
  display: flex;
}
</style>
