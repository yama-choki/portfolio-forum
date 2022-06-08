<template>
  <div id="UpdateProfile">
    <v-dialog v-model="updateProfileDialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <form>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="updateProfileDialog = false, closeDialog()">
              閉じる
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <div class="update">
                    <v-text-field
                      v-model="user.userName"
                      label="ユーザーネーム"
                      counter="30"
                    />
                    <v-btn
                      color="blue darken-1"
                      icon
                      @click.prevent="(updateProfileDialog = false), updateUserName()"
                    >
                      <v-icon>mdi-check-circle-outline</v-icon>                     
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="update">
                    <v-text-field  v-model="user.snsAccount" label="TwitterのURL"></v-text-field>
                     <v-btn
                      color="blue darken-1"
                      icon
                      @click.prevent="(updateProfileDialog = false), updateSnsAccount()"
                    >
                      <v-icon>mdi-check-circle-outline</v-icon>                     
                    </v-btn>
                  </div>
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
const usersRef = db.collection("users")

export default {
  props:['user'],
  async created () {
    await this.getUser()
  },
  data() {
    return {
      updateProfileDialog: false,
      docId: '',
      id: this.$route.params.id,
      newUserIcon:''
    };
  },
  methods:{
    getUser(){
      usersRef.where('userUid', '==', this.id).get().then((res) => {
        res.forEach((x) => {
          this.docId = x.id
        })
      }).catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
    },
    updateUserName(){
      if(this.id === 'gestUserAccount'){
        alert('ゲストユーザーの名前は変更できません')
        this.user.userName = 'ゲストユーザー'
      } else {
        const docId = this.docId
        usersRef.doc(docId).update({
          userName: this.user.userName
        }).then(() => {
          this.$emit("getUser")
        })
      } 
    },
    updateSnsAccount(){
      if(this.id === 'gestUserAccount'){
        this.user.snsAccount = ''
        alert('ゲストユーザーのTwitterアカウントの登録はできません')
      } else {
        const docId = this.docId
        usersRef.doc(docId).update({
          snsAccount: this.user.snsAccount
        }).then(() => {
          this.$emit("getUser")
        })
      }
    },
    closeDialog(){
      if(this.id === 'getUserAccount'){
        this.user.userName = 'ゲストユーザー'
        this.user.snsAccount = ''
      }
    }
  }
}
</script>

<style>
.update{
  display: flex;
}

.update img{
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
