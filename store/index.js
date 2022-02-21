import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const postsRef = db.collection("posts");
const usersRef = db.collection("users");

export const state = () => ({
  user: { userUid: '', userName: '', userPhotoURL: '', snsUrl: ''}, 
  accountUser:{},
  posts: []
})

export const actions = {
  getPosts({ commit }) {
    postsRef.orderBy('created', 'desc').get().then((res) => {
      const posts = [];
      res.forEach((post) => {
        const data = post.data();
        posts.push({
          good: data.good,
          text: data.text,
          portfolioURL: data.portfolioURL,
          category: data.category,
          postUser: data.postUser,
          created: data.created,
          id: post.id,
          OGPImage:data.OGPImage,
          OGPTitle:data.OGPTitle,
        });
      });
      console.log(posts);
      commit("getPosts", posts);
    });
  },
  emailEntry({ commit }, {email, password}){
    console.log(email)
    console.log(password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      commit('setUserUid', user.uid)
      commit('setNewUserName')
      commit('setNewUserIcon')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error code :' + errorCode)
      console.log('error message :' + errorMessage)
    });
  },
  loginEmail ({ commit }, {email, password}) {
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    commit('setUserUid', user.uid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error code :' + errorCode)
    console.log('error message :' + errorMessage)
  });
  },
  loginGoogle ({ commit }) {
    console.log('Google login action')
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const user = result.user
      commit('setUserUid', user.uid)
      commit('setUserName', user.displayName)
      commit('setUserPhotoURL', user.providerData[0].photoURL)
      console.log('Google login success : ' + user.uid + ' : ' + user.displayName)
      console.log(user.providerData[0].photoURL)
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
  loginTwitter ({ commit }) {
    console.log('Twitter login action')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const user = result.user
      const twitterId = result.additionalUserInfo.username
      commit('setUserUid', user.uid)
      commit('setUserName', user.displayName)
      commit('setUserPhotoURL', user.providerData[0].photoURL)
      commit('setTwitterUrl', twitterId)
      console.log('Twitter login success:' + user.uid + ' : ' + user.displayName)
      console.log(user)
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
  // loginFacebook ({ commit }) {
  //   console.log('Facebook login action')
  //   const provider = new firebase.auth.FacebookAuthProvider()
  //   firebase.auth().signInWithPopup(provider).then(function (result) {
  //     const user = result.user
  //     console.log(user)
  //     commit('setUserUid', user.uid)
  //     commit('setUserName', user.displayName)
  //     // commit('setUserPhotoURL', user.providerData[0].photoURL)
  //     console.log('Facebook login success : ' + user.uid + ' : ' + user.displayName)
  //     console.log(user)
  //   }).catch(function (error) {
  //     const errorCode = error.code
  //     console.log('error : ' + errorCode)
  //   })
  // },
  submitPost({ dispatch }, post) {
    console.log('actions submitPost')
    console.log(post);
    let OGPImage = ''
    let OGPTitle = ''
    fetch(post.portfolioURL).then(res => res.text()).then(text => {
      const el = new DOMParser().parseFromString(text, "text/html")
      const headEls = (el.head.children)
      Array.from(headEls).map(v => {
          const prop = v.getAttribute('property')
          if (!prop) return;
          console.log(prop, v.getAttribute("content"))
          if (prop === 'og:title') {
            OGPTitle = v.getAttribute("content")
          } else if (prop === 'og:image') {
            OGPImage = v.getAttribute("content")
          }
      })
  }).then(() => {
      postsRef.add({
        text: post.text,
        portfolioURL: post.portfolioURL,
        category: post.category,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        postUser: post.user,
        OGPImage: OGPImage,
        OGPTitle: OGPTitle,
        good: []
      })
      .then(() => {
        console.log('actions submitPost .then')
        console.log(this.post);
        dispatch("getPosts");
      });
    })   
  },
  deletePost({ dispatch }, id) {
    postsRef.doc(id).delete()
    dispatch('getPosts')
  },
  goodPost( {state, dispatch}, index){
    const post = state.posts[index]
    const updatedGood = post.good.slice()
    const id = post.id
    const userUid = state.user.userUid
    console.log(updatedGood)
    if(updatedGood.includes(userUid)){
      console.log('true  IDあり good取り消し')
      const updatedGoodIndex = updatedGood.indexOf(userUid)
      updatedGood.splice(updatedGoodIndex, 1)
      console.log('結果:' + updatedGood)
    } else {
      console.log('false  IDなし goodする')
      updatedGood.push(userUid)
      console.log('結果:' + updatedGood)
    }
    postsRef.doc(id).update({
      good : updatedGood
    }).then(() =>{
      dispatch("getPosts")
    })
  }
};

export const mutations = {
  setUserUid (state, userUid) {
    state.user.userUid = userUid
  },
  setTwitterUrl (state, twitterId) {
    const twitterUrl = 'https://twitter.com/' + twitterId
    console.log(twitterUrl)
    state.user.snsUrl = twitterUrl
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
  setNewUserName(state){
    state.user.userName = '新しいユーザー'
  },
  setNewUserIcon(state){
    state.user.userPhotoURL = '../static/images/NoImage.png'
  }
}

export const getters = {
  posts: (state) => {
    return state.posts;
  },
};