<template>
  <div id="posts">
    <ul>
      <li v-for="(post, index) in posts" :key="post.id">
        <v-col>
          <v-card
            class=""
            max-width="600"
            outlined            
          >          
            <div class="postTop ma-2">
              <p>{{ post.category }}</p>
              <p>{{ post.created.toDate() | dateFilter}}</p>
            </div>
            <div class="postMain">
              <div class="postLeft">
                <img :src="post.postUser.userPhotoURL" alt="" class="userIcon"
                >
              </div>
              <div class="postCenter">
                <a :href="post.postUser.twitterUrl"> 
                  <p class="userName">{{ post.postUser.userName }}</p>
                </a>
                <p class="postText">{{ post.text }}</p>
                <div class="link mb-4">
                  <a :href="post.portfolioURL">
                    <img :src="post.OGPImage" alt="">
                    <div class="linkInfo">
                      <p class="portfolioUrl">{{ post.portfolioURL }}</p>
                      <p class="OGPTitle">{{ post.OGPTitle }}</p>
                    </div>
                  </a>
                </div>
              </div>
              <!-- <div class="postRight"></div> -->
            </div>
            <div class="postBottom">
              <div class="like">
                <v-btn icon color="pink">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <span>124</span>
              </div>
              <v-btn icon @click="deletePost(index)" v-if="$store.state.user.userUid === post.postUser.userUid || 'pQWzqlm24LSvNVglIxyBSx4ObNk1'">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
      return this.$store.getters.posts
    }
  },
  filters: {
    dateFilter: function(date){
      return moment(date).format('YYYY年MM月DD日 HH:mm')
    }
  },
  methods: {
    getPosts() {
      this.$store.dispatch("getPosts");
    },
    deletePost(index){
      this.$store.dispatch('deletePost', this.posts[index].id)
      console.log(this.posts[index].id)
      console.log(index)
    }
  }
}
</script>

<style>
#posts{
  margin: 0 auto;
  max-width: 600px;
  min-width: 300px;
}

#posts ul {
  list-style: none;
  margin: 0px;
  padding: 0;
}

.postTop{
  display: flex;
  justify-content: space-between;
}

.postTop p{
  line-height: 16px;
  font-size: 16px;
  margin-bottom: 8px;
}

.postMain {
  display: flex;
}

.userIcon {
  border-radius: 50%;
  border: 2px #00CCCC solid;
  width: 44px;
}

.postMain {
  margin-right: 16px;
}
.postMain a {
  text-decoration: none black;
}

.userName{
  font-size: 15px;
  font-weight: bold;
  color: black;
}

.postText {
  font-size: 15px;
}

.link {
  border: solid 1px rgb(128, 128, 128);
  border-radius: 16px;
}

.link img {
  border-radius:  16px 16px 0 0;
  width: 100%;
  min-width: 250px;
  border-bottom: solid 1px rgb(128, 128, 128);
}

.linkInfo{
  border-radius: 0 0 16px 16px;
  background-color: #fff;
}

.postRight{
  background-color: pink;
}
</style>