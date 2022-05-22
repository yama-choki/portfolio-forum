<template>
  <section id="profilePage">
    <v-app>
      <header>

        <v-app-bar
          color="#00cccc"
          dark
          shrink-on-scroll
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
          max-width="1263px"
          class="mx-auto"
          app
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, #00CCCC, rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-btn icon to="/">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <div class="profile">
            <img :src="user.userIcon" class="userIcon">
            <p class="userName">{{ user.userName }}</p>
          </div>

          <v-spacer />

          <v-btn icon v-if="user.snsAccount" :href="user.snsAccount" target=”_blank”>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>

          <UpdateProfile @getUser="getUser()" :user="user" v-if="user.userUid === $store.state.login.user.userUid"/>

          <Logout v-if="user.userUid === $store.state.login.user.userUid"/>

          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab @click="showMyPosts()">投稿</v-tab>
              <v-tab @click="showMyGoodPosts()">いいね</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
      </header>
      <section id="container">
        <aside class="leftAside my-0 py-0"></aside>
        <main>
          <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
          >
            <v-container style="height: 98.4vh;">
              <MyPosts v-show="show === 'myPosts'" />
              <MyGoodPosts v-show="show === 'myGoodPosts'" />
            </v-container>
          </v-sheet>
        </main>
        <aside class="rightAside my-0 py-0"></aside>
      </section>
    </v-app>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const usersRef = db.collection("users")

export default {
  async created () {
    await this.getUser()
  },
  data () {
    return {
      user: {},
      id: this.$route.params.id,
      show: 'myPosts'
    }
  },
  methods:{
    getUser(){
      usersRef.where('userUid', '==', this.id).get().then((res) => {
        res.forEach((x) => {
          this.user = x.data()
        })
      }).catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
    },
    showMyPosts(){
      this.show = 'myPosts' 
    },
    showMyGoodPosts(){
      this.show = 'myGoodPosts' 
    },
  }
}
</script>

<style scoped>
#profilePage{
  max-width: 1263px;
  margin: 0 auto;
}

.profile{
  display: flex;
}

.userIcon{
  border-radius: 50%;
  border: 2px #00CCCC solid;
  width: 54px;
}

.userName{
  margin: 8px 16px;
  display: none;
}

#container{
  display: flex;
}

main{
  max-width: 1263px;
  margin: 0 auto;
}

.leftAside{
  display: none;
  background: blue;
}

.rightAside{
  background: pink;
  display: none;
}

@media all and (min-width: 500px) {
  .leftAside{
    display: block;
    height: 100vh;
    width: 20vw;
  }

  .userName{
    display: block;
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


  main{
    margin-right: 0;
  }
}

</style>