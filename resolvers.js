// Tạo đối tượng resolvers để cài đặt các Mutation, Query trong Graphql schema
module.exports = {
    Query: {
        // Query này không cần đối số nên vị trí thứ hai đặt tên args và không cần 
        // object (cách tương tự như Mutation)
        getPosts: async (_, args, { Post }) => {
            // Hàm find khi đối số là đối tượng null sẽ trả về toàn bộ document trong collection.
            // Xếp danh sách post theo tứ tự createdDate giảm dần.
            // Hàm populate để nhận thông tin chi tiết về User qua field createdBy
            // kiểu ObjectId
            const posts = await Post.find({}).sort({ createdDate: 'desc' }).populate({
                path: 'createdBy',
                model: 'User'
            });

            return posts;
        }
    },

    Mutation: {     // Đối tượng Mutation để cài đặt các mutation trong gql schema
        // The root (_) argument is for passing data from parent resolvers to child resolvers.
        // Xem thêm về root tại https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55
        // hoặc https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e
        // Tham số thứ hai là một đối tượng với các thuộc tính là các tham số
        // của mutation được đặc tả trong Graphql schema.
        // Tham số thứ ba là context object ({User}) tham chiếu đến đối tượng context được
        // truyền cho Apollo server (trong server.js), đối tượng này chứa 
        // các MongoDB model (là model User và Post). Đây là cách cơ chế đơn giản
        // để truyền dữ liệu cho Apollo Server, truyền dữ liệu qua context object.
        // Từ khóa async làm cho function trả về một Promise, các function có từ
        // khóa await bên trong sẽ được thực hiện theo cơ chế đồng bộ (chờ đợi thực
        // hiện xong mới đến lệnh kế tiếp)
        // Function này có chức năng đăng ký user mới.
        signupUser: async (_, {username, email, password}, {User}) => {
            // Xác định xem user đã tồn tại trong DB hay chưa.
            // Sử dụng hàm findOne của mongoose package: Tìm một document (record) trong MongoDB
            // theo username trong bối cảnh model User
            const user = await User.findOne({ username });
            if (user) {     // Username đã tồn tại
                // Quẳng ra thông điệp lỗi
                throw new Error("Username đã tồn tại");
            }
            // Tạo user (document) mới. Sử dụng cú pháp JS destructuring
            // Do tên thuộc tính của model trùng tên tham số function nên có 
            // thể viết gon như bên dưới.
            // Viết đầy đủ như sau:
            // const newUser = await new User({
            //     username: username,
            //     email: email,
            //     password: password
            // }).save();
            const newUser = await new User({
                username,
                email,
                password
            }).save();  // Lưu document mới
            // Trả về đối tượng (document) user mới tạo
            return newUser;
        },

        addPost: async (_, {title, imageUrl, categories, description, creatorId}, {Post}) => {
            const newPost = await new Post({
                title, 
                imageUrl, 
                categories, 
                description,
                createdBy: creatorId
            }).save();
            return newPost;
        }
    }
}