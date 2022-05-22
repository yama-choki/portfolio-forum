<template>
  <div id="addPost">
    <v-dialog v-model="postDialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <form>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="postDialog = false">
              キャンセル
            </v-btn>
            <button>
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="submitPost()"
              >
                投稿する
              </v-btn>
            </button>
          </v-card-actions>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field  v-model="post.title" label="ポートフォリオのタイトル"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="post.text"
                    label="ポートフォリオの説明"
                    required
                    counter="150"
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="post.category"
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
                  <v-text-field  v-model="post.portfolioURL" label="ポートフォリオのURL"></v-text-field>
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
export default {
  data() {
    return {
      postDialog: false,
      post: {
        title:'',
        text: "",
        category: "",
        portfolioURL: "",
        created: "",
        user: {},
      },
    };
  },
  methods: {
    submitPost() {
      if( this.post.title === ""){
        alert('タイトルを入力してください')
      } else if(this.post.text.length >= 150){
        alert('説明は150文字以内で入力してください')
      } else if(this.post.category === ""){
        alert('ポートフォリオの種類を入力してください')
      } else if(this.post.portfolioURL === ""){
        alert('ポートフォリオのURLを入力してください')
      } else {
        this.post.user = this.$store.state.login.user
        this.$store.dispatch("post/submitPost", this.post);
        this.postDialog = false
        this.post.title = ''
        this.post.text = ''
        this.post.category = ''
        this.post.portfolioURL = ''
      }
    },
  },
};
</script>

<style></style>
