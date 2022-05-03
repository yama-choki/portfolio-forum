<template>
  <div id="myGoodPosts">
    <ul>
      <li v-for="(post, index) in myGoodPosts" :key="post.id">
        <v-col>
          <v-card class="pb-3 card">

            <div class="postTop mx-1 mt-1">
              {{post.category}}
              <v-spacer />
              {{ post.created.toDate() | dateFilter}}
            </div>

            <div class="user">
              <v-col cols="2" class="pr-0">
                <v-btn icon>
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
                <img src="/images/programming.png" alt="" v-if="post.category === 'Webアプリ'">
                <img src="/images/webDesign.png" alt="" v-else-if="post.category === 'Webデザイン'">
                <img src="/images/video_edit.jpg" alt="" v-else-if="post.category === '動画編集'">
                <img src="/images/illustration.jpg" alt="" v-else-if="post.category === 'イラスト'">
                <img src="/images/web_article.jpeg" alt="" v-else-if="post.category === '記事、ブログ'">
                <img src="/images/NoImage.png" alt="" v-else-if="post.category === 'その他'">
                <div class="portFolio-info">
                  <p>{{post.title}}</p>
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
        </v-col>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const postsRef = db.collection("posts");

export default {
  async created () {
    await this.getGoodPosts()
  },
    data () {
      return {
        id: this.$route.params.id,
        myGoodPosts:[]
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
      let substringTitle = title.substring(0, 11)
      return substringTitle + '...'
    }
  },
  methods:{
    getGoodPosts(){
      postsRef.where('good', 'array-contains-any', [this.id]).orderBy('created', 'desc').get().then((res) => {
        const posts = [];
        res.forEach((post) => {
          const data = post.data();
          posts.push({
            good: data.good,
            text: data.text,
            portfolioURL: data.portfolioURL,
            category: data.category,
            postUser: data.postUser,
            created: data.created,
            id: post.id,
            OGPImage:data.OGPImage,
            OGPTitle:data.OGPTitle,
          });
        });
        this.myGoodPosts = posts
      });
    },
    goodPost (index) {
      console.log('いいね機能')
      this.$store.dispatch('post/goodPost', index)
    },
    deletePost(index){
      console.log('投稿の削除')
      this.$store.dispatch('post/deletePost', this.myGoodPosts[index].id)
      this.getMyPosts()
    },
  }
}
</script>

<style scoped>
#myGoodPosts{
  margin: 224px auto 0 auto;
  width: 95vw;
  max-width: 600px;
}

#myGoodPosts ul {
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
  border-radius: 4px;
  text-align: left;
  border: 2px #00CCCC solid;
  display: flex;
  width: 94%;
}

.portFolio a{
  display:  flex;
}

.portFolio img{
  width: 96px;
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