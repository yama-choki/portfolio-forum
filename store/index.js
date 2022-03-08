import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const postsRef = db.collection("posts");
const usersRef = db.collection("users");

export const state = () => ({
  user: {userUid: '', userName: '', snsUrl: ''}, 
  accountPageUser:{},
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
  emailEntry({dispatch }, {email, password}){
    console.log(email)
    console.log(password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userUid = user.uid
      const newUser = {
        userUid: user.uid,
        userName: '新しいユーザー',
        userIcon: '/images/newUserIcon.png',
        snsAccount: ''
      }
      console.log(newUser)
      dispatch('submitUser', newUser)
      dispatch('getUser', userUid)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error code :' + errorCode)
      console.log('error message :' + errorMessage)
    });
  },
  loginEmail ({ dispatch }, {email, password}) {
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const userUid = user.uid
    console.log(user)
    dispatch('getUser', userUid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error code :' + errorCode)
    console.log('error message :' + errorMessage)
  });
  },
  loginGoogle ({ dispatch }) {
    console.log('Google login action')
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(async function (result) {
      const user = result.user
      const metadata = user.metadata
      const userUid = user.uid
      const newUser = {
        userUid: user.uid,
        userName: user.displayName,
        userIcon: user.providerData[0].photoURL,
        snsAccount :''
      }
      console.log(user.providerData[0].photoURL)
      console.log(metadata.creationTime)
      console.log(metadata.lastSignInTime)
      if(metadata.creationTime === metadata.lastSignInTime){
        console.log('submitUser!!!!!!!!!!!!!!')
        dispatch('submitUser', newUser)
        dispatch('getUser', userUid)
      } else {
        console.log('getUser!!!!!!!!!!!!!!')
        await dispatch('getUser', userUid)
      }
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
  loginTwitter ({ dispatch }) {
    console.log('Twitter login action')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const user = result.user
      const userUid = user.uid
      const twitterId = result.additionalUserInfo.username
      const snsAccount = 'https://twitter.com/' + twitterId
      const isFirstLogin =  result.additionalUserInfo.isNewUser
      const newUser = {
        userUid: user.uid,
        userName: user.displayName,
        userIcon: user.providerData[0].photoURL,
        snsAccount: 'https://twitter.com/' + twitterId
      }
      console.log('Twitter login success:' + user.uid + ' : ' + user.displayName)
      console.log(user)
      if(isFirstLogin){
        dispatch('submitUser', newUser)
        dispatch('getUser', userUid)
        console.log('submitUser!!!!!!!!!!!!!!')
      } else {
        dispatch('getUser', userUid)
        console.log('getUser!!!!!!!!!!!!!!')
      }
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
  submitUser({}, newUser){
    console.log('actions submitUser')
    console.log('確認',newUser)
    usersRef.add({
      userUid: newUser.userUid,
      userName: newUser.userName,
      userIcon: newUser.userIcon,
      userInfo: '',
      snsAccount: newUser.snsAccount,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log('確認', newUser)
  },
  getUser({commit}, userUid){
    console.log('submitUser!!!!!!!!!!!!!!')
    console.log(userUid)
    usersRef.where('userUid', '==', userUid).get().then((res) => {
      const loginUser = []
        res.forEach((x) => {
        const data = x.data()
        loginUser.push({
          userUid: data.userUid,
          userName: data.userName,
          userIcon: data.userIcon,
          userInfo: data.userInfo,
          snsUrl: data.snsAccount,
        })
      })
      commit('getUser', loginUser)
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
  submitPost({ dispatch }, post) {
    console.log('actions submitPost')
    console.log(post);
    let OGPImage = '/images/NoImage.png'
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
        console.log(this.post);
        dispatch("getPosts");
      }).catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
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
  getPosts(state, posts) {
    state.posts = posts;
  },
  getUser(state, loginUser){
    state.user = loginUser[0]
  }
}

export const getters = {
  posts: (state) => {
    return state.posts;
  },
};