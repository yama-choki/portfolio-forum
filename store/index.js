import firebase from '~/plugins/firebase'

export const state = () => ({

})

export const actions = {
  loginTwitter ({ commit }) {
    console.log('Twitter login action')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const user = result.user
      console.log('success : ' + user.uid + ' : ' + user.displayName)
      console.log(user)
      // commit('setUserUid', user.uid)
      // commit('setUserName', user.displayName)
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
};