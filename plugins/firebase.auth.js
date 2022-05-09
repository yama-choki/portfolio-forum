import { auth } from '~/plugins/firebase.js'

export default (context) => {
    const { store } = context

    return new Promise((resolve, reject) => {
        auth().onAuthStateChanged(user => {
            console.log(user)
            if(user){
                store.dispatch('login/getUser', user.uid)
                console.log(user)
                resolve()
            }
        })
    })
}
