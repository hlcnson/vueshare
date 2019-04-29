
// Sử dụng cú pháp Destructing Assignment của JS (ECMA6) để sử dụng
// package tên apollo-server.
// Các package được cài đặt vào ứng dụng trong thư mục node_modules bằng npm.
// Tạo hai đối tượng tên ApolloServer và gql để trỏ đến 2 object trong package.
// Cú pháp này tương đương 2 lệnh sau:
// ApolloServer = require("apollo-server").ApolloServer;
// gql = require("apollo-server").gql;
// const { ApolloServer, gql } = require("apollo-server");
const { ApolloServer } = require("apollo-server");

// Khai báo sử dụng package mongoose để làm việc với mongoo DB
const mongoose = require("mongoose");

// Sử dụng các built-in package (không cần cài đặt) của NodeJS để thao tác với file
const fs = require('fs');
const path = require('path');

// Lấy đường dẫn đến file typeDefs.gql. __dirname là đường dẫn đến thư mục của module hiện
// hành. Hàm join để tạo đường dẫn đến file
const filePath = path.join(__dirname, 'typeDefs.gql');

// Đọc file theo cơ chế đồng bộ (chờ đợi hoàn tất)
const typeDefs = fs.readFileSync(filePath, 'utf-8');

// Import module resolvers
const resolvers = require('./resolvers');    // Không cần đuôi .js


// Kích hoạt code của package dotenv để truy cập các entry trong các file .env như 
// các biến môi trường, environment variables.
// Kích hoạt require như một phương thức. Sau lệnh này, dotenv sẽ nạp các cặp entry/value 
// trong file .env vào biến toàn cục kiểu đối tượng của Nodejs tên process.env
// Biến toàn cục kiểu đối tượng tên process.env được NodeJS inject vào ứng dụng 
// lúc runtime để ứng dụng có thể sử dụng các biến bên trong nó.
// Thuộc tính path được dùng để chỉ đường dẫn tường minh đến file .env
// Nếu không chỉ định đường dẫn, file .env sẽ được truy cập tại đường dẫn của
// file làm entry point cho ứng dụng (thường là thư mục gốc của ứng dụng).
require('dotenv').config({path: 'variables.env'});

// Tạo 2 đối tượng model User và Post. Path chứa tên file không cần đuôi .js
const User = require('./models/User');
const Post = require('./models/Post.js');

// Kết nối với cơ sở dữ liệu MongoDB qua URI trong file variables.env
mongoose
    .connect(process.env.MONGO_URI, {useCreateIndex: true, useNewUrlParser: true})     // Kết nối DB
    .then(() => console.log('DB connected!'))   // Thông báo đã kết nối
    .catch(err => console.log(err));            // Thông báo lỗi kết nối


// MÔ TẢ SCHEMA VỀ KIỂU DỮ LIỆU VÀ QUERY ĐỂ LÀM VIỆC VỚI GRAPHQL
// Định nghĩa typedef để cung cấp cho phương thức khởi tạo Apollo server
// Đặc tả query để truy vấn dữ liệu.
// Đặc tả Mutation để cập nhật dữ liệu.




// Khởi tạo đối tượng Apollo/Graphql Server và lưu kết quả trả về vào hằng server.
// Truyền vào phương thức tạo các đối tượng typeDefs, resolvers đã import.
const server = new ApolloServer({
//    Tên thuộc tính và tên kiểu dữ liệu trùng nhau nên có thể viết gọn 
//    thành:
//    typeDefs, resolvers
    typeDefs: typeDefs,
    resolvers: resolvers,
    // Khai báo đối tượng context để Apollo server có thể truy cập 2 model User và Post
    context: {
        User,
        Post
    }
});
// Kích hoạt server, lắng nghe request trên port 4000 (http://localhost:4000/)
server.listen().then(({ url }) => {
    console.log(`Server listening on ${url}`);
}); 