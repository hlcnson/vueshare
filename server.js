
// Sử dụng cú pháp Destructing Assignment của JS (ECMA6)
// để gán giá trị của 2 biến đối tượng ApolloServer và gql.
// Cú pháp này tương đương 2 lệnh sau:
// ApolloServer = require("apollo-server").ApolloServer;
// gql = require("apollo-server").gql;
const { ApolloServer, gql } = require("apollo-server");

// Tạo một mảng object
const todos = [
    { task: 'Wash car', completed: false },
    { task: 'Clean room', completed: true }
];

// MÔ TẢ KIỂU DỮ LIỆU ĐỂ LÀM VIỆC VỚI GRAPHQL
// Định nghĩa typedef để cung cấp cho phương thức khởi tạo Apollo server
const typeDefs = gql`
type Todo {
    task: String 
    completed: Boolean
}
// Đặc tả query để truy vấn dữ liệu
// Query sẽ chứa các function để truy vấn dữ liệu
type Query {
//  Function getTodos có kiểu return là mảng các đối tượng kiểu Todo
    getTodos: [Todo]
}
`;


// Tạo một đối tượng resolse

// Khởi tạo đối tượng Apollo Server và lưu kết quả trả về vào hằng server
const server = new ApolloServer({
//    Tên thuộc tính và tên kiểu dữ liệu trùng nhau nên có thể viết gọn 
//    thành:
//    typeDefs
    typeDefs: typeDefs
});
// Kích hoạt server, lắng nghe request trên port 4000 (http://localhost:4000/)
server.listen().then(({ url }) => {
    console.log(`Server listening on ${url}`);
}); 