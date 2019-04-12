
// Sử dụng cú pháp Destructing Assignment của JS (ECMA6) để sử dụng
// package tên apollo-server.
// Các package được cài đặt vào ứng dụng trong thư mục node_modules bằng npm.
// Tạo hai đối tượng tên ApolloServer và gql để trỏ đến 2 object trong package.
// Cú pháp này tương đương 2 lệnh sau:
// ApolloServer = require("apollo-server").ApolloServer;
// gql = require("apollo-server").gql;
const { ApolloServer, gql } = require("apollo-server");

// Khai báo sử dụng package mongoose để làm việc với mongoo DB
const mongoose = require("mongoose");

// Sử dụng các built-in package (không cần cài đặt) của NodeJS


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

// Kết nối với cơ sở dữ liệu qua URI trong file variables.env
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true})     // Kết nối DB
    .then(() => console.log('DB connected!'))   // Thông báo đã kết nối
    .catch(err => console.log(err));            // Thông báo lỗi kết nối


// Tạo một mảng object
const todos = [
    { task: 'Wash car', completed: false },
    { task: 'Clean room', completed: true }
];

// MÔ TẢ SCHEMA VỀ KIỂU DỮ LIỆU VÀ QUERY ĐỂ LÀM VIỆC VỚI GRAPHQL
// Định nghĩa typedef để cung cấp cho phương thức khởi tạo Apollo server
// Đặc tả query để truy vấn dữ liệu.
// Đặc tả Mutation để cập nhật dữ liệu.

// Query (là một built-in type definition) sẽ chứa các function để truy vấn dữ liệu
// Function getTodos có kiểu return là mảng các đối tượng kiểu Todo.
// Mutation là một built-in def kiểu object, chứa các đặc tả function (có tham
// số và phải có kiểu dữ liệu kèm theo, và kiểu dữ liệu trả về (nếu có))
// để cập nhật dữ liệu.





// Khởi tạo đối tượng Apollo Server và lưu kết quả trả về vào hằng server
const server = new ApolloServer({
//    Tên thuộc tính và tên kiểu dữ liệu trùng nhau nên có thể viết gọn 
//    thành:
//    typeDefs, resolvers
    typeDefs: typeDefs,
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