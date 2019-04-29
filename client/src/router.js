import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

import AddPost from './components/Posts/AddPost.vue'
import Posts from "./components/Posts/Posts.vue";

import Profile from './components/Auth/Profile.vue'
import Signin from './components/Auth/Signin.vue'
import Signup from './components/Auth/Signup.vue'


// Hàm use để cài đặt vue-router trong ứng dụng. Sau khi cài đặt, bất kỳ component nào 
// trong ứng dụng cũng có thể truy cập các đối tượng:
// this.$router: is the router object
// this.$route: is the current route object
Vue.use(Router)

export default new Router({
//   Mặc định, vue-router sử dụng ký tự hash khi định tuyến URL (hash mode). 
// Khi định tuyến đến form trong trình duyệt, Vue sẽ tạo ra URL có 
// dạng #/form thay vì /form. Để ngăn chặn ký tự # (chế độ hash mode), 
// đặt thuộc tính mode là 'history' (kích hoạt chế độ HTML5 history mode)
    mode: 'history',
//   base: process.env.BASE_URL,
  routes: [
    {
      path: '/',        // Đây là URL của route
      name: 'home',     // Tên của route
      component: Home   // Tên của component được sử dụng cho route (Home.vue)
    },
    {
        path: '/posts',         // Đây là URL của route
        name: 'Posts',          // Tên của route
        component: Posts         // Tên của component được sử dụng cho route (Post.vue)
    },
    {
        path: '/posts/add',       // Đây là URL của route
        name: 'AddPost',          // Tên của route
        component: AddPost        // Tên của component được sử dụng cho route (AddPost.vue)
    },
    {
        path: '/profile',         // Đây là URL của route
        name: 'Profile',          // Tên của route
        component: Profile        // Tên của component được sử dụng cho route (Profile.vue)
    },
    {
        path: '/signin',         // Đây là URL của route
        name: 'Signin',          // Tên của route
        component: Signin        // Tên của component được sử dụng cho route (Signin.vue)
    },
    {
        path: '/signup',         // Đây là URL của route
        name: 'Signup',          // Tên của route
        component: Signup        // Tên của component được sử dụng cho route (Signup.vue)
    }
  ]
})
