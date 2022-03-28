<template>
  <body>
    <section id="index">
      <v-app>
        <header>
          <Header />
        </header>
        <section id="container">
          <main>
            <v-row>
              <v-col
                xs="0"
                sm="0"
                md="3"
                class="leftAside my-0 py-0"
                >
                <v-container style="height:100vh; background-color:blue;">
                  <p style="margin-top:300px;"></p>
                </v-container>
              </v-col>
              <v-col
                xs="12"
                sm="9"
                md="6"
                class="my-0 py-0">
                <v-sheet
                  id="scrolling-techniques-3"
                  class="overflow-y-auto"
                >
                  <v-container style="height: 100vh;">
                   <Posts></Posts>
                  </v-container>
                </v-sheet>
              </v-col>

              <v-col
                xs="0"
                sm="3"
                md="3"
                class="rightAside my-0 py-0">
                <v-container style="height:100vh; background-color:pink;">
                  
                </v-container>
              </v-col>
            </v-row>
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

/* .leftAside{
  display: none;
}

.rightAside{
  display: none;
} */
</style>
