<template>
  <body>
    <section id="index">
      <v-app>
        <header>
          <Header />
        </header>
        <section id="container">
          <aside class="leftAside my-0 py-0 green accent-3"></aside>
          <main>
            <v-sheet
              id="scrolling-techniques-3"
              class="overflow-y-auto"
            >
              <v-container style="height: 98.4vh;">
                <Posts></Posts>
              </v-container>
            </v-sheet>
          </main>
          <aside class="rightAside my-0 py-0 lime accent-3"></aside>
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
  display: flex;
}

main{
  max-width: 640px;
}

.leftAside{
  display: none;
}

.rightAside{
  display: none;
}

@media all and (min-width: 500px) {
  .leftAside{
    display: block;
    height: 100vh;
    width: 20vw;
  }

  main{
    margin-right: 0;
  }
}


@media all and (min-width: 900px) {
  .leftAside{
    display: block;
    height: 100vh;
    width: 25vw;
  }

  .rightAside{
    display: block;
    height: 100vh;
    width: 25vw;
  }
}

</style>
