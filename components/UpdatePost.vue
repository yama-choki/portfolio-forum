<template>
  <div id="UpdatePost">
    <v-dialog v-model="updatePostDialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <form>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="updatePostDialog = false">
              キャンセル
            </v-btn>
            <button>
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="updatePost()"
              >
                投稿を更新する
              </v-btn>
            </button>
          </v-card-actions>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field  v-model="newPost.title" label="ポートフォリオのタイトル"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="newPost.text"
                    label="ポートフォリオの説明"
                    required
                    counter="150"
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="newPost.category"
                    :items="[
                      'Webアプリ',
                      'Webデザイン',
                      '動画編集',
                      'イラスト',
                      '記事、ブログ',
                      'その他',
                    ]"
                    label="ポートフォリオの種類"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field  v-model="newPost.portfolioURL" label="ポートフォリオのURL" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const postsRef = db.collection("posts")

export default {
  props:['post'],
  data() {
    return {
      updatePostDialog: false,
      newPost:{
        title: '',
        text:'',
        category:'',
        portfolioUrl:'',
      }
    };
  },
  methods: {
    updatePost() {
      if(this.newPost.title === ""){
        alert('タイトルを入力してください')        
      } else if(this.newPost.text.length >= 150){
        alert('説明は150文字以内で入力してください')
      } else if(this.newPost.category === ""){
        alert('種類を入力してください')
      } else if(this.newPost.portfolioURL === ""){
        alert('URLを入力してください')
      } else {
        const docId = this.post.id
        const newPost = this.newPost 
        postsRef.doc(docId).update({
          title: newPost.title,
          text: newPost.text,
          category: newPost.category,
          portfolioUrl: newPost.portfolioUrl,
        }).then(() => {
          this.$emit("getPosts")
          this.updatePostDialog = false
          this.newPost.title = ''
          this.newPost.text = ''
          this.newPost.category = ''
          this.newPost.portfolioUrl = ''
        })
      }      
    },
  },
};
</script>

<style></style>