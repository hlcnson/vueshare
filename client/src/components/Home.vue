<template>
    <!-- v-container tự động canh giữa trên màn hình, có thể bổ sung
    thuộc tính fluid để chiếm hết độ rộng màn hình.
    Dùng directive v-if để kiểm tra xem query đã được
    resolve hay chưa -->
    <v-container v-if="getPosts">
        
        <v-layout row wrap text-xs-center mt-2>
            <v-flex xs12>

                <v-carousel v-bind="{'cycle': true}" interval="3000">
                    <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl">
                            <h1>{{post.title}}</h1>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
    
    
  
</template>

<script>
// Import package tên gql trong dependency tên apollo-boost
import { gql } from 'apollo-boost';

export default {
    name: 'home',
    // Thuộc tính data của component phải là một function, vì component có thể được
    // tái sử dụng cùng lúc nhiều nơi trong app, khi data có dạng function thì các
    // thể hiện của component sẽ độc lập nhau về data. 
    // Function trả về một đối tượng với các thuộc tính là dữ liệu của component.
    //Cú pháp đầy đủ là: 
    // data: function() {}
    // data() {
    //     return {
    //         // Đối tượng graphql query
    //         getPosts: gql`
    //             query{
    //                 getPosts {
    //                     _id
    //                     title
    //                     imageUrl
    //                     description
    //                     likes
    //                 }
    //             }
    //         `
    // CÁCH 1: SỬ DỤNG SMART QUERY, KHÔNG SỬ DỤNG VUE APOLLO COMPONENT 
            //posts:[]    // Mảng các post
    //     }
    // },
    // Vue Apollo đã được cài đặt và inject vào mọi Vue component
    // từ bên trong main.js. Tại Vue component này, sử dụng Vue
    // Apollo thông qua thuộc tính tên apollo
    apollo: {
        // Đối tượng này của apollo để truy cập query tên getPosts 
        // trên Apollo Graphql Server. Bên trong nó có các thuộc
        // tính phục vụ cho việc chỉ định tên query, lệnh lấy
        // dữ liệu từ query, hàm xử lý kết quả query trả về...
        getPosts: {       // Tên query này phải chính xác với định nghĩa trong /typeDefs.gql
                          // Query Function này phục vụ như một đối tượng và cần phải 
                          // được chỉ định là một query hay mutation.
            // Đây là một query, viết lệnh query trong cặp dấu `` (backtage). Phần bên trong
            // cặp backtage theo cú pháp như trong Graphql playground (localhost:4000).
            // Những field được truy vấn phải nằm trong tập field được trả về bởi Query
            // tên getPosts.
            // Function này sẽ trả về đối tượng mảng post có tên trùng với nó (getPosts),
            // ĐÂY LÀ MỘT ĐIỂM QUAN TRỌNG CẦN PHẢI NHỚ RÕ. Tên này sẽ được sử dụng để
            // truy cập dữ liệu các post được trả về từ bên trong component tên
            // template ở trên.
            query: gql`
                query{
                    getPosts {
                        _id
                        title
                        imageUrl
                        description
                        likes
                    }
                }
            `,
            // Sử dụng kỹ thuật JS destructuring để destructure giá trị cho
            // các tham số. Javascript tự phân rã dữ liệu trả về bởi query ở 
            // trên và đặt vào 2 biến trong đối tượng tham số là data và 
            // loading. Hàm này giúp làm việc dữ liệu do query ở trên trả về.
            // data: dữ liệu trả về; loading: trạng thái đang loading của apollo
                // result({ data, loading }) {
                //     if (!loading) {     // query đã được resolve
                //         // Lưu kết quả của query vào thuộc tính dữ liệu posts của component
                //         this.posts = data.getPosts;
                //     }
                // },
            // Cách không dùng tính năng JS destructuring, tham số là một đối tượng
            // chứa đầy đủ thông tin như data, loading, networkStatus,...
            // Cú pháp:
                // result(args) { 
                //    console.dir(args)     // Hiển thị mọi thuộc tính dữ liệu có trong args
                // }
            // Phương thức để xử lý lỗi
                // error(err) {
                //     console.error('[LỖI]', err)
                //     console.dir(err)        // Hiển thị mọi thuộc tính dữ liệu có trong err
                // }
            // XEM HƯỚNG DẪN VỀ SMART QUERY TẠI: 
            // https://akryum.github.io/vue-apollo/api/smart-query.html

        } 
    }
}
</script>

