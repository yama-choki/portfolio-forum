import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const postsRef = db.collection("posts");

export const state = () => ({
  user: {userUid: '', userName: '', snsUrl: ''}, 
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
          title: data.title,
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
    postsRef.add({
      text: post.text,
      portfolioURL: post.portfolioURL,
      category: post.category,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      postUser: post.user,
      title: post.title,
      good: []
    })
    .then(() => {
      console.log(this.post);
      dispatch("getPosts");
    }).catch(function (error) {
      const errorCode = error.code
      console.log('error : ' + errorCode)
    }) 
  },
  deletePost({ dispatch }, id) {
    postsRef.doc(id).delete()
    dispatch('getPosts')
  },
  goodPost( {state, dispatch, rootState}, index){
    const post = state.posts[index]
    const updatedGood = post.good.slice()
    const id = post.id
    const userUid = rootState.login.user.userUid
    console.log(userUid)
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
}

export const getters = {
  posts: (state) => {
    return state.posts;
  },
  userUid: () => {
    return $store.login.state.user.userUid
  }
};