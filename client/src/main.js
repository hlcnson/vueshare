
// main.js chứa mã nguồn để render component App.vue và
// mount nó vào DOM

import Vue from 'vue'
import '@babel/polyfill'
import './plugins/vuetify'
import App from './components/App.vue'
import router from './router'
import store from './store'     // Sử dụng Vuex store

// Import hai package hỗ trợ làm việc với Apollo Graphql Server.
// apollo-boost hỗ trợ cài đặt apollo client.
// vue-apollo hỗ trợ ứng dụng VueJS tương tác với Graphql Server.
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

// Khai báo với Vue về package VueApollo
Vue.use(VueApollo)

// Khởi tạo Apollo client với đối tượng cấu hình với các thuộc tính:
// uri: địa chỉ của graphql server (backend) để kết nối front-end 
// với back-end, graphql server chính là nơi để truy vấn và ghi dữ liệu.
// Phần http://localhost:4000 sẽ được thay bằng tên miền của website 
// khi triển khai ứng dụng.
// export đối tượng này để có thể sử dụng ở module khác (store.js)
export const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

// Khởi tạo Vue Apollo với đối tượng cấu hình có thuộc 
// tính apollo client đã tạo
const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false

// Cấu hình ứng dụng Vue
new Vue({
    // Inject Vue Apollo vào mọi Vue component (file .vue)
    // để chúng có thể thực thi các Query và Mutation.
    // Trong mọi Vue component có thể sử dụng Vue Apollo
    // thông qua thuộc tính tên apollo.
    // Cách cấu hình với thuộc tính provide như vậy đã lỗi thời. 
    // Có thể viết lại theo cách mới như sau:
    // apolloProvider,
    provide: apolloProvider.provide(),                                  
    router,
    store,      // Inject Vuex store vào ứng dụng
    render: h => h(App)
}).$mount('#app')       // Ràng buộc Vue instance vào phần tử HTML có id 
                        // là #app trong /public/index.html
