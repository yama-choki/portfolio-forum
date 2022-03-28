<template>
  <v-app>
    <section id="profilePage">
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
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <div class="profile">
            <img :src="user.userIcon" class="userIcon">
            <p class="userName">{{ user.userName }}</p>
          </div>

          <v-spacer />

          <v-btn icon v-if="user.snsAccount" :href="user.snsAccount">
            <v-icon color="00acee">mdi-twitter</v-icon>
          </v-btn>

          <UpdateProfile />

          <v-btn icon >
            <v-icon>mdi-logout</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab @click="showMyPosts()">投稿</v-tab>
              <v-tab @click="showMyGoodPosts()">いいね</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
      </header>

      <main>
        <v-row>

          <v-col
            xs="0"
            sm="0"
            md="3"
            class="leftAside my-0 py-0"
            >
            <v-container style="height:100vh; background-color:blue;"></v-container>
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
                <MyPosts v-show="show === 'myPosts'" />
                <MyGoodPosts v-show="show === 'myGoodPosts'" />
              </v-container>
            </v-sheet>
          </v-col>

          <v-col
            xs="0"
            sm="3"
            md="3"
            class="rightAside my-0 py-0">
            <v-container style="height:100vh; background-color:pink;">
              <p style="margin-top:300px;">{{user}}</p>
            </v-container>
          </v-col>

        </v-row>

      </main>
    </section>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const usersRef = db.collection("users")

export default {
  async created () {
    await this.getuser()
  },
  data () {
    return {
      user: {},
      id: this.$route.params.id,
      show: 'myPosts'
    }
  },
  methods:{
    getuser(){
      console.log('created getUser')
      console.log(this.id)
      usersRef.where('userUid', '==', this.id).get().then((res) => {
        console.log(res)
        res.forEach((x) => {
          console.log(x.data())
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
.profile{
  display: flex;
}

.userIcon{
  border-radius: 50%;
  border: 2px #00CCCC solid;
}

.userName{
  margin: 8px 16px;
}

main{
  max-width: 1263px;
  margin: 0 auto;
}

/* .leftAside{
  display: none;
}

.rightAside{
  display: none;
} */

</style>