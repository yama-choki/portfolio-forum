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
              キャンセル
            </v-btn>
            <button>
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="(updateProfileDialog = false), submitPost()"
              >
                更新する
              </v-btn>
            </button>
          </v-card-actions>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field 
                    v-model="user.userName"
                    label="ユーザーネーム"
                    counter="30"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field  v-model="user.snsAccount" label="TwitterのURL"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-file-input
                    v-model="user.userIcon"
                    label="ユーザーアイコン"
                  />             
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
  async created () {
    await this.getuser()
  },
  data() {
    return {
      updateProfileDialog: false,
      user: {},
      id: this.$route.params.id,

    };
  },
  methods:{
    getuser(){
      console.log('created getUser')
      console.log(this.id)
      usersRef.where('userUid', '==', this.id).get().then((res) => {
        console.log(res)
        res.forEach((x) => {
          console.log(x.data())
          this.user = x.data()
        })
      }).catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
    },
  }
}
</script>

<style>
</style>
