import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const usersRef = db.collection("users")

export const state = () => ({
  user: {userUid: '', userName: '', snsUrl: ''}, 
  posts: []
})

export const actions = {
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
  }
}