import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const usersRef = db.collection("users")

export const state = () => ({
  user: {},
  docId: '',
})

export const actions = {
  getUser(){
    usersRef.where('userUid', '==', this.id).get().then((res) => {
      res.forEach((x) => {
        this.user = x.data()
        this.docId = x.id
      })
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
};

export const mutations = {
  getPosts(state, posts) {
    state.posts = posts;
  },
}

export const getters = {
  posts: (state) => {
    return state.posts;
  },
  userUid: () => {
    return $store.login.state.user.userUid
  }
};