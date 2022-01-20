<template>
  <div id="posts">
    <ul>
      <li v-for="post in posts" :key="post.id">
         <!-- <v-card
          class="mx-2"
          max-width="600"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="postTop">
                <p>{{ post.category }}</p>
                <p>{{ post.created.toDate() | dateFilter}}</p>
              </div>
              <v-list-item-title class="text-h6 mb-1">
                <div class="postUser">
                  <a :href="post.postUser.twitterUrl">
                    <img :src="post.postUser.userPhotoURL" alt="">
                    <p>{{ post.postUser.userName }}</p>
                  </a>
                </div>
              </v-list-item-title>
              <v-list-item-subtitle>{{ post.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card> -->
        <div class="post">
          <div class="postTop">
            <p>{{ post.category }}</p>
            <p>{{ post.created.toDate() | dateFilter }}</p>
          </div>
          <div class="postUser">
            <a :href="post.postUser.twitterUrl">
              <div><img :src="post.postUser.userPhotoURL" alt=""></div>
              <div class="userName">{{ post.postUser.userName }}</div>
            </a>
          </div>
          <div class="text">{{ post.text }}</div>
          <div class="link"></div>
        </div>
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

#posts ul li{
  margin-bottom: 18px;
  width: 100%;
}

.post{
  border: solid 1px #bbbbbb;
  border-radius: 4px;
  padding: 8px;
}

.postTop{
  display: flex;
  justify-content: space-between;
}

.postTop p{
  line-height: 14px;
  font-size: 14px;
  margin-bottom: 8px;
}

.postUser{
  display: flex;
  height: 36px;
}

.postUser a{
  text-decoration: none;
  display: flex;
  width: 100%;
}

.postUser img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: solid #00CCCC 2px;
}
.postUser p{
  font-size: 16px;
  height: 36px;
  margin: 0 4px;
  justify-content: wrap;
  display: inline-block;
}
</style>