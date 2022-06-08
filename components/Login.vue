<template>
  <div id="login">
    <div class="text-center">
      <v-dialog v-model="loginDialog" width="500">
        <template #activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" icon v-on="on">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>

        <v-card >
          <v-card-title class="grey lighten-2 px-4">ログイン/新規登録</v-card-title>
          <v-tabs
            background-color="#00CCCC"
            center-active
            dark
          >
            <v-spacer />
            <v-tab @click="form = 'login'">ログイン</v-tab>
            <v-spacer />
            <v-tab @click="form = 'entry'">新規登録</v-tab>
            <v-spacer />
          </v-tabs>

          <div class="login-form pa-4" v-show="form === 'login'">
            <div>
              <v-btn @click="loginGoogle()" class="mb-4" style="width:100%;">                
                <v-icon color="#00CCCC">mdi-google</v-icon>
                Googleでログイン
              </v-btn>
              <v-btn @click="loginTwitter()" class="mb-4" style="width:100%;">
                <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                Twitterでログイン
              </v-btn>
            </div>
            <div>
              <v-text-field  v-model="email" label="メールアドレスを入力してください" type="email"></v-text-field>
              <v-text-field  v-model="password" label="パスワードを入力してください" type="password"></v-text-field>
              <v-btn @click="loginEmail()" style="width:100%;" class="mb-4">
                <v-icon color="pink accent-2">mdi-email-outline</v-icon>
                メールアドレスでログイン
              </v-btn>
              <v-btn @click="loginGest()" style="width:100%;">
                <v-icon color="orange accent-4">mdi-account</v-icon>
                匿名アカウントでログイン
              </v-btn>
            </div>
            
          </div>

          <div class="entry-form pa-4" v-show="form === 'entry'">
            <div>
              <v-text-field  v-model="entryEmail" label="メールアドレスを入力してください" type="email"></v-text-field>
              <v-text-field  v-model="entryPassword" label="パスワードを入力してください" type="password"></v-text-field>
              <v-text-field  v-model="entryPassword2" label="もう一度パスワードを入力してください" type="password"></v-text-field>

              <v-btn @click="emailEntry()" style="width:100%;">
                 <v-icon color="purple accent-2">mdi-card-account-mail-outline</v-icon>
                メールアドレスで新規登録
              </v-btn>
            </div>
            
          </div>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="loginDialog = false">
              キャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginDialog: false,
      form:'login',
      email:'',
      password:'',
      entryEmail:'',
      entryPassword: '',
      entryPassword2: '',

    }
  },
  methods: {
    emailEntry(){
      if(this.entryPassword === this.entryPassword2 && this.entryEmail){
        this.$store.dispatch('login/loginEmail', { email: this.entryEmail, password: this.entryPassword })
      } else {
        alert('パスワードを入力しなおしてください')
      }
      this.$store.dispatch('login/emailEntry', { email: this.email, password: this.password })
      this.loginDialog = false
    },
    loginEmail(){
      this.$store.dispatch('login/loginEmail', { email: this.email, password: this.password })
      this.loginDialog = false
    },
    loginGoogle () {
      this.$store.dispatch('login/loginGoogle')
      this.loginDialog = false
    },
    loginTwitter () {
      this.$store.dispatch('login/loginTwitter')
      this.loginDialog = false
    },
    loginFacebook() {
      this.$store.dispatch('login/loginFacebook')
      this.loginDialog = false
    },
    loginGest() {
      this.$store.commit('login/loginGest')
      this.loginDialog = false
    },
  }
};
</script>

<style scoped>
.login-form{
  text-align: center;
  flex-direction: column;
}
</style>
