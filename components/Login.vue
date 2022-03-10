<template>
  <div id="login">
    <div class="text-center">
      <v-dialog v-model="loginDialog" width="500">
        <template #activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" icon v-on="on">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> ログイン </v-card-title>

          <div class="container">
            <div>
              <button @click="loginGoogle()">Google ログイン</button>
              <button @click="loginTwitter()">Twitter ログイン</button>
              <button @click="loginFacebook()">Facebook ログイン</button>
            </div>
            <div>
              <v-text-field  v-model="email" label="Email Address" type="email"></v-text-field>
              <v-text-field  v-model="password" label="Password" type="password"></v-text-field>
              <button @click="emailEntry()">Email 新規登録</button>
              <button @click="loginEmail()">Email ログイン</button>
            </div>
            
          </div>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="loginDialog = false">
              I accept
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
      email:'',
      password:''
    }
  },
  methods: {
    emailEntry(){
      console.log(this.email)
      console.log(this.password)
      console.log('Email Entry')
      this.$store.dispatch('login/emailEntry', { email: this.email, password: this.password })
      this.loginDialog = false
    },
    loginEmail(){
      console.log('Email login')
      this.$store.dispatch('login/loginEmail', { email: this.email, password: this.password })
      this.loginDialog = false
    },
    loginGoogle () {
      console.log('Google login')
      this.$store.dispatch('login/loginGoogle')
      this.loginDialog = false
    },
    loginTwitter () {
      console.log('Twitter login')
      this.$store.dispatch('login/loginTwitter')
      this.loginDialog = false
    },
    loginFacebook() {
      console.log('Facebook login')
      this.$store.dispatch('login/loginFacebook')
      this.loginDialog = false
    },
  }
};
</script>

<style>
.container{
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
