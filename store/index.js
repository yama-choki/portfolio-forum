import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const postsRef = db.collection("posts");

export const state = () => ({
  user: { userUid: '', userName: '', userPhotoURL: '' },  
  posts: []
})

export const actions = {
  loginTwitter ({ commit }) {
    console.log('Twitter login action')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const user = result.user
      commit('setUserUid', user.uid)
      commit('setUserName', user.displayName)
      commit('setUserPhotoURL', user.providerData[0].photoURL)
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
  getPosts({ commit }) {
    postsRef.get().then((res) => {
      const posts = [];
      res.forEach((post) => {
        const data = post.data();
        posts.push({
          text: data.text,
          portfolioURL: data.portfolioURL,
          category: data.category,
          postUser: data.postUser,
          created: data.created,
          id: post.id,
        });
      });
      console.log(posts);
      commit("getPosts", posts);
    });
  },
  submitPost({ dispatch }, post) {
    console.log('actions submitPost')
    console.log(post);
    postsRef
      .add({
        text: post.text,
        portfolioURL: post.portfolioURL,
        category: post.category,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        postUser: post.user
      })
      .then(() => {
        console.log('actions submitPost .then')
        console.log(this.post);
        dispatch("getPosts");
      });
  },
};

export const mutations = {
  setUserUid (state, userUid) {
    state.user.userUid = userUid
  },
  setUserName (state, userName) {
    state.user.userName = userName
  },
  setUserPhotoURL(state, photoURL){
    state.user.userPhotoURL = photoURL
    console.log(state.user.userPhotoURL)
  },
  getPosts(state, posts) {
    state.posts = posts;
  },
}