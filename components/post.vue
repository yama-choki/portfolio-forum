<template>
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

      <v-btn icon @click="postPage(index)" v-if="$store.state.login.user.userUid === post.postUser.userUid ">
        <v-icon>mdi-pencil-plus</v-icon>
      </v-btn>
      <v-spacer v-if="$store.state.login.user.userUid === post.postUser.userUid"/>

      <v-btn icon @click="deletePost(index)" v-if="$store.state.login.user.userUid === post.postUser.userUid ">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-spacer v-if="$store.state.login.user.userUid === post.postUser.userUid"/>
    </div>
    
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>