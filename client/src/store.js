// store.js được sử dụng cho Vuex


import Vue from 'vue'
import Vuex from 'vuex'

// Import đối tượng Apollo client từ main.js và đổi tên
// đối tượng thành apolloClient
import {defaultClient as apolloClient} from './main'

// Import đối tượng chứa graphql query tên GET_POST
// từ queries.js
import { GET_POSTS } from './queries'


// Khai báo sử dụng Vuex trong ứng dụng Vue
Vue.use(Vuex)
import { from } from 'zen-observable';

// Khởi tạo store của Vuex
export default new Vuex.Store({
    state: {    // Đối tượng state để chứa dữ liệu cho các component
        posts: [],   // Mảng các post
        loading: false      // Thuộc tính thể hiện trạng thái của
            // graphql query là đã resolve hay chưa, false là đang
            // resolve, ngược lại là true
    },
    mutations: {    // Mutation tác động trực tiếp vào 
                    // dữ liệu trong state
        // Mutation này để cập nhật giá trị đối tượng posts trong state
        // state là state của Vuex
        // payload là dữ liệu được truyền vào để cập nhật state
        setPosts: (state, payload) => {
            // Ghi dữ liệu vào biến posts trong state      
            state.posts = payload
        },
        // Mutation này để cập nhật giá trị biến loading trong state
        setLoading: (state, payload) => {
            state.loading = payload
        }

    },
    actions: {
        // Action sử dụng apollo để truy cập graphql server
        // Action không tác động trực tiếp dữ liệu trong state
        // mà phải thông qua mutation. Tham số context của action
        // là một đối tượng có các thuộc tính sau:
        // {
        //     state,      // same as `store.state`, or local state if in modules
        //     rootState,  // same as `store.state`, only in modules
        //     commit,     // same as `store.commit`
        //     dispatch,   // same as `store.dispatch`
        //     getters,    // same as `store.getters`, or local getters if in modules
        //     rootGetters // same as `store.getters`, only in modules
        // }
        getPosts: (context) => {
            // Kích hoạt mutation đặt lại giá trị cho biến loading trong state
            // nhằm thể hiện query đang trong quá trình resolve
            context.commit('setLoading', true)
            // Thực thi graphql query tên GET_POSTS, kết quả là một promise
            apolloClient.query({
                query: GET_POSTS
            }).then(data => {       // data là đối tượng result được resolve
                    // bởi phương thức query. Trong đối tượng này có thuộc
                    // tính data chứa các dữ liệu trả về từ graphql query.
                    // Có thể destructure để lấy thuộc tính data theo cú
                    // pháp .then({data}); console.log(data.getPosts)
                // Đưa dữ liệu từ action vào state thông qua mutation
                context.commit("setPosts", data.data.getPosts)

                // Lúc này query đã được resolve, cập nhật lại 
                // biến loading trong Vuex state
                context.commit('setLoading', false)

            }).catch(err => {
                console.log("Lỗi: ", err)
                // Quá trình resolve query bị lỗi, cập nhật lại 
                // biến loading trong Vuex state
                context.commit('setLoading', false)
            })
        }
    },
    // getter gồm các phương thức để truyền dữ liệu từ store đến
    // các component khác.
    getters: {
        // Function này giúp các component khác lấy giá trị posts
        // trong state.
        posts: state => state.posts,
        
        // Giúp các component khác lấy giá trị biến loading
        // trong state
        loading: state => state.loading
    }
})
