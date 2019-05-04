<template>
    <!-- v-container tự động canh giữa trên màn hình, có thể bổ sung
    thuộc tính fluid để chiếm hết độ rộng màn hình.
    Dùng directive v-if để kiểm tra xem query đã được
    resolve hay chưa -->
    <v-container>
        <v-layout row wrap>
            <!-- Khi thuộc tính loading = true thì component này được
            hiển thị. Component này hiển thị một dialog.
            Thuộc tính persistent chỉ định khi user click bên ngoài
            thì dialog có ẩn đi hay không.
            Thuộc tính fullscreen chỉ định dialog chiếm trọn chiều cao
            của trang Home.vue -->
            <v-dialog v-model="loading" fullscreen persistent>
                <v-container fill-height>
                    <!-- Thuộc tính justify-center và align-center 
                    canh lề ngay điểm trung tâm cho nội dung -->
                    <v-layout row justify-center align-center>
                        <!-- Component tạo hiệu ứng vòng xoay.
                        Keyword indeterminate chỉ định vòng xoay liên tục
                        do không biết trước thời điểm hoàn tất tác vụ.
                        size: Đường kính vòng; width: Độ lớn đường biên -->
                        <v-progress-circular indeterminate :size="70" 
                        :width="12" color="secondary"></v-progress-circular>
                    </v-layout>
                </v-container>
                
            </v-dialog>
        </v-layout>

        <v-layout row wrap text-xs-center mt-2>
            <v-flex xs12>
                <!-- Nếu mảng posts có phần tử mới render Carousel -->
                <v-carousel v-if="!loading && posts.length > 0" v-bind="{'cycle': true}" interval="3000">
                    <!-- posts là computed property của component này -->
                    <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
                            <h1 id="carousel__title">{{post.title}}</h1>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>


// Import đối tượng map getter của Vuex
import { mapGetters } from 'vuex'

export default {
    name: 'home',
    created(){      // created là một hook trong Comopnent life cycle
                    // được tự động kích hoạt khi nạp component.
        // Khi component vừa được tạo, kích hoạt phương thức
        // handleGetCarouselPosts
        this.handleGetCarouselPosts()
    },
    computed: {
        // Computed property này dùng để lấy giá trị posts trong
        // Vuex store.
        // Truy cập thông qua đối tượng store, đối tượng này
        // đã được inject vào Vue instance trong main.js.
        // Cú pháp truy cập Vuex store: this.$store
        // posts() {
        //     return this.$store.getters.posts
        // },

        // Computed property này dùng để lấy giá trị biến loading
        // xác định trạng thái resolve của query trong Vuex store
        // loading() {
        //     return this.$store.getters.loading
        // }

        // VIẾT LẠI BẰNG CÚ PHÁP SỬ DỤNG MapGetter của Vuex, có
        // sử dụng toán tử spread (...) của JS.
        // mapGetters sẽ ánh xạ computer property tên posts
        // sang dữ liệu this.$store.getters.posts.
        // Và tương tự với computer property tên loading
        ...mapGetters(['posts', 'loading'])
    },
    methods: {
        handleGetCarouselPosts() {
            // Truy cập Vuex store, kích hoạt action tên getPosts để lấy
            // post cho component carousel.
            // Truy cập thông qua đối tượng store, đối tượng này
            // đã được inject vào Vue instance trong main.js.
            // Cú pháp truy cập Vuex store: this.$store
            this.$store.dispatch('getPosts')
        }
    }   
}
</script>

<style>
    #carousel__title {
        /* Đưa phần tử xuống bottom của phần tử cha */
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        /* Tạo overlay background trùng với carousel */
        background-color: rgba(0,0,0,0.5);
        color: #ffffff;
        /* border-radius: 5px 5px 0 0; */
        padding: 0.3em;
        /* margin: 0 auto; */
    }
</style>
