<template>
  <section id="profilePage">
    <v-app>
      <header>
        <v-app-bar
            color="#00CCCC"
            dark
            max-width="1263px"
            app
          >
          <v-toolbar-title v-if="$store.state.login.user.userIcon">
            <v-btn icon  @click="transition()">
              <v-img :src="$store.state.login.user.userIcon" class="userIcon"></v-img>
            </v-btn>
          </v-toolbar-title>
          <v-toolbar-title class="ml-4">
            Port
          </v-toolbar-title>

          <v-spacer />
            <AddPost v-if ="$store.state.login.user.userName" /> 
            <Login v-else />
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
              {{post}}
              <v-card class="pb-3">
                <div class="postTop mx-2 mt-1">
                  {{post.category}}
                  <v-spacer />
                  <p v-if="post.created">
                   {{ post.created.toDate() | dateFilter}}
                  </p>
                  <p v-else>Loading...</p>
                </div>

                <div class="user ma-3">
                    <v-btn icon @click="profilePage(index)"
                      v-if="post.postUser.userIcon">
                      <img :src="post.postUser.userIcon" >
                    </v-btn>
                    <p class="ml-3">
                      {{post.postUser.userName}}
                    </p>
                </div>

                <div class="text mx-6">
                  <p>{{post.text}}</p>
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
            </v-container>
          </v-sheet>
        </main>
        <aside class="rightAside my-0 py-0"></aside>
      </section>
    </v-app>
  </section>
</template>

<script>

export default {
  
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
}

.userName{
  margin: 8px 16px;
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