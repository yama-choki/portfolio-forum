<template>
  <div id="posts" class="mt-16">
    <ul class="mb-4">
      <li v-for="(post, index) in posts" :key="post.id">
        <v-card class="pb-3">

          <div class="postTop mx-2 mt-1">
            {{post.category}}
            <v-spacer />
            {{ post.created.toDate() | dateFilter}}
          </div>

          <div class="user ma-3">
              <v-btn icon @click="profilePage(index)">
                <img :src="post.postUser.userIcon">
              </v-btn>
              <p class="ml-3">
                {{post.postUser.userName}}
              </p>
          </div>

          <div class="text mx-6">
            {{post.text}}
          </div>
            
          <div class="portFolio mx-auto mb-3">
            <a :href="post.portfolioURL">
              <div class="images">
                <img src="/images/programming.png" alt="" v-if="post.category === 'Webアプリ'" class="webApp">
                <img src="/images/webDesign.png" alt="" v-else-if="post.category === 'Webデザイン'" class="webDesign">
                <img src="/images/video_edit.jpg" alt="" v-else-if="post.category === '動画編集'" class="videoEdit">
                <img src="/images/illustration.jpg" alt="" v-else-if="post.category === 'イラスト'" class="illust">
                <img src="/images/web_article.jpeg" alt="" v-else-if="post.category === '記事、ブログ'" class="article">
                <img src="/images/NoImage.png" alt="" v-else-if="post.category === 'その他'" class="noImage">
              </div>
              <div class="portFolio-info">
                <p>{{post.title  | titleFilter}}</p>
                <p>{{post.portfolioURL | urlFilter }}</p>
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
    },
    urlFilter: function(portfolioURL){
      let substringUrl = portfolioURL.substring(0, 28)
      return substringUrl + '...'
    },
    titleFilter: function(title){
      if(title.length >= 13){
        let substringTitle = title.substring(0, 13)
        return substringTitle + '...'
      } else {
        return title
      }
    }
  },
  methods: {
    getPosts() {
      this.$store.dispatch("post/getPosts");
    },
    deletePost(index){
      this.$store.dispatch('post/deletePost', this.posts[index].id)
    },
    goodPost (index) {
      const post = this.posts[index]
      this.$store.dispatch('post/goodPost', post)
    },
    profilePage(index) {
      const userUid = this.posts[index].postUser.userUid
      this.$router.push({ name: 'profile-id', params: { id : userUid } })
    },
    postPage(index) {
      const postId = this.posts[index].id
      this.$router.push({ name: 'post-id', params: { id : postId } })
    },
  }
}
</script>

<style scoped>
#posts{
  margin: 224px auto 0 auto;
  width: 93vw;
  max-width: 600px;
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
  white-space: pre-line;
}

.portFolio{
  border-radius: 4px;
  text-align: left;
  border: 2px #00CCCC solid;
  display: flex;
  width: 94%;
}

.portFolio a{
  display:  flex;
  align-items: center;
}

.images{
  width: 80px;
  height: 80px;
  align-items: center;
}

.images img {
  width: 64px;
  height: 64px;
  margin: 8px;
}

.functions{
  display: flex;
}

@media all and (min-width: 500px) {
  #posts{
    width: 70vw;
  }
}

@media all and (min-width: 900px) {
  #posts{
    width: 70vw;
  }
}

</style>