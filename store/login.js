import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  user: {userUid: '', userName: '', snsUrl: ''}, 
  accountPageUser:{},
  posts: []
})

export const actions = {
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
      snsAccount: newUser.snsAccount,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log('確認', newUser)
  },
  getUser({commit}, userUid){
    console.log(userUid)
    usersRef.where('userUid', '==', userUid).get().then((res) => {
      const loginUser = []
        res.forEach((x) => {
        const data = x.data()
        loginUser.push({
          userUid: data.userUid,
          userName: data.userName,
          userIcon: data.userIcon,
          snsUrl: data.snsAccount,
        })
      })
      commit('getUser', loginUser)
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
};

export const mutations = {
  getUser(state, loginUser){
    state.user = loginUser[0]
  },
  setUser(state, payload) {
    console.log('setUser',payload)
  }
}

export const getters = {
  user(state){
    return state.user
  }
}