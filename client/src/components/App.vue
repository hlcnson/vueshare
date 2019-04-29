// App.vue là component chính của ứng dụng, là nơi
// tích hợp tất cả các component khác

<template>
    <!-- v-app là một Vuetify component, phải bao phủ tất cả các Vuetify component khác trong app. -->
    <v-app style="background: #E3E3EE;">

        <!-- SIDE NAVBAR -->
        <!-- v-navigation-drawer là một Vuetify component được dùng để tạo menu (với hiệu ứng ngăn kéo)
        cho phép người dùng di chuyển giữa các trang trong ứng dụng. Keyword app chỉ định component này
        là một phần của layout của ứng dụng, làm component có thể được điều chỉnh kích cỡ.
        Keyword temporary làm cho component này xuất hiện phía trên với nền overlay.
        Keyword fixed làm cho vị trí component được cố định.
        Sử dụng vuejs directive v-model để ràng buộc 2 chiều với thuộc tính sideNav của Vue instance,
        khi thuộc tính sideNav mang giá trị false thì component sẽ ẩn, ngược lại sẽ xuất hiện. -->
        <v-navigation-drawer app temporary fixed v-model="sideNav">
            <!-- Tạo header cho menu side navbar với biểu tượng và title của app.
            Keyword flat tạo hiệu ứng phẳng, keyword flat làm văn bản có màu trắng sáng. -->
            <v-toolbar color="accent" flat dark>
                <!-- Hiển thị icon -->
                <v-toolbar-side-icon @click="toggleSideNav()"></v-toolbar-side-icon>
                
                <!-- Tạo title có dạng link cho menu. router-link là 1 vuejs component, 
                cung cấp chức năng user navigation. Thuộc tính to của nó là target location.
                Mặc định, component này được render thành phần tử a, tuy nhiên thuộc tính tag
                của nó được dùng để cấu hình phần tử (span) được render. -->
                <router-link to="/" tag="span" style="cursor: pointer">
                    <!-- Bootstrap class pl-3 tạo padding left -->
                    <h1 class="title pl-3">VueShare</h1>
                </router-link>
            </v-toolbar>

            <v-divider></v-divider>

            <!-- Tạo các link trên side navbar. Vuetify component v-list được sử dụng để hiển thị
            thông tin.  -->
            <v-list>
                <!-- Sử dụng v-bind và thuộc tính key để tạo id cho list item, giúp VueJS phân biệt được
                các button và có thể xử lý lại v-for trong trường hợp danh sách dữ liệu có thay đổi.
                Thuộc tính title được dùng làm id cho từng button.
                Thuộc tính to chỉ định link target (URL của route trong route.js) cho button.
                Keyword ripple tạo hiệu ứng rợn màu khi click chuột lên item  -->
                <v-list-tile v-for="item in sideNavItems" :key='item.title' :to='item.link' style="cursor: pointer" ripple>
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        {{ item.title }}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            
        </v-navigation-drawer>
        <!-- END OF SIDE NAVBAR -->

        <!-- HORIZONTAL NAVBAR -->
        <!-- fixed: cố định vị trí; dark: làm cho text bên trong navbar sáng màu -->
        <v-toolbar fixed color="primary" dark>
            <!-- Tạo biểu tượng menu nav ở góc bên trái của navbar. Khi user click icon này
            Side Navbar sẽ xuất hiện.
            Sử dụng directive v-on của Vuejs (cú pháp rút gọn) để bắt sự kiện click chuột lên
            Vuetify component. -->
            <v-toolbar-side-icon @click="toggleSideNav()"></v-toolbar-side-icon>
            <!-- Tạo tiêu đề cho navbar. Class hidden-xs-only làm cho title ẩn đi đối với màn 
            hình xs -->
            <v-toolbar-title class="hidden-xs-only">
                <!-- Làm cho title có dạng link. router-link là 1 vuejs component, 
                cung cấp chức năng user navigation. Thuộc tính to của nó là target location (URL
                của một route trong route.js).
                Mặc định, component này được render thành phần tử a, tuy nhiên thuộc tính tag
                của nó được dùng để cấu hình phần tử (span) được render. -->
                <router-link to="/" tag="span" style="cursor: pointer">
                    VueShare
                </router-link>
            </v-toolbar-title>

            <!-- Vuetify component được dùng để tạo khoảng trống giữa hai component -->
            <v-spacer></v-spacer>

            <!-- KHU VỰC SEARCH BOX -->
            <!-- Vuetify component cung cấp textbox để nhận input. Keyword flex làm cho
            textbox chiếm hết khoảng rộng sẵn có. Thuộc tính prepend-icon để thêm icon vào textbox.
            Keyword single-line dùng chỉ định textbox là single-line. Keyword hide-details để ẩn hint và 
            validation errors -->
            <v-text-field flex prepend-icon="search" placeholder="Search posts" color="accent" single-line hide-details>
            </v-text-field>

            <v-spacer></v-spacer>

            <!-- KHU VỰC CÁC LINK TRÊN HORIZONTAL NAVBAR -->
            <!-- Sử dụng Vuetify component v-toolbar-items kết hợp với v-btn component để tạo 
            các item trên toolbar. 
            Ẩn phần tử này tại màn hình xs -->
            <v-toolbar-items class="hidden-xs-only">
                <!-- Keyword flat được dùng để làm phẳng button để hòa hợp với toolbar -->
                <!-- Sử dụng v-bind và thuộc tính key để tạo id cho button, giúp VueJS phân biệt được
                các button và có thể xử lý lại v-for trong trường hợp danh sách dữ liệu có thay đổi.
                Thuộc tính title được dùng làm id cho từng button.
                Thuộc tính to chỉ định link target cho button.  -->
                <v-btn flat v-for="item in horizontalNavItems" :key='item.title' :to='item.link'>
                    <!-- Sử dụng tính năng Vue string interpolation. 
                    Keyword left để đưa icon về bên trái.
                    Class hidden-sm-only làm ẩn phần tử đối với màn hình sm -->
                    <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>    <!-- END OF HORIZONTAL NAVBAR -->
        

        <!-- Phần app content -->
        <main>      <!-- main là 1 tag của HTML, để chứa nội dung chính của tài liệu -->
            <!-- Tạo một container để chứa component được kết xuất với margin top mt-4 để không
            bị che bởi toolbar -->
            <v-container class="mt-4">
                <!-- Áp dụng hiệu ứng CSS transition khi chuyển đổi route (từ component này
                sang component khác). Sử dụng VueJS wrapper component tên transition để áp dụng
                hiệu ứng.
                Giá trị thuộc tính name sẽ được gắn vào một trong 6 class của vuejs để tạo 
                ra selector class trong các rule set trong thẻ style bên dưới.
                Xem tại đây: https://vuejs.org/v2/guide/transitions.html -->
                <transition name="fade">
                    <!-- router-view sẽ inject vào vị trí này component tương ứng với route hiện hành.
                    Các route được định nghĩa trong router.js -->
                    <router-view/>
                </transition>
                
            </v-container>
        </main>        
    </v-app>
</template>

<script>
export default {
    name: 'App',    // Tên của Vue component (App.vue)
    data() {        // Thuộc tính data của component phải là một hàm, vì component có thể được
                    // tái sử dụng cùng lúc nhiều nơi trong app, khi data có dạng hàm thì các
                    // thể hiện của component sẽ độc lập nhau về data. Cú pháp đầy đủ là 
                    // data: function() {}
        return {
            sideNav: false     // Thuộc tính này ràng buộc với Side Navbar. False: Ẩn side navbar, True: hiện
        }

    },
    computed: {     // Chứa các computed property
        horizontalNavItems() {      // Mỗi computed property có dạng 1 function
            // Property này trả về 1 mảng các đối tượng, mỗi đối tượng là một item trên toolbar.
            // Mỗi item có các thuộc tính của nó
            return [
                {icon: 'chat', title: 'Posts', link: '/posts'},
                {icon: 'lock_open', title: 'Sign In', link: '/signin'},
                {icon: 'create', title: 'Sign Up', link: '/signup'}
            ]
        },
        sideNavItems() {      // Mỗi computed property có dạng 1 function
            // Property này trả về 1 mảng các đối tượng, mỗi đối tượng là một item trên side navbar.
            // Mỗi item có các thuộc tính của nó
            return [
                {icon: 'chat', title: 'Posts', link: '/posts'},
                {icon: 'lock_open', title: 'Sign In', link: '/signin'},
                {icon: 'create', title: 'Sign Up', link: '/signup'}
            ]
        }
    },
    methods: {
        toggleSideNav() {   // Làm đảo ngược giá trị của sideNav
            // Sử dụng cú pháp này để tham chiếu đến thuộc tính sideNav trong data
            this.sideNav = !this.sideNav; 
        }
    }
}
</script>


<style>
/* .fade-enter-active: Áp dụng hiệu ứng cho toàn bộ quá trình hiển thị ra của phần tử.
.fade-leave-active: Áp dụng hiệu ứng cho toàn bộ quá trình đi ra khỏi giao diện. */
.fade-enter-active, 
.fade-leave-active {
    /* Chỉ định thuộc tính CSS opacity sẽ được áp dụng hiệu ứng */
    transition-property: opacity;
    /* Thời gian của hiệu ứng */
    transition-duration: 0.25s;
}

.fade-enter-active {
    transition-delay: 0.25s;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}
</style>
