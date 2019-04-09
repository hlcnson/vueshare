
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

// MÔ TẢ SCHEMA VỀ KIỂU DỮ LIỆU VÀ QUERY ĐỂ LÀM VIỆC VỚI GRAPHQL
// Định nghĩa typedef để cung cấp cho phương thức khởi tạo Apollo server
// Đặc tả query để truy vấn dữ liệu.
// Đặc tả Mutation để cập nhật dữ liệu.

// Query (là một built-in type definition) sẽ chứa các function để truy vấn dữ liệu
// Function getTodos có kiểu return là mảng các đối tượng kiểu Todo.
// Mutation là một built-in def kiểu object, chứa các đặc tả function (có tham
// số và phải có kiểu dữ liệu kèm theo, và kiểu dữ liệu trả về (nếu có))
// để cập nhật dữ liệu.
const typeDefs = gql`
type Todo {
    task: String 
    completed: Boolean
}

type Query {
    getTodos: [Todo]
}

type Mutation{
    addTodo(task: String, completed: Boolean): Todo
}
`;


// Tạo đối tượng resolver để cài đặt các function trong schema
// Thuộc tính Query (kiểu object) giúp cài đặt các query trong schema.
// Trong đối tượng Query, đặc tả các function có trong schema
const resolvers = {
    Query: {
//        getTodos: function(){
//            return todos;
//        }
//        Có thể viết lại thành cú pháp arrow function như sau:
        getTodos: () => todos
    }
    
    Mutation: {
        addTodo: 
    }
};

// Khởi tạo đối tượng Apollo Server và lưu kết quả trả về vào hằng server
const server = new ApolloServer({
//    Tên thuộc tính và tên kiểu dữ liệu trùng nhau nên có thể viết gọn 
//    thành:
//    typeDefs, resolvers
    typeDefs: typeDefs,
    resolvers: resolvers
});
// Kích hoạt server, lắng nghe request trên port 4000 (http://localhost:4000/)
server.listen().then(({ url }) => {
    console.log(`Server listening on ${url}`);
}); 