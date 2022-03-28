<template>
  <div id="posts">
    <ul>
      <li v-for="(post, index) in posts" :key="post.id">
        <v-col>
          <v-card class="pb-4">

            <div class="postTop mx-1 mt-1">
              {{post.category}}
              <v-spacer />
              {{ post.created.toDate() | dateFilter}}
            </div>

            <div class="user">
              <v-col cols="2" class="pr-0">
                <v-btn icon @click="transition(index)">
                  <img :src="post.postUser.userIcon">
                </v-btn>
              </v-col>
              <v-col cols="10" class="pa-0 py-2">
                {{post.postUser.userName}}
              </v-col>
            </div>

            <div class="text mx-6">
              {{post.text}}
            </div>
              
            <div class="portFolio mx-auto mb-3">
              <a :href="post.portfolioURL">
                <img :src="post.OGPImage" alt="">
                <div class="link px-3">
                  <p>{{post.portfolioURL}}</p>
                  <p>{{post.OGPTitle}}</p>
                </div>
              </a>
            </div>

            <div class="functions mt-2" v-if="$store.state.login.user.userUid">
              <v-spacer />
              <div class="like" >
                <v-btn icon color="pink" @click="goodPost(index)" v-if="post.good.includes($store.state.login.user.userUid)">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon @click="goodPost(index)" v-else>
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <span>{{post.good.length}}</span>
              </div>
              <v-spacer />
              <v-btn icon @click="deletePost(index)" v-if="$store.state.login.user.userUid === post.postUser.userUid ">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-spacer v-if="$store.state.login.user.userUid === post.postUser.userUid"/>
            </div>

          </v-card>
        </v-col>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  async created () {
    await this.getPosts()
  },
  computed: {
    posts () {
      return this.$store.getters['post/posts']
    }
  },
  filters: {
    dateFilter: function(date){
      return moment(date).format('YYYY年MM月DD日 HH:mm')
    }
  },
  methods: {
    getPosts() {
      this.$store.dispatch("post/getPosts");
    },
    deletePost(index){
      this.$store.dispatch('post/deletePost', this.posts[index].id)
      console.log('投稿の削除')
    },
    goodPost (index) {
      console.log('good')
      this.$store.dispatch('post/goodPost', index)
    },
    transition(index) {
      const userUid = this.posts[index].postUser.userUid
      this.$router.push({ name: 'profile-id', params: { id : userUid } })
    },
  }
}
</script>

<style scoped>
#posts{
  margin: 0 auto;
  margin-top: 64px;
}

#posts ul {
  list-style: none;
  padding: 0;
}

.postTop{
  display: flex;
}

.user{
  display: flex;
  text-align: left;
  font-weight: bold;
  padding: 0;
  font-size: 16px;
  line-height: 20px;
}

.user img{
  width: 48px;
  border-radius: 50%;
  border: 2px #00CCCC solid;
}

.text{
  text-align: left;
}

.portFolio{
  width: 90%;
  border-radius: 16px;
  text-align: left;
  border: 2px #00CCCC solid;
}

.portFolio img{
  width: 100%;
  border-bottom: 2px #00CCCC solid;
  border-radius: 16px 16px 0 0;
}

.functions{
  display: flex;
}

</style>