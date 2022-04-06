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
            <v-btn color="blue darken-1" text @click="updateProfileDialog = false">
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
                <v-col cols="12" sm="12">
                  <form action="">
                    <div class="update">
                      <img :src="$store.state.login.user.userIcon" alt="" v-if="$store.state.login.user.userIcon">
                      <v-file-input
                        label="ユーザーアイコン"
                        v-model="newUserIcon"
                        
                      />
                      <v-btn
                        color="blue darken-1"
                        icon
                        @click.prevent="(updateProfileDialog = false), updateUserIcon(newUserIcon)"
                      >
                        <v-icon>mdi-check-circle-outline</v-icon>                     
                      </v-btn>
                    </div>
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </form>
        {{user}}
        {{ newUserIcon }}
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
      console.log(this.id)
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
      const docId = this.docId
      usersRef.doc(docId).update({
        userName: this.user.userName
      }).then(() => {
        this.$emit("getUser")
      })
    },
    updateSnsAccount(){
      const docId = this.docId
      usersRef.doc(docId).update({
        snsAccount: this.user.snsAccount
      }).then(() => {
        this.$emit("getUser")
      })
    },
    updateUserIcon(){
      const img = this.newUserIcon
      //画像ファイルのURLを取得。
      this.img_url = URL.createObjectURL(img);
      //"files"は③で作成したフォルダ名
      //Firebase storageに画像ファイルを送信。
      const storageRef = ref(storage, "userIcons/" + file.name);

      //Firebaseにデータを適切に送るために必要なコード
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("blobかfileをアップロード", snapshot);
      });
    },
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
