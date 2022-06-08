<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 px-4">
          ログアウトしますか？
        </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="dialog = false, logout()"
          >
            ログアウト
          </v-btn>
          <v-spacer />
          <v-btn
            @click="dialog = false"
          >
            キャンセル
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('login/logout')
      }
    }
  }
</script>

<style>

</style>